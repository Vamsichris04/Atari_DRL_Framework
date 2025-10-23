'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/providers/data';
import { GAMES } from '@/constants/constants';
import { Button } from '@/components/ui/button';
import { createEnvironment, fetchRender, resetEnvironment, takeAction } from '@/api/api';
import { cn } from '@/lib/utils';
import { Game } from '@/types/types';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function Page() {
  const { inputData } = useData();
  const game: Game = GAMES.find((game) => game.name === inputData.game) as Game;
  const [instanceId, setInstanceId] = useState<number | null>(null);
  const [observation, setObservation] = useState<number[] | null>(null);
  const [reward, setReward] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Loading...');
  const [renderedImage, setRenderedImage] = useState<string | null>(null);

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
      const observation = await resetEnvironment(id);
      setObservation(observation);
      setReward(0);
      setIsDone(false);
      setStatusMessage('Environment reset. Take an action.');
      await render(id);
    } catch (error) {
      console.error('Error resetting environment:', error);
      setStatusMessage('Error resetting environment.');
    }
  }

  async function action(action: number) {
    if (!instanceId || isDone) return;
    try {
      const data = await takeAction(instanceId, action);
      setObservation(data.observation);
      setReward(data.reward === 0 ? 0 : reward + data.reward);
      setIsDone(data.episodeDone);
      setStatusMessage(
        data.episodeDone
          ? 'Episode finished!'
          : `Action taken (${game.actions.find((gameAction) => gameAction.action === action)?.label.replace(/ \(.\)/g, '')})`
      );
      await render(instanceId);
    } catch (error) {
      console.error('Error taking action:', error);
      setStatusMessage('Error taking action.');
    }
  }

  async function render(id: number) {
    try {
      const image = await fetchRender(id);
      setRenderedImage(image);
    } catch (error) {
      console.error('Error fetching render:', error);
    }
  }

  useEffect(() => {
    create();
  }, [game]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!instanceId) return;

      if (event.key === 'Enter') await reset(instanceId as number);

      if (isDone) return;

      for (const gameAction of game.actions) {
        if (gameAction.key && event.key === gameAction.key) await action(gameAction.action);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [instanceId, isDone, game, reward]);

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
            {observation && (
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
            )}
          </div>
        </Card>
        <Card className="p-2 w-3/5 flex items-center">
          {renderedImage && (
            <img
              src={`data:image/png;base64,${renderedImage}`}
              alt={game.name}
              className="border border-2"
              width={300}
            />
          )}
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
