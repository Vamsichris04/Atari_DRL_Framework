import { InputDataType, OutputDataType } from '@/types';
import { GAMES } from '@/constants/games';

export const API_URL = 'http://localhost:8000/v1';

export const DefaultInputValues: InputDataType = {
  game: GAMES[0].name,
  userResult: undefined,
  configuration: undefined,
};

export const DefaultOutputValues: OutputDataType = {
  game: GAMES[0].name,
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
