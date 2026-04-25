import { InputDataType, OutputDataType } from '@/types';

export const API_URL = 'http://localhost:8000/v1';

export const DefaultInputValues: InputDataType = {
  game: undefined,
  algorithm: undefined,
  parameters: undefined,
  userResult: undefined,
};

export const DefaultOutputValues: OutputDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  games: [] as any,
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
