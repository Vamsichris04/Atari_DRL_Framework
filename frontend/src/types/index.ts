import { StaticImageData } from 'next/image';

type GameName =
  | 'ALE/Breakout-v5'
  | 'ALE/Seaquest-v5'
  | 'ALE/Pong-v5'
  | 'ALE/BeamRider-v5'
  | 'ALE/SpaceInvaders-v5';

export interface InputDataType {
  game: GameName;
  userResult: string | undefined;
  configuration: Configuration | undefined;
}

export interface OutputDataType {
  game: GameName;
}

export interface DataContextType {
  inputData: InputDataType;
  outputData: OutputDataType;
  setInputValue: (parameter: string, value: string) => void;
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

type Algorithm = 'DQN' | 'Rainbow' | 'PPO';

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

interface ConfigurationBase {
  game: GameName;
  algorithm: Algorithm;
  parameters: DQNParameters | RainbowParameters | PPOParameters;
}

interface DQNConfiguration extends ConfigurationBase {
  algorithm: 'DQN';
  parameters: DQNParameters;
}

interface RainbowConfiguration extends ConfigurationBase {
  algorithm: 'Rainbow';
  parameters: RainbowParameters;
}

interface PPOConfiguration extends ConfigurationBase {
  algorithm: 'PPO';
  parameters: PPOParameters;
}

export type Configuration = DQNConfiguration | RainbowConfiguration | PPOConfiguration;

export type Parameter = {
  key: keyof DQNParameters | keyof RainbowParameters | keyof PPOParameters;
  title: string;
  description: string;
};
