import { Parameter } from '@/types';

export const PARAMETERS: Parameter[] = [
  {
    key: 'learning_rate',
    title: 'Select a Learning Rate',
    description: 'Step size',
  },
  {
    key: 'buffer_size',
    title: 'Select a Buffer Size',
    description: 'Size of the replay buffer',
  },
  {
    key: 'learning_starts',
    title: 'Select a Learning Starts Value',
    description: 'Number of steps before training begins',
  },
  {
    key: 'batch_size',
    title: 'Select a Batch Size',
    description: 'Number of samples per training step.',
  },
  {
    key: 'gamma',
    title: 'Select a Gamma Value',
    description: 'Discount factor for future rewards.',
  },
  {
    key: 'train_freq',
    title: 'Select a Training Frequency',
    description: 'Frequency of training (in steps).',
  },
  {
    key: 'target_update_interval',
    title: 'Select a Target Update Interval',
    description: 'How often to update the target network.',
  },
  {
    key: 'exploration_fraction',
    title: 'Select an Exploration Fraction',
    description: 'Fraction of training steps used to decay ε.',
  },
  {
    key: 'exploration_final_eps',
    title: 'Select an Exploration Final Epsilon Value',
    description: 'Final value of ε for exploration.',
  },
  {
    key: 'n_step',
    title: 'Select the Number of Steps',
    description: 'Number of steps for multi-step bootstrapping.',
  },
  {
    key: 'prioritized_replay',
    title: 'Enable Prioritize Replay?',
    description: 'Enables prioritized experience replay.',
  },
  {
    key: 'prioritized_replay_alpha',
    title: 'Select a Degree of Prioritization',
    description: 'Degree of prioritization (0 = uniform).',
  },
  {
    key: 'prioritized_replay_beta',
    title: 'Select a Importance-Sampling Correction Factor',
    description: 'Importance-sampling correction factor.',
  },
  {
    key: 'prioritized_replay_eps',
    title: 'Select a Prioritized Replay Epsilon Value',
    description: 'Small constant to avoid zero priority.',
  },
  {
    key: 'noisy_net_sigma',
    title: 'Select an Initial Noisy Nets Standard Deviation',
    description: 'Initial standard deviation for Noisy Nets.',
  },
  {
    key: 'use_noisy_net',
    title: 'Use Noisy Net?',
    description: 'Replaces ε-greedy with Noisy Networks.',
  },
  {
    key: 'atom_size',
    title: 'Select an Atom Size',
    description: 'Number of atoms in distributional RL.',
  },
  {
    key: 'v_min',
    title: 'Select a Min Value',
    description: 'Min value for distributional support.',
  },
  {
    key: 'v_max',
    title: 'Select a Max Value',
    description: 'Max value for distributional support.',
  },
  {
    key: 'n_steps',
    title: 'Select a Number of Steps',
    description: 'Number of steps to collect before each update.',
  },
  {
    key: 'n_epochs',
    title: 'Select a Number of Passes',
    description: 'Number of passes over each batch.',
  },
  {
    key: 'gae_lambda',
    title: 'Select a GAE Lambda Value',
    description: 'Controls bias-variance tradeoff in advantage estimation.',
  },
  {
    key: 'clip_range',
    title: 'Select a Clip Range',
    description: 'Limits how much the policy can change per update.',
  },
  {
    key: 'ent_coef',
    title: 'Select an Entropy Coefficient',
    description: 'Entropy coefficient to encourage exploration.',
  },
  {
    key: 'vf_coef',
    title: 'Select a Weight',
    description: 'Weight for value function loss.',
  },
  {
    key: 'max_grad_norm',
    title: 'Select a Gradient Clipping',
    description: 'Gradient clipping for stability.',
  },
];
