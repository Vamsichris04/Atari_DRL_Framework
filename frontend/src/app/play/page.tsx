'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useData } from '@/providers/data';
import { GAMES } from '@/constants';
import { Button } from '@/components/ui/pixelact-ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/pixelact-ui/card';
import {
  createEnvironment,
  fetchRender,
  resetEnvironment,
  takeAction,
  trainingWebSocketUrl,
} from '@/api/api';
import { cn } from '@/lib/utils';
import { Game } from '@/types';
import { useRouter } from 'next/navigation';

/** Target max steps per second; each step is one HTTP call (with bundled frame). */
const GAME_LOOP_MS = 1000 / 30;

function safeRewardDelta(raw: unknown): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

function Page() {
  const router = useRouter();
  const { inputData, setInputValue } = useData();
  const game: Game = GAMES.find((g) => g.name === inputData.game) as Game;

  const [instanceId, setInstanceId] = useState<string | null>(null);
  const reward = useRef(0);
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const currentAction = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Change this string to customise the message shown when an episode ends
  const GAME_FINISHED_MESSAGE = 'Episode finished!';

  const isSteppingRef = useRef(false);
  const [activeActionIndex, setActiveActionIndex] = useState<number | null>(null);

  /** Side-by-side AI panel: same Atari game via `/training/stream` (random policy until a trained agent is wired). */
  const [aiFrame, setAiFrame] = useState<string | null>(null);
  /** Cumulative return for the AI env’s current episode (from WebSocket). */
  const [aiEpisodeReturn, setAiEpisodeReturn] = useState<number | null>(null);
  const [aiStepReward, setAiStepReward] = useState<number | null>(null);
  const [aiStreamStatus, setAiStreamStatus] = useState<string>('Connecting…');

  /** Same title as configure flow: user picked an algorithm to train on this game. */
  const showAiVersus = Boolean(game && inputData.algorithm);

  // Creates the game environment on the backend. Change the error message below
  // to show a different message if the backend is unreachable.
  async function create() {
    try {
      setStatusMessage('Creating environment...');
      const newInstanceId = await createEnvironment(game.name);
      setInstanceId(newInstanceId);
      await reset(newInstanceId);
    } catch (error) {
      console.error('Error creating environment:', error);
      setStatusMessage('Failed to create environment. Check if backend is running.');
    }
  }

  // Resets the game back to the start. Change the string below to change the
  // "ready to play" message shown after a reset.
  async function reset(id: string) {
    try {
      const { image } = await resetEnvironment(id, { render: true });
      reward.current = 0;
      currentAction.current = 0;
      setIsPaused(false);
      setIsGameRunning(false);
      if (image) {
        setRenderedImage(image);
        setStatusMessage('Ready - Press Space to start playing');
      } else {
        await render(id, 'Ready - Press Space to start playing');
      }
    } catch (error) {
      console.error('Error resetting environment:', error);
      setStatusMessage('Error resetting environment.');
    }
  }

  // Sends the current action to the backend and updates the game frame.
  // Called automatically by the game loop — you shouldn't need to call this directly.
  async function step() {
    if (!instanceId || isPaused || isSteppingRef.current) return;
    isSteppingRef.current = true;
    try {
      const data = await takeAction(instanceId, currentAction.current, { render: true });
      reward.current += safeRewardDelta(data.reward);

      if (data.image) {
        setRenderedImage(data.image);
      } else if (instanceId) {
        await fetchRender(instanceId).then(setRenderedImage);
      }

      if (data.episodeDone) {
        setIsGameRunning(false);
        setIsPaused(true);
        setStatusMessage(GAME_FINISHED_MESSAGE);
      } else {
        setStatusMessage('Playing...');
      }
    } catch (error) {
      console.error('Error taking action:', error);
      setStatusMessage('Error taking action.');
      setIsGameRunning(false);
    } finally {
      isSteppingRef.current = false;
    }
  }

  // Fetches and displays the latest game frame from the backend.
  async function render(id: string, msg: string) {
    try {
      setRenderedImage(await fetchRender(id));
      setStatusMessage(msg);
    } catch (error) {
      console.error('Error rendering:', error);
    }
  }

  // Initialises the environment when the page loads
  useEffect(() => {
    if (!game) {
      router.push('/select');
      return;
    }
    create();
  }, [game]);

  // Live AI preview: separate Gym env on the backend (random actions until a policy is connected).
  useEffect(() => {
    if (!game || !showAiVersus) {
      setAiFrame(null);
      setAiEpisodeReturn(null);
      setAiStepReward(null);
      setAiStreamStatus('');
      return;
    }

    setAiStreamStatus('Connecting…');
    const ws = new WebSocket(trainingWebSocketUrl());

    ws.onopen = () => setAiStreamStatus('Live');

    ws.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data as string) as {
          frame?: string;
          episode_return?: number;
          step_reward?: number;
          reward?: number;
        };
        if (typeof d.frame === 'string') setAiFrame(d.frame);
        if (typeof d.episode_return === 'number' && Number.isFinite(d.episode_return)) {
          setAiEpisodeReturn(d.episode_return);
        }
        const step =
          typeof d.step_reward === 'number' && Number.isFinite(d.step_reward)
            ? d.step_reward
            : typeof d.reward === 'number' && Number.isFinite(d.reward)
              ? d.reward
              : null;
        if (step !== null) setAiStepReward(step);
      } catch {
        /* ignore malformed messages */
      }
    };

    ws.onerror = () => setAiStreamStatus('Stream error — is the backend running (port 8000)?');

    ws.onclose = () => {
      setAiStreamStatus((prev) => (prev === 'Live' ? 'Disconnected' : prev));
    };

    return () => {
      ws.onopen = () => {};
      ws.onmessage = () => {};
      ws.onerror = () => {};
      ws.onclose = () => {};
      ws.close();
    };
  }, [game, showAiVersus]);

  // The game loop — calls step() on an interval while the game is running.
  // `isSteppingRef` ensures we never stack requests; interval caps how often we *try* to step (~30 FPS).
  useEffect(() => {
    if (!isGameRunning || !instanceId || isPaused) return;
    const intervalId = setInterval(step, GAME_LOOP_MS);
    return () => clearInterval(intervalId);
  }, [isGameRunning, instanceId, isPaused]);

  // Keyboard controls — to remap keys, edit the `key` field in src/constants/games.ts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!instanceId) return;

      // Change 'Enter' to a different key to remap the reset shortcut
      if (e.key === 'Enter') {
        reset(instanceId);
        return;
      }

      // Change '<Space>' to a different key to remap the start/pause shortcut
      if (e.key === ' ') {
        e.preventDefault();
        if (!isGameRunning && !isPaused) setIsGameRunning(true);
        else setIsPaused((p) => !p);
        return;
      }

      if (isPaused) return;
      if (!isGameRunning) setIsGameRunning(true);

      for (const action of game.actions) {
        if (action.key && e.key === action.key) {
          currentAction.current = action.action;
          setActiveActionIndex(action.action);
          break;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!instanceId || isPaused) return;
      for (const action of game.actions) {
        if (action.key && e.key === action.key) {
          currentAction.current = 0;
          setActiveActionIndex(null);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [instanceId, isGameRunning, isPaused, game]);

  if (!game) return null;

  const isFinished = statusMessage === GAME_FINISHED_MESSAGE;

  // Removes the "ALE/" prefix and version suffix — change this to customise the displayed title
  const formatGameName = (name: string) => name.replace(/ALE\//g, '').replace(/-v\d+/g, '').trim();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{formatGameName(game.name)}</h1>
          <p className="text-sm text-muted-foreground">{game.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold uppercase',
              isFinished && 'bg-yellow-500/20 text-yellow-600',
              isPaused && !isFinished && 'bg-orange-500/20 text-orange-600',
              isGameRunning && !isPaused && 'bg-green-500/20 text-green-600',
              !isGameRunning && !isPaused && !isFinished && 'bg-gray-500/20 text-gray-600'
            )}
          >
            {isFinished ? 'Finished' : isPaused ? 'Paused' : isGameRunning ? 'Playing' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Layout: change lg:grid-cols-3 to adjust the column split between sidebar and game */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar: score, game info, and results button */}
        <div className="space-y-4">
          {/* Score display — reward.current updates each game tick */}
          <Card>
            <CardHeader>
              <CardTitle>Your score</CardTitle>
            </CardHeader>
            <div className="p-6">
              <div className="text-center">
                <p className="text-5xl font-bold tabular-nums">
                  {Number.isFinite(reward.current) ? Math.round(reward.current) : 0}
                </p>
                {isFinished && (
                  <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    Final Score
                  </p>
                )}
              </div>
            </div>
          </Card>

          {showAiVersus && (
            <Card>
              <CardHeader>
                <CardTitle>AI preview</CardTitle>
                <CardDescription className="text-xs">
                  Episode return on the training stream (resets each new episode). Separate env from
                  your play session.
                </CardDescription>
              </CardHeader>
              <div className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold tabular-nums">
                    {aiEpisodeReturn !== null && Number.isFinite(aiEpisodeReturn)
                      ? Number.isInteger(aiEpisodeReturn)
                        ? String(aiEpisodeReturn)
                        : aiEpisodeReturn.toFixed(2)
                      : '—'}
                  </p>
                  {aiStepReward !== null && Number.isFinite(aiStepReward) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Last step:{' '}
                      {Number.isInteger(aiStepReward) ? aiStepReward : aiStepReward.toFixed(2)}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{aiStreamStatus}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Game info — description and action count come from src/constants/games.ts */}
          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
            </CardHeader>
            <div className="p-6 space-y-3 text-sm">
              <div>
                <p className="font-semibold">Status</p>
                <p className="text-muted-foreground">
                  {isGameRunning && !isPaused ? 'Running' : 'Idle'}
                </p>
              </div>
              <div>
                <p className="font-semibold">Actions</p>
                <p className="text-muted-foreground">{game.actions.length} available</p>
              </div>
              <div>
                <p className="font-semibold">Description</p>
                <p className="text-muted-foreground">{game.description}</p>
              </div>
            </div>
          </Card>

          {/* Navigates to the results page — change '/results' to redirect elsewhere */}
          <Button
            onClick={() => {
              if (isFinished) {
                const s = Number.isFinite(reward.current) ? Math.round(reward.current) : 0;
                setInputValue('userResult', String(s));
              }
              router.push('/results');
            }}
            className="w-full"
            variant="secondary"
          >
            {isFinished ? 'View Results →' : 'Skip to Results →'}
          </Button>
        </div>

        {/* Right: game display and controls — takes up 2 of 3 columns */}
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle>{showAiVersus ? 'You vs AI (preview)' : 'Game display'}</CardTitle>
              <CardDescription>
                {showAiVersus
                  ? 'You control the left screen. The right screen streams a separate env from the backend (random actions until a trained policy is hooked up).'
                  : statusMessage}
              </CardDescription>
            </CardHeader>
            <div className="p-6">
              <div
                className={cn(
                  'flex flex-col gap-6 justify-center items-stretch',
                  showAiVersus && 'lg:flex-row lg:items-start lg:justify-center lg:gap-8'
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  {showAiVersus && (
                    <>
                      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        You
                      </p>
                      <p className="text-xs text-muted-foreground text-center max-w-[420px]">
                        {statusMessage}
                      </p>
                    </>
                  )}
                  {!showAiVersus && (
                    <p className="text-sm text-muted-foreground self-center mb-1">
                      {statusMessage}
                    </p>
                  )}
                  <div
                    className="relative bg-black rounded-lg overflow-hidden"
                    style={{ width: 420, height: 'auto' }}
                  >
                    {renderedImage ? (
                      <>
                        <img
                          src={`data:image/png;base64,${renderedImage}`}
                          alt={game.name}
                          width={420}
                          className="block h-auto"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        {(isPaused || isFinished) && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <p className="text-4xl font-bold text-white">
                              {isFinished ? 'GAME OVER' : 'PAUSED'}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className="flex items-center justify-center"
                        style={{ width: 320, height: 240 }}
                      >
                        <p className="text-muted-foreground text-sm">Loading environment...</p>
                      </div>
                    )}
                  </div>
                </div>

                {showAiVersus && (
                  <div className="flex min-w-0 flex-col items-center gap-2 w-full">
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      AI (training stream)
                    </p>
                    <div className="relative w-full max-w-[420px] mx-auto bg-black rounded-lg overflow-hidden border border-dashed border-muted-foreground/40 shrink-0">
                      {aiFrame ? (
                        <img
                          src={`data:image/png;base64,${aiFrame}`}
                          alt="AI training preview"
                          width={420}
                          height={320}
                          className="block w-full h-auto max-h-[min(70vh,480px)] object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center w-full min-h-[200px] max-w-[420px] mx-auto aspect-[4/3]">
                          <p className="text-muted-foreground text-sm">
                            {aiStreamStatus || 'Waiting…'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Controls card — keyboard shortcuts are shown in [brackets] on each button */}
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>Use WASD keys or buttons to play</CardDescription>
            </CardHeader>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <Button
                  onClick={() => instanceId && reset(instanceId)}
                  disabled={!instanceId}
                  variant="secondary"
                  className="flex-1"
                >
                  ↺ Reset [Enter]
                </Button>
                <Button
                  onClick={() => {
                    if (!isGameRunning && !isPaused) setIsGameRunning(true);
                    else setIsPaused((p) => !p);
                  }}
                  disabled={isFinished}
                  className="flex-1"
                >
                  {!isGameRunning ? '▶ Start' : isPaused ? '▶ Resume' : '⏸ Pause'} [Space]
                </Button>
              </div>

              {/* One button per game action — change grid-cols-3 to adjust how many fit per row.
                  To add/remove actions or change key bindings, edit src/constants/games.ts */}
              <div className="grid grid-cols-3 gap-2">
                {game.actions.map((action) => (
                  <Button
                    key={action.action}
                    variant={activeActionIndex === action.action ? 'default' : 'secondary'}
                    size="sm"
                    onMouseDown={() => {
                      if (!isGameRunning && !isPaused) setIsGameRunning(true);
                      if (!isPaused) {
                        currentAction.current = action.action;
                        setActiveActionIndex(action.action);
                      }
                    }}
                    onMouseUp={() => {
                      currentAction.current = 0;
                      setActiveActionIndex(null);
                    }}
                    onMouseLeave={() => {
                      currentAction.current = 0;
                      setActiveActionIndex(null);
                    }}
                    className="transition-all"
                  >
                    {action.label}{' '}
                    {action.key && <span className="text-xs opacity-60">[{action.key}]</span>}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
