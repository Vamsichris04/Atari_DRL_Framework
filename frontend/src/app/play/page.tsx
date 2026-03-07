'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useData } from '@/providers/data';
import { GAMES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createEnvironment, fetchRender, resetEnvironment, takeAction } from '@/api/api';
import { cn } from '@/lib/utils';
import { Game } from '@/types';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const { inputData, setInputValue } = useData();
  const game: Game = GAMES.find((g) => g.name === inputData.game) as Game;

  const [instanceId, setInstanceId] = useState<number | null>(null);
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
  async function reset(id: number) {
    try {
      await resetEnvironment(id);
      reward.current = 0;
      currentAction.current = 0;
      setIsPaused(false);
      setIsGameRunning(false);
      await render(id, 'Ready - Press Space to start playing');
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
      const data = await takeAction(instanceId, currentAction.current);
      reward.current += data.reward;

      if (data.episodeDone) {
        setIsGameRunning(false);
        setIsPaused(true);
        await render(instanceId, GAME_FINISHED_MESSAGE);
      } else {
        await render(instanceId, 'Playing...');
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
  async function render(id: number, msg: string) {
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

  // The game loop — calls step() on an interval while the game is running.
  // Change 100 to adjust game speed: lower = faster, higher = slower (value is in ms)
  useEffect(() => {
    if (!isGameRunning || !instanceId || isPaused) return;
    const intervalId = setInterval(step, 100);
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
              <CardTitle>Score</CardTitle>
            </CardHeader>
            <div className="p-6">
              <div className="text-center">
                <p className="text-5xl font-bold tabular-nums">{reward.current}</p>
                {isFinished && (
                  <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                    Final Score
                  </p>
                )}
              </div>
            </div>
          </Card>

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
              if (isFinished) setInputValue('userResult', '' + reward.current);
              router.push('/results');
            }}
            className="w-full"
            variant="secondary"
          >
            {isFinished ? 'View Results →' : 'Skip to Results →'}
          </Button>
        </div>

        {/* Right: game display and controls — takes up 2 of 3 columns */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Game Display</CardTitle>
              <CardDescription>{statusMessage}</CardDescription>
            </CardHeader>
            <div className="p-6 flex justify-center">
              {/* Change width: 420 to resize the game canvas */}
              <div
                className="relative bg-black rounded-lg overflow-hidden"
                style={{ width: 420, height: 'auto' }}
              >
                {renderedImage ? (
                  <>
                    {/* Change width={420} here too if you resize the canvas above */}
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
                  onClick={() => reset(instanceId as number)}
                  disabled={!instanceId}
                  variant="outline"
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
                    variant={activeActionIndex === action.action ? 'default' : 'outline'}
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
