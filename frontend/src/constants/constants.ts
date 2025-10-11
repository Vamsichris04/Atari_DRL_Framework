import { InputDataType, OutputDataType } from '@/types/types';

export const API_URL = 'http://localhost:8000/v1';

export const GAMES = [
  {
    name: 'CartPole-v1',
    actions: [
      {
        key: 'ArrowLeft',
        action: 0,
        label: 'Push Left (←)',
      },
      {
        key: 'ArrowRight',
        action: 1,
        label: 'Push Right (→)',
      },
    ],
    observations: ['Cart Position', 'Cart Velocity', 'Pole Angle', 'Pole Angular Velocity'],
  },
  {
    name: 'Acrobot-v1',
    actions: [
      {
        key: 'ArrowLeft',
        action: 0,
        label: 'Torque -1 (←)',
      },
      {
        key: 'ArrowRight',
        action: 1,
        label: 'Torque +1 (→)',
      },
    ],
    observations: [
      'Cosine of theta1',
      'Sine of theta1',
      'Cosine of theta2',
      'Sine of theta2',
      'Angular Velocity of theta1',
      'Angular Velocity of theta2',
    ],
  },
  {
    name: 'MountainCar-v0',
    actions: [
      {
        key: 'ArrowLeft',
        action: 0,
        label: 'Accelerate Left (←)',
      },
      {
        key: 'ArrowUp',
        action: 1,
        label: 'No Push (↑)',
      },
      {
        key: 'ArrowRight',
        action: 2,
        label: 'Accelerate Right (→)',
      },
    ],
    observations: ['Position of the Car Along the X-Axis', 'Velocity of the Car'],
  },
];

export const DefaultInputValues: InputDataType = {
  game: GAMES[0].name,
};

export const DefaultOutputValues: OutputDataType = {
  game: '',
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
    route: 'configure',
    text: 'Configure the Agent',
  },
  {
    route: '/results',
    text: 'See the Results',
  },
];
