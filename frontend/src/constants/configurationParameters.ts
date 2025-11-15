import { Parameter } from '@/types';

export const PARAMETERS: Parameter[] = [
  {
    key: 'learning_rate',
    title: 'Select a Learning Rate',
    description:
      'How often the agent updates its parameter weights. Smaller values mean slower, but more stable learning.',
  },
  {
    key: 'buffer_size',
    title: 'Select a Buffer Size',
    description:
      'How many past experiences the agent can store. Larger values mean more diverse training data.',
  },
  {
    key: 'learning_starts',
    title: 'Select a Learning Starts Value',
    description:
      'Number of steps before training begins, to allow the agent to fill its memory buffer before training.',
  },
  {
    key: 'batch_size',
    title: 'Select a Batch Size',
    description:
      'Number of experiences that are sampled from the buffer per training step. Larger batches mean smoother learning, but require more cost to compute.',
  },
  {
    key: 'gamma',
    title: 'Select a Gamma Value',
    description:
      'How much the agent values future rewards compared to immediate ones. Values closer to 1 mean long-term focus.',
  },
  {
    key: 'train_freq',
    title: 'Select a Training Frequency',
    description: 'How often the agent trains (in steps).',
  },
  {
    key: 'target_update_interval',
    title: 'Select a Target Update Interval',
    description: 'How often to update the target network (how often to stabilize).',
  },
  {
    key: 'exploration_fraction',
    title: 'Select an Exploration Fraction',
    description:
      'The portion of the total training where the agent prioritizes exploring the environment by taking random actions.',
  },
  {
    key: 'exploration_final_eps',
    title: 'Select an Exploration Final Epsilon Value',
    description: 'The minimum amount training where the agent takes random actions.',
  },
  {
    key: 'n_step',
    title: 'Select the Number of Steps',
    description: 'Number of steps for for the agent to look ahead.',
  },
  {
    key: 'prioritized_replay',
    title: 'Enable Prioritize Replay?',
    description:
      'Whether to prioritize "important" experiences (those with high learning potential)',
  },
  {
    key: 'prioritized_replay_alpha',
    title: 'Select a Degree of Prioritization',
    description: 'How strongly prioritization is applied.',
  },
  {
    key: 'prioritized_replay_beta',
    title: 'Select a Importance-Sampling Correction Factor',
    description: 'How much to correct for bias.',
  },
  {
    key: 'prioritized_replay_eps',
    title: 'Select a Prioritized Replay Epsilon Value',
    description: 'Small constant to avoid zero priority. Prevents experiences from being ignored.',
  },
  {
    key: 'noisy_net_sigma',
    title: 'Select an Initial Noisy Nets Standard Deviation',
    description:
      'The scale of noise added to weights. Higher values mean more randomness in exploration.',
  },
  {
    key: 'use_noisy_net',
    title: 'Use Noisy Net?',
    description: 'Whether to inject noise into the weights for smarter exploration.',
  },
  {
    key: 'atom_size',
    title: 'Select an Atom Size',
    description: 'Number of discrete points in the distribution of possible returns.',
  },
  {
    key: 'v_min',
    title: 'Select a Min Value',
    description: 'Minimum value for distributional support.',
  },
  {
    key: 'v_max',
    title: 'Select a Max Value',
    description: 'Maximum value for distributional support.',
  },
  {
    key: 'n_steps',
    title: 'Select a Number of Steps',
    description: 'Number of steps to collect before each update.',
  },
  {
    key: 'n_epochs',
    title: 'Select a Number of Passes',
    description: 'Number of times each batch of data is reused during training.',
  },
  {
    key: 'gae_lambda',
    title: 'Select a GAE Lambda Value',
    description:
      'Controls bias-variance tradeoff in advantage estimation. Lower values mean less variance, but more bias. Higher values mean less bias, but more variance.',
  },
  {
    key: 'clip_range',
    title: 'Select a Clip Range',
    description: 'Limits how much the policy can change per update.',
  },
  {
    key: 'ent_coef',
    title: 'Select an Entropy Coefficient',
    description:
      'Entropy coefficient to encourage exploration. Higher values mean more randomness.',
  },
  {
    key: 'vf_coef',
    title: 'Select a Weight',
    description:
      'Weight for value function loss. Balances the importance of the value loss vs. policy loss in the total objective.',
  },
  {
    key: 'max_grad_norm',
    title: 'Select a Gradient Clipping',
    description:
      'Gradient clipping for stability. Prevents excessively large updates that could destabilize training.',
  },
];
