'use client';
import { API_URL } from '@/constants';
import { useData } from '@/providers/data';
// import { stringify } from 'yaml';
import { Parameters } from '@/types';

export async function createEnvironment(environment: string) {
  const response = await fetch(`${API_URL}/envs/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ env_id: environment }),
  });
  const data = await response.json();
  const newInstanceId = data.instance_id;
  return newInstanceId as number;
}

export async function resetEnvironment(id: number) {
  const response = await fetch(`${API_URL}/envs/${id}/reset/`, {
    method: 'POST',
  });
  const data = await response.json();
  return data.observation;
}

export async function takeAction(instanceId: number, action: number) {
  const response = await fetch(`${API_URL}/envs/${instanceId}/step/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  const data = await response.json();
  return {
    observation: data.observation,
    reward: data.reward,
    episodeDone: data.terminated || data.truncated,
  };
}

export async function fetchRender(id: number) {
  const response = await fetch(`${API_URL}/envs/${id}/render/`);
  const data = await response.json();
  return data.image as string;
}

export function useAgent() {
  // const { inputData, setOutputData } = useData();
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

    // TODO: Commented out below and above, until backend is able to accept calls
    // const response = await fetch(`${API_URL}/run`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/yaml' },
    //   body: stringify(body)
    // })
    // const data = await response.json();
    // setOutputData(data)
  }

  return { runAgent };
}
