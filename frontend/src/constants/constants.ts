import { Game, InputDataType, OutputDataType } from '@/types/types';
import breakout from '../images/breakout.gif';
import seaquest from '../images/seaquest.gif';
import pong from '../images/pong.gif';
import beam_rider from '../images/beam_rider.gif';
import space_invaders from '../images/space_invaders.gif';

export const API_URL = 'http://localhost:8000/v1';

export const GAMES: Game[] = [
  {
    name: 'ALE/Breakout-v5',
    description:
      'You move a paddle and hit the ball in a brick wall at the top of the screen. Your goal is to destroy the brick wall. You can try to break through the wall and let the ball wreak havoc on the other side, all on its own! You have five lives.',
    image: breakout,
    actions: [
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'ArrowLeft',
        action: 3,
        label: 'LEFT (←)',
      },
      {
        key: 'ArrowRight',
        action: 2,
        label: 'RIGHT (→)',
      },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Seaquest-v5',
    description:
      'You control a sub able to move in all directions and fire torpedoes. The goal is to retrieve as many divers as you can, while dodging and blasting enemy subs and killer sharks; points will be awarded accordingly. The game begins with one sub and three waiting on the horizon. Each time you increase your score by 10,000 points, an extra sub will be delivered to yourbase. You can only have six reserve subs on the screen at one time. Your sub will explode if it collides with anything except your own divers. The sub has a limited amount of oxygen that decreases at a constant rate during the game. When the oxygen tank is almost empty, you need to surface and if you don’t do it in time, your sub will blow up and you’ll lose one diver. Each time you’re forced to surface, with less than six divers, you lose one diver as well.',
    image: seaquest,
    actions: [
      {
        action: 15,
        label: 'UPLEFTFIRE',
      },
      {
        action: 10,
        label: 'UPFIRE',
      },
      {
        action: 14,
        label: 'UPRIGHTFIRE',
      },
      {
        action: 7,
        label: 'UPLEFT',
      },
      {
        key: 'ArrowUp',
        action: 2,
        label: 'UP (↑)',
      },
      {
        action: 6,
        label: 'UPRIGHT',
      },
      {
        key: 'ArrowLeft',
        action: 4,
        label: 'LEFT (←)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'ArrowRight',
        action: 3,
        label: 'RIGHT (→)',
      },
      {
        action: 12,
        label: 'LEFTFIRE',
      },
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        action: 11,
        label: 'RIGHTFIRE',
      },
      {
        action: 9,
        label: 'DOWNLEFT',
      },
      {
        key: 'ArrowDown',
        action: 5,
        label: 'DOWN (↓)',
      },
      {
        action: 8,
        label: 'DOWNRIGHT',
      },
      {
        action: 17,
        label: 'DOWNLEFTFIRE',
      },
      {
        action: 13,
        label: 'DOWNFIRE',
      },
      {
        action: 16,
        label: 'DOWNRIGHTFIRE',
      },
    ],
  },
  {
    name: 'ALE/Pong-v5',
    description:
      'You control the right paddle, you compete against the left paddle controlled by the computer. You each try to keep deflecting the ball away from your goal and into your opponent’s goal.',
    image: pong,
    actions: [
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'ArrowLeft',
        action: 3,
        label: 'LEFT (←)',
      },
      {
        key: 'ArrowRight',
        action: 2,
        label: 'RIGHT (→)',
      },
      {
        action: 5,
        label: 'LEFTFIRE',
      },
      {
        action: 4,
        label: 'RIGHTFIRE',
      },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/BeamRider-v5',
    description:
      'You control a space-ship that travels forward at a constant speed. You can only steer it sideways between discrete positions. Your goal is to destroy enemy ships, avoid their attacks and dodge space debris.',
    image: beam_rider,
    actions: [
      {
        action: 6,
        label: 'UPLEFT',
      },
      {
        key: 'ArrowUp',
        action: 2,
        label: 'UP (↑)',
      },
      {
        action: 5,
        label: 'UPRIGHT',
      },
      {
        key: 'ArrowLeft',
        action: 4,
        label: 'LEFT (←)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'ArrowRight',
        action: 3,
        label: 'RIGHT (→)',
      },
      {
        action: 8,
        label: 'LEFTFIRE',
      },
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        action: 7,
        label: 'RIGHTFIRE',
      },
    ],
  },
  {
    name: 'ALE/SpaceInvaders-v5',
    description:
      'Your objective is to destroy the space invaders by shooting your laser cannon at them before they reach the Earth. The game ends when all your lives are lost after taking enemy fire, or when they reach the earth.',
    image: space_invaders,
    actions: [
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'ArrowLeft',
        action: 3,
        label: 'LEFT (←)',
      },
      {
        key: 'ArrowRight',
        action: 2,
        label: 'RIGHT (→)',
      },
      {
        action: 5,
        label: 'LEFTFIRE',
      },
      {
        action: 4,
        label: 'RIGHTFIRE',
      },
    ],
    twoActionColumns: true,
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
