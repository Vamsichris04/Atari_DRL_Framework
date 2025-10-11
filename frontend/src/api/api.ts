import { API_URL } from '@/constants/constants';

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
