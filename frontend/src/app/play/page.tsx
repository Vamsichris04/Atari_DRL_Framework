'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/providers/data';
import { GAMES } from '@/constants/constants';
import { Button } from '@/components/ui/button';
import { createEnvironment, fetchRender, resetEnvironment, takeAction } from '@/api/api';

function Page() {
  const { inputData } = useData();
  const selectedEnv = inputData.game;
  const [instanceId, setInstanceId] = useState<number | null>(null);
  const [observation, setObservation] = useState(null);
  const [reward, setReward] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Loading...');
  const [renderedImage, setRenderedImage] = useState<string | null>(null);

  async function create() {
    try {
      const newInstanceId = await createEnvironment(selectedEnv);
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
      setReward(data.reward);
      setIsDone(data.episodeDone);
      setStatusMessage(data.episodeDone ? 'Episode finished!' : 'Action taken.');
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
  }, [selectedEnv]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!instanceId) return;

      if (event.key === 'Enter') await reset(instanceId as number);

      if (isDone) return;

      const keyMappings = GAMES.find((game) => game.name === selectedEnv)?.actions ?? [];

      for (const keyMapping of keyMappings) {
        if (event.key === keyMapping.key) await action(keyMapping.action);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [instanceId, isDone, selectedEnv]);

  const getActionButtons = () => {
    const labels =
      GAMES.find((game) => game.name === selectedEnv)?.actions.map((action) => action.label) ?? [];
    return labels.map((label, index) => (
      <Button
        key={index}
        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        onClick={() => action(index)}
      >
        {label}
      </Button>
    ));
  };

  return (
    <div className="flex gap-2 m-2">
      <div>
        <div>
          <h1>
            <b>{selectedEnv}</b>
          </h1>
          <p>{statusMessage}</p>
          <Button
            className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600"
            onClick={() => reset(instanceId as number)}
            disabled={!isDone}
          >
            Reset Environment (Enter)
          </Button>
        </div>
        <div>
          {observation && (
            <div className="game-container">
              <h2>Current State</h2>
              <pre>{JSON.stringify(observation, null, 2)}</pre>
              <h3>Reward: {reward}</h3>
              <div className="flex gap-2">{getActionButtons()}</div>
            </div>
          )}
        </div>
      </div>
      <div>
        {renderedImage && (
          <img
            src={`data:image/png;base64,${renderedImage}`}
            alt={selectedEnv}
            className="border"
          />
        )}
      </div>
    </div>
  );
}

export default Page;
