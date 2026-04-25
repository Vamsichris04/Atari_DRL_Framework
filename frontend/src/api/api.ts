'use client';
import { API_URL } from '@/constants';
import { useData } from '@/providers/data';
import { OutputDataType, Parameters } from '@/types';

/** WebSocket URL for the training env live preview (`/training/stream`). */
export function trainingWebSocketUrl(): string {
  const u = new URL(API_URL);
  const wsProto = u.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${wsProto}//${u.host}/v1/training/stream`;
}

export async function createEnvironment(environment: string) {
  const response = await fetch(`${API_URL}/envs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ env_id: environment }),
  });
  const data = await response.json();
  return data.instance_id as string;
}

export async function resetEnvironment(id: string, options?: { render?: boolean }) {
  const q = options?.render ? '?render=true' : '';
  const response = await fetch(`${API_URL}/envs/${id}/reset/${q}`, {
    method: 'POST',
  });
  const data = await response.json();
  return {
    observation: data.observation,
    image: typeof data.image === 'string' ? data.image : undefined,
  };
}

export async function takeAction(
  instanceId: string,
  action: number,
  options?: { render?: boolean }
) {
  const response = await fetch(`${API_URL}/envs/${instanceId}/step/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, render: options?.render ?? false }),
  });
  const data = await response.json();
  return {
    observation: data.observation,
    reward: data.reward,
    episodeDone: data.terminated || data.truncated,
    image: typeof data.image === 'string' ? data.image : undefined,
  };
}

export async function fetchRender(id: string) {
  const response = await fetch(`${API_URL}/envs/${id}/render/`);
  const data = await response.json();
  return data.image as string;
}

export function useAgent() {
  const { inputData } = useData();

  async function runAgent() {
    const body: Record<string, string | number | object> = {
      run_name: `${inputData.game}_${inputData.algorithm}_${Date.now()}`,
      env_id: inputData.game as string,
      seed: 42,
      total_timesteps: 1_000_000,
    };
    if (inputData.algorithm === 'DQN') {
      body['dqn'] = inputData.parameters as Parameters;
    } else if (inputData.algorithm === 'Rainbow') {
      body['rainbow_dqn'] = inputData.parameters as Parameters;
    } else if (inputData.algorithm === 'PPO') {
      body['ppo'] = inputData.parameters as Parameters;
    }
    body['eval'] = {
      enabled: true,
      freq: 10000,
      n_episodes: 5,
      deterministic: true,
    };

    console.log(body);

    const res = await fetch(`${API_URL}/training/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data);
  }

  return { runAgent };
}

export async function fetchResults() {
  const response = await fetch(`${API_URL}/training/results`);
  const data = await response.json();
  return data as OutputDataType;
}

export async function fetchStatus() {
  const response = await fetch(`${API_URL}/training/status`);
  return await response.json();
}
