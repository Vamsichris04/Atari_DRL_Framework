import { InputDataType, OutputDataType } from '@/types';

export const API_URL = 'http://localhost:8000/v1';

export const DefaultInputValues: InputDataType = {
  game: undefined,
  userResult: undefined,
  configuration: undefined,
};

export const DefaultOutputValues: OutputDataType = {
  game: undefined,
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
    route: '/play',
    text: 'Play the Game',
  },
  {
    route: '/configure',
    text: 'Configure the Agent',
  },
  {
    route: '/results',
    text: 'See the Results',
  },
];

export * from './configurationParameters';
export * from './configurations';
export * from './games';
