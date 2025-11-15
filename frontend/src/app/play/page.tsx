'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useData } from '@/providers/data';
import { GAMES } from '@/constants';
import { Button } from '@/components/ui/button';
import { createEnvironment, fetchRender, resetEnvironment, takeAction } from '@/api/api';
import { cn } from '@/lib/utils';
import { Game } from '@/types';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const { inputData, setInputValue } = useData();
  const game: Game = GAMES.find((game) => game.name === inputData.game) as Game;
  const [instanceId, setInstanceId] = useState<number | null>(null);
  const reward = useRef(0);
  const [statusMessage, setStatusMessage] = useState('Loading...');
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const GAME_FINISHED_MESSAGE = 'Episode finished!';

  async function create() {
    try {
      const newInstanceId = await createEnvironment(game.name);
      setInstanceId(newInstanceId);
      await reset(newInstanceId);
    } catch (error) {
      console.error('Error creating environment:', error);
      setStatusMessage('Error creating environment.');
    }
  }

  async function reset(id: number) {
    try {
      await resetEnvironment(id);
      reward.current = 0;
      await render(id, 'Environment reset. Take an action.');
    } catch (error) {
      console.error('Error resetting environment:', error);
      setStatusMessage('Error resetting environment.');
    }
  }

  async function action(action: number) {
    if (!instanceId || statusMessage == GAME_FINISHED_MESSAGE) return;
    try {
      const data = await takeAction(instanceId, action);
      reward.current += data.reward;
      await render(
        instanceId,
        data.episodeDone
          ? GAME_FINISHED_MESSAGE
          : `Action taken: ${game.actions.find((gameAction) => gameAction.action === action)?.label.replace(/ \(.\)/g, '')}`
      );
    } catch (error) {
      console.error('Error taking action:', error);
      setStatusMessage('Error taking action.');
    }
  }

  async function render(id: number, newStatusMessage: string) {
    try {
      setRenderedImage(await fetchRender(id));
      setStatusMessage(newStatusMessage);
    } catch (error) {
      console.error('Error fetching render:', error);
    }
  }

  useEffect(() => {
    if (!game) {
      router.push('/select');
    } else {
      create();
    }
  }, [game, router]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!instanceId) return;

      if (event.key === 'Enter') await reset(instanceId as number);

      if (statusMessage == GAME_FINISHED_MESSAGE) return;

      for (const gameAction of game.actions) {
        if (gameAction.key && event.key === gameAction.key) await action(gameAction.action);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [instanceId, statusMessage, game, reward]);

  if (!game) {
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-2 m-2">
        <Card className="flex flex-col gap-2 w-2/5 p-1">
          <CardHeader className="flex flex-col items-center gap-2">
            <CardTitle className="text-3xl text-bold">
              {game.name
                .replace(/ALE\//g, '')
                .replace(/-v\d+/g, '')
                .replace(/([A-Z])/g, ' $1')
                .trim()}
            </CardTitle>
            <CardDescription>{statusMessage}</CardDescription>
            <CardAction className="flex w-full justify-center">
              <Button
                className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600"
                onClick={() => reset(instanceId as number)}
              >
                Reset Environment (Enter)
              </Button>
            </CardAction>
          </CardHeader>
          <div>
            <div
              className={cn('grid gap-2', game.twoActionColumns ? 'grid-cols-2' : 'grid-cols-3')}
            >
              {game.actions.map((gameAction) => (
                <Button
                  key={gameAction.action}
                  className={cn(
                    'py-2 px-4 rounded-md',
                    gameAction.key ? 'bg-blue-500 text-white' : 'bg-primary'
                  )}
                  onClick={() => action(gameAction.action)}
                >
                  {gameAction.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>
        <Card className="p-2 w-2/5 flex items-center">
          {renderedImage && (
            <img
              src={`data:image/png;base64,${renderedImage}`}
              alt={game.name}
              className="border border-2"
              width={300}
            />
          )}
        </Card>
        <Card className="w-1/5 flex justify-center items-center">
          <CardTitle className="w-fit">{`${statusMessage !== GAME_FINISHED_MESSAGE ? 'Current score' : 'Final result'}: ${reward.current}`}</CardTitle>
          <Button
            onClick={() => {
              if (statusMessage === GAME_FINISHED_MESSAGE) {
                setInputValue('userResult', '' + reward.current);
              }
              router.push('/configure');
            }}
          >
            {statusMessage !== GAME_FINISHED_MESSAGE ? 'Skip to Agent' : 'Continue to Agent'}
          </Button>
        </Card>
      </div>
      <Card className="gap-0 p-1 text-center border">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Instructions</CardTitle>
          <CardDescription>{game.description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Page;
