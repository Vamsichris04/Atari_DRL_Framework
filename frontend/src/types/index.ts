import { StaticImageData } from 'next/image';

type GameName =
  | 'ALE/Breakout-v5'
  | 'ALE/Seaquest-v5'
  | 'ALE/Pong-v5'
  | 'ALE/BeamRider-v5'
  | 'ALE/SpaceInvaders-v5';

export type Parameters = DQNParameters | RainbowParameters | PPOParameters;

export interface InputDataType {
  game: GameName | undefined;
  algorithm: Algorithm | undefined;
  parameters: Parameters | undefined;
  userResult: string | undefined;
}

export interface OutputDataType {
  game: GameName | undefined;
}

export interface DataContextType {
  inputData: InputDataType;
  outputData: OutputDataType;
  setInputValue: (parameter: keyof InputDataType, value: string | Parameters) => void;
  setOutputData: (outputData: OutputDataType) => void;
}

export interface Game {
  name: GameName;
  description: string;
  image: StaticImageData;
  actions: {
    key?: string;
    action: number;
    label: string;
  }[];
  twoActionColumns?: boolean;
}

export type Algorithm = 'DQN' | 'Rainbow' | 'PPO';

interface DQNParameters {
  learning_rate: number;
  buffer_size: number;
  learning_starts: number;
  batch_size: number;
  gamma: number;
  train_freq: number;
  target_update_interval: number;
  exploration_fraction: number;
  exploration_final_eps: number;
}

interface RainbowParameters {
  learning_rate: number;
  buffer_size: number;
  learning_starts: number;
  batch_size: number;
  gamma: number;
  train_freq: number;
  target_update_interval: number;
  n_step: number;
  use_noisy_net: boolean;
  noisy_net_sigma: number;
  prioritized_replay: boolean;
  prioritized_replay_alpha: number;
  prioritized_replay_beta: number;
  prioritized_replay_eps: number;
  atom_size: number;
  v_min: number;
  v_max: number;
}

interface PPOParameters {
  learning_rate: number;
  n_steps: number;
  batch_size: number;
  n_epochs: number;
  gamma: number;
  gae_lambda: number;
  clip_range: number;
  ent_coef: number;
  vf_coef: number;
  max_grad_norm: number;
}

export type Parameter = {
  algorithms: Algorithm[];
  key: ParameterKeys;
  title: string;
  description: string;
  isBoolean?: boolean;
  max?: number;
  min?: number;
};

export type ParameterKeys = keyof DQNParameters | keyof RainbowParameters | keyof PPOParameters;
