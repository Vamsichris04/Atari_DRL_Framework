import { InputDataType, OutputDataType } from '@/types';

export const API_URL = 'http://localhost:8000/v1';

export const DefaultInputValues: InputDataType = {
  game: undefined,
  algorithm: undefined,
  parameters: undefined,
  userResult: undefined,
};

export const DefaultOutputValues: OutputDataType = {
  games: {
    // TODO: Remove temporary data
    'ALE/Breakout-v5': {
      agents: {
        AgentA: {
          average_total_reward: 1250,
          high_score: 300,
          average_score: 235,
          episodes: [
            { episode_number: 1, reward: 50 },
            { episode_number: 2, reward: 60 },
            { episode_number: 3, reward: 55 },
            { episode_number: 4, reward: 70 },
          ],
        },
        AgentB: {
          average_total_reward: 1100,
          high_score: 120,
          average_score: 72.5,
          episodes: [
            { episode_number: 1, reward: 40 },
            { episode_number: 2, reward: 70 },
            { episode_number: 3, reward: 120 },
            { episode_number: 4, reward: 60 },
          ],
        },
      },
    },
    'ALE/Seaquest-v5': {
      agents: {
        AgentA: {
          average_total_reward: 900,
          high_score: 200,
          average_score: 120,
          episodes: [
            { episode_number: 1, reward: 80 },
            { episode_number: 2, reward: 100 },
            { episode_number: 3, reward: 70 },
            { episode_number: 4, reward: 150 },
            { episode_number: 5, reward: 200 },
          ],
        },
        AgentC: {
          average_total_reward: 950,
          high_score: 180,
          average_score: 128,
          episodes: [
            { episode_number: 1, reward: 90 },
            { episode_number: 2, reward: 110 },
            { episode_number: 3, reward: 140 },
            { episode_number: 4, reward: 180 },
            { episode_number: 5, reward: 120 },
          ],
        },
      },
    },
    'ALE/Pong-v5': {
      agents: {
        AgentB: {
          average_total_reward: 800,
          high_score: 150,
          average_score: 100,
          episodes: [
            { episode_number: 1, reward: 60 },
            { episode_number: 2, reward: 80 },
            { episode_number: 3, reward: 150 },
            { episode_number: 4, reward: 110 },
          ],
        },
        AgentC: {
          average_total_reward: 820,
          high_score: 140,
          average_score: 115,
          episodes: [
            { episode_number: 1, reward: 70 },
            { episode_number: 2, reward: 140 },
            { episode_number: 3, reward: 120 },
            { episode_number: 4, reward: 130 },
          ],
        },
      },
    },
    'ALE/BeamRider-v5': {
      agents: {
        AgentA: {
          average_total_reward: 1050,
          high_score: 250,
          average_score: 145,
          episodes: [
            { episode_number: 1, reward: 90 },
            { episode_number: 2, reward: 100 },
            { episode_number: 3, reward: 110 },
            { episode_number: 4, reward: 120 },
            { episode_number: 5, reward: 200 },
            { episode_number: 6, reward: 250 },
          ],
        },
        AgentB: {
          average_total_reward: 980,
          high_score: 220,
          average_score: 136,
          episodes: [
            { episode_number: 1, reward: 80 },
            { episode_number: 2, reward: 100 },
            { episode_number: 3, reward: 130 },
            { episode_number: 4, reward: 150 },
            { episode_number: 5, reward: 220 },
          ],
        },
      },
    },
    'ALE/SpaceInvaders-v5': {
      agents: {
        AgentC: {
          average_total_reward: 1150,
          high_score: 280,
          average_score: 182.5,
          episodes: [
            { episode_number: 1, reward: 100 },
            { episode_number: 2, reward: 150 },
            { episode_number: 3, reward: 200 },
            { episode_number: 4, reward: 280 },
          ],
        },
        AgentA: {
          average_total_reward: 1100,
          high_score: 260,
          average_score: 175,
          episodes: [
            { episode_number: 1, reward: 120 },
            { episode_number: 2, reward: 140 },
            { episode_number: 3, reward: 260 },
            { episode_number: 4, reward: 180 },
          ],
        },
      },
    },
  },
};

export const ROUTES = [
  {
    route: '/',
    text: 'Home',
  },
  {
    route: '/select',
    text: 'Select a Game',
  },
  {
    route: '/algorithm',
    text: 'Select an Algorithm',
  },
  {
    route: '/configure',
    text: 'Configure the Agent',
  },
  {
    route: '/play',
    text: 'Play the Game',
  },
  {
    route: '/results',
    text: 'See the Results',
  },
];

export * from './configurationParameters';
export * from './games';
