import { Parameter } from '@/types';

export const PARAMETERS: Parameter[] = [
  {
    algorithms: ['DQN', 'Rainbow', 'PPO'],
    key: 'learning_rate',
    title: 'Learning Rate',
    description:
      'How often the agent updates its parameter weights. Smaller values mean slower, but more stable learning.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'buffer_size',
    title: 'Buffer Size',
    description:
      'How many past experiences the agent can store. Larger values mean more diverse training data.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'learning_starts',
    title: 'Learning Starts',
    description:
      'Number of steps before training begins, to allow the agent to fill its memory buffer before training.',
  },
  {
    algorithms: ['DQN', 'Rainbow', 'PPO'],
    key: 'batch_size',
    title: 'Batch Size',
    description:
      'Number of experiences that are sampled from the buffer per training step. Larger batches mean smoother learning, but require more cost to compute.',
  },
  {
    algorithms: ['DQN', 'Rainbow', 'PPO'],
    key: 'gamma',
    title: 'Gamma',
    description:
      'How much the agent values future rewards compared to immediate ones. Values closer to 1 mean long-term focus.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'train_freq',
    title: 'Training Frequency',
    description: 'How often the agent trains (in steps).',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'target_update_interval',
    title: 'Target Update Interval',
    description: 'How often to update the target network (how often to stabilize).',
  },
  {
    algorithms: ['DQN'],
    key: 'exploration_fraction',
    title: 'Exploration Fraction',
    description:
      'The portion of the total training where the agent prioritizes exploring the environment by taking random actions.',
  },
  {
    algorithms: ['DQN'],
    key: 'exploration_final_eps',
    title: 'Exploration Final Epsilon',
    description: 'The minimum amount training where the agent takes random actions.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'n_step',
    title: 'Number of Steps',
    description: 'Number of steps for for the agent to look ahead.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'use_noisy_net',
    title: 'Use Noisy Net?',
    description: 'Whether to inject noise into the weights for smarter exploration.',
    isBoolean: true,
  },
  {
    algorithms: ['Rainbow'],
    key: 'noisy_net_sigma',
    title: 'Noisy Net Sigma',
    description:
      'The scale of noise added to weights. Higher values mean more randomness in exploration.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay',
    title: 'Enable Prioritize Replay?',
    description:
      'Whether to prioritize "important" experiences (those with high learning potential)',
    isBoolean: true,
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay_alpha',
    title: 'Prioritized Replay Alpha',
    description: 'How strongly prioritization is applied.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay_beta',
    title: 'Prioritized Replay Beta',
    description: 'How much to correct for bias.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay_eps',
    title: 'Prioritized Replay Epsilon',
    description: 'Small constant to avoid zero priority. Prevents experiences from being ignored.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'atom_size',
    title: 'Atom Size',
    description: 'Number of discrete points in the distribution of possible returns.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'v_min',
    title: 'V Min',
    description: 'Minimum value for distributional support.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'v_max',
    title: 'V Max',
    description: 'Maximum value for distributional support.',
  },
  {
    algorithms: ['PPO'],
    key: 'n_steps',
    title: 'Number of Steps',
    description: 'Number of steps to collect before each update.',
  },
  {
    algorithms: ['PPO'],
    key: 'n_epochs',
    title: 'Number of Epochs',
    description: 'Number of times each batch of data is reused during training.',
  },
  {
    algorithms: ['PPO'],
    key: 'gae_lambda',
    title: 'GAE Lambda',
    description:
      'Controls bias-variance tradeoff in advantage estimation. Lower values mean less variance, but more bias. Higher values mean less bias, but more variance.',
  },
  {
    algorithms: ['PPO'],
    key: 'clip_range',
    title: 'Clip Range',
    description: 'Limits how much the policy can change per update.',
  },
  {
    algorithms: ['PPO'],
    key: 'ent_coef',
    title: 'Entropy Coefficient',
    description:
      'Entropy coefficient to encourage exploration. Higher values mean more randomness.',
  },
  {
    algorithms: ['PPO'],
    key: 'vf_coef',
    title: 'Value Function Coefficient',
    description:
      'Weight for value function loss. Balances the importance of the value loss vs. policy loss in the total objective.',
  },
  {
    algorithms: ['PPO'],
    key: 'max_grad_norm',
    title: 'Max Gradient Norm',
    description:
      'Gradient clipping for stability. Prevents excessively large updates that could destabilize training.',
  },
];
