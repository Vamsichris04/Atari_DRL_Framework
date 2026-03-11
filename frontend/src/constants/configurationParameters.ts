import { Parameter } from '@/types';

export const PARAMETERS: Parameter[] = [
  {
    algorithms: ['DQN', 'Rainbow', 'PPO'],
    key: 'learning_rate',
    title: 'Learning Rate',
    description:
      'How often the agent updates its parameter weights. Smaller values mean slower, but more stable learning.',
    details:
      'The learning rate controls the step size used by the optimizer (typically Adam) when updating the neural network weights after each gradient step. It scales how much the weights shift in the direction that reduces the loss. In RL, an unstable environment and non-stationary targets mean the learning rate has an outsized effect on training stability compared to supervised learning. Very high values cause the weights to overshoot minima, leading to divergence. Very low values cause painfully slow convergence. Most RL algorithms are sensitive to this parameter and it is often the first one to tune.',
    pros: [
      'Smaller values produce stable, reliable convergence',
      'Reduces risk of overshooting the optimal policy',
      'Works well across a wide range of environments',
    ],
    cons: [
      'Too small slows training significantly',
      'Too large causes divergence or oscillation',
      'Requires careful tuning per environment',
    ],
    tip: 'Start with 1e-4 for DQN/Rainbow and 3e-4 for PPO, then halve it if training is unstable.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'buffer_size',
    title: 'Buffer Size',
    description:
      'How many past experiences the agent can store. Larger values mean more diverse training data.',
    details:
      'The replay buffer stores past (state, action, reward, next_state, done) transitions so the agent can sample from them randomly during training. This breaks the temporal correlation between consecutive transitions, which would otherwise cause the network to overfit to recent experience. A larger buffer means transitions from a wider range of policies and time periods are available, improving diversity. However, a very large buffer may contain stale transitions from a much earlier, weaker policy, which can slow learning. Buffer size also directly impacts RAM usage, so it must be balanced with available hardware.',
    pros: [
      'Larger buffers reduce correlation between samples',
      'More diverse data leads to better generalisation',
      'Helps stabilise training in complex environments',
    ],
    cons: [
      'Large buffers consume significant RAM',
      'Old experiences may become stale and misleading',
      'Longer warmup time before useful training begins',
    ],
    tip: 'Use 100k–1M for Atari. If memory is limited, 50k is a reasonable minimum.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'learning_starts',
    title: 'Learning Starts',
    description:
      'Number of steps before training begins, to allow the agent to fill its memory buffer before training.',
    details:
      'Before the agent starts updating its network, it collects experience by taking random or near-random actions. This pre-fills the replay buffer so that the first training batches contain a diverse set of transitions rather than a narrow slice of early experience. Without this warmup period, the network would overfit to a very limited distribution of states and actions seen right at the start of training, which can lead to poor initial policies that are hard to recover from. The value should be large enough to fill a meaningful portion of the buffer.',
    pros: [
      'Ensures the buffer has diverse experiences before training',
      'Prevents early overfitting to a narrow set of transitions',
      'Gives the agent time to explore before learning',
    ],
    cons: [
      'Delays the start of actual learning',
      'Too high wastes compute on random exploration',
      'Does not guarantee the buffer is representative',
    ],
    tip: 'Set to 10–20% of your total buffer size as a starting point.',
  },
  {
    algorithms: ['DQN', 'Rainbow', 'PPO'],
    key: 'batch_size',
    title: 'Batch Size',
    description:
      'Number of experiences that are sampled from the buffer per training step. Larger batches mean smoother learning, but require more cost to compute.',
    details:
      'At each training step, a mini-batch of transitions is sampled from the replay buffer (DQN/Rainbow) or the current rollout buffer (PPO) and used to compute a gradient update. Larger batches produce a more accurate estimate of the true gradient, reducing noise in the update direction. This tends to stabilise training but requires more memory and compute per step. Smaller batches are noisier but can sometimes help escape local minima. The optimal batch size depends on the algorithm, hardware, and environment.',
    pros: [
      'Larger batches give more stable gradient estimates',
      'Reduces variance in training updates',
      'Can speed up training on GPU hardware',
    ],
    cons: [
      'Larger batches require more memory and compute',
      'Too large can slow down learning per sample',
      'Small batches introduce noisy gradients',
    ],
    tip: 'Use 32–64 for DQN/Rainbow. PPO typically works well with 64–256.',
  },
  {
    algorithms: ['DQN', 'Rainbow', 'PPO'],
    key: 'gamma',
    title: 'Gamma',
    description:
      'How much the agent values future rewards compared to immediate ones. Values closer to 1 mean long-term focus.',
    details:
      'Gamma is the discount factor used to compute the return — the cumulative sum of future rewards. A reward received k steps in the future is multiplied by gamma^k before being added to the return. A value of 1.0 means all future rewards are treated equally; a value of 0.0 means only immediate rewards matter. Values near 1.0 encourage long-term planning, which is important in games where actions now have consequences many steps later. However, very high gamma values make the value function harder to estimate accurately because small errors compound over many steps.',
    pros: [
      'High values (0.99) encourage long-term planning',
      'Low values make training faster and more stable early on',
      'Well-studied parameter with known good defaults',
    ],
    cons: [
      'Values too close to 1 can slow convergence',
      'Low values cause the agent to be short-sighted',
      'Wrong value can cause reward misalignment',
    ],
    tip: 'Use 0.99 for most Atari games. Lower to 0.95 if the agent is too short-sighted.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'train_freq',
    title: 'Training Frequency',
    description: 'How often the agent trains (in steps).',
    details:
      'Training frequency determines how many environment steps are taken between each gradient update. A value of 1 means the network is updated after every single step; a value of 4 means the agent collects 4 transitions and then performs one update. Lower values mean more frequent updates, which can speed up learning but also increases the risk of overfitting to recent experience. Higher values amortise the compute cost of training over more environment steps, which is useful when environment interaction is cheap but computation is expensive.',
    pros: [
      'Lower values (train more often) can speed up learning',
      'Higher values reduce compute cost per environment step',
      'Allows balancing of data collection vs. training',
    ],
    cons: [
      'Training too frequently on limited data causes overfitting',
      'Training too infrequently slows policy improvement',
      'Interacts with buffer size and learning starts',
    ],
    tip: 'A value of 4 (train every 4 steps) is standard for DQN on Atari.',
  },
  {
    algorithms: ['DQN', 'Rainbow'],
    key: 'target_update_interval',
    title: 'Target Update Interval',
    description: 'How often to update the target network (how often to stabilize).',
    details:
      'DQN and Rainbow use two separate networks: an online network that is updated every training step, and a target network that provides stable Q-value targets. Without a target network, the targets would shift every step as the online network changes, creating a moving target problem that destabilises training. The target network is periodically copied from the online network every N steps. A large interval keeps targets stable for longer, reducing oscillation. A small interval keeps the targets more current but reintroduces instability.',
    pros: [
      'Stabilises training by keeping targets fixed between updates',
      'Reduces harmful feedback loops in Q-value estimation',
      'Simple mechanism with a strong effect on stability',
    ],
    cons: [
      'Too infrequent means targets lag too far behind',
      'Too frequent reintroduces instability',
      'Must be tuned alongside learning rate',
    ],
    tip: 'Use 1000 steps for standard DQN. Rainbow can tolerate shorter intervals.',
  },
  {
    algorithms: ['DQN'],
    key: 'exploration_fraction',
    title: 'Exploration Fraction',
    description:
      'The portion of the total training where the agent prioritizes exploring the environment by taking random actions.',
    details:
      'DQN uses an epsilon-greedy exploration strategy where, with probability epsilon, the agent takes a random action instead of the greedy action. Epsilon starts at 1.0 (fully random) and decays linearly to the final epsilon value over the first X fraction of total training steps. Exploration fraction controls what fraction of total training is used for this decay. A larger fraction means the agent explores for longer before committing to its learned policy. This is critical for environments where the agent needs to discover specific sequences of actions to receive any reward.',
    pros: [
      'Ensures the agent explores the environment early on',
      'Prevents premature convergence to a suboptimal policy',
      'Easy to tune relative to total training steps',
    ],
    cons: [
      'Too high wastes training time on random actions',
      'Too low means the agent may miss important states',
      'Linearly decaying epsilon may not suit all environments',
    ],
    tip: 'Use 0.1 (10% of training) as a starting point for Atari environments.',
  },
  {
    algorithms: ['DQN'],
    key: 'exploration_final_eps',
    title: 'Exploration Final Epsilon',
    description: 'The minimum amount of training where the agent takes random actions.',
    details:
      'After epsilon has decayed to its final value, the agent continues to take random actions with this fixed probability for the rest of training. This ensures the agent never becomes fully deterministic, maintaining a small but non-zero level of exploration throughout. This is useful because the environment may contain states the agent rarely visits, and a small epsilon ensures it continues to occasionally explore them. Setting this to zero is possible but risks the agent getting stuck in locally optimal but globally suboptimal behaviour.',
    pros: [
      'Maintains a small amount of exploration throughout training',
      'Helps avoid getting stuck in local optima late in training',
      'Prevents completely deterministic behaviour',
    ],
    cons: [
      'Too high prevents the agent from fully exploiting its learned policy',
      'Too low removes the benefit of continued exploration',
      'Has less impact than exploration fraction overall',
    ],
    tip: 'A value of 0.01–0.05 is typical. Use 0.01 for most Atari tasks.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'n_step',
    title: 'Number of Steps',
    description: 'Number of steps for the agent to look ahead.',
    details:
      'Instead of using a standard 1-step TD target (immediate reward plus discounted next Q-value), n-step returns accumulate rewards over n steps before bootstrapping. This propagates reward signals further back through the network in a single update, significantly improving sample efficiency. For example, with n=3, the target includes the next 3 rewards discounted, plus the Q-value of the state 3 steps ahead. Larger n values reduce bias but increase variance. This is one of the most impactful components of the Rainbow algorithm.',
    pros: [
      'Multi-step returns propagate rewards faster through the network',
      'Reduces bias in value estimates compared to 1-step TD',
      'Often improves sample efficiency significantly',
    ],
    cons: [
      'Higher values introduce more variance in returns',
      'Can destabilise training in noisy environments',
      'Interacts with gamma — effects compound over steps',
    ],
    tip: 'n=3 is the standard Rainbow setting and works well for most Atari games.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'use_noisy_net',
    title: 'Use Noisy Net?',
    description: 'Whether to inject noise into the weights for smarter exploration.',
    isBoolean: true,
    details:
      'NoisyNets replace the standard epsilon-greedy exploration strategy with learned stochastic layers. Noise is added directly to the weights of the network, parameterised by learnable mean and variance values. The network learns how much noise to inject in each state, effectively discovering a state-dependent exploration policy. This is more adaptive than epsilon-greedy because the agent explores more in uncertain states and less in familiar ones. It is a key component of Rainbow and generally outperforms fixed epsilon schedules.',
    pros: [
      'Learns state-dependent exploration automatically',
      'Often outperforms epsilon-greedy exploration',
      'No need to manually tune an epsilon schedule',
    ],
    cons: [
      'Adds compute overhead per forward pass',
      'Can be harder to debug than epsilon-greedy',
      'May not help in environments with simple exploration needs',
    ],
    tip: 'Enable for most Rainbow runs. Disable only if training is unstable or slow.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'noisy_net_sigma',
    title: 'Noisy Net Sigma',
    description:
      'The scale of noise added to weights. Higher values mean more randomness in exploration.',
    details:
      'Sigma is the initial standard deviation of the noise distribution used in NoisyNet layers. Each weight in the noisy layers is sampled from a Gaussian distribution parameterised by a learnable mean and this noise scale. Higher sigma means the initial exploration is more aggressive and random. Over time, the network can learn to reduce sigma in states where it is confident, naturally annealing exploration. This parameter sets the starting point for that process. If sigma is too high, early training will be dominated by noise and the agent will struggle to learn meaningful behaviour.',
    pros: [
      'Higher sigma encourages broader exploration early in training',
      'Learnable noise adapts to the complexity of each state',
      'Small sigma still provides useful stochasticity',
    ],
    cons: [
      'Too high causes erratic, unstable behaviour',
      'Too low provides negligible exploration benefit',
      'Sensitive to learning rate and environment reward scale',
    ],
    tip: 'The default of 0.5 works well for most cases. Lower to 0.1–0.3 if training is unstable.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay',
    title: 'Enable Prioritized Replay?',
    description:
      'Whether to prioritize "important" experiences (those with high learning potential)',
    isBoolean: true,
    details:
      'Prioritized Experience Replay (PER) changes how transitions are sampled from the replay buffer. Instead of sampling uniformly at random, transitions with higher TD errors (the difference between predicted and target Q-values) are sampled more frequently. The intuition is that transitions with large errors are the ones the network is most wrong about and therefore the most informative to train on. This significantly improves sample efficiency but introduces bias because frequently sampled transitions are over-represented. Importance sampling weights are used to correct for this bias.',
    pros: [
      'Focuses training on the most informative transitions',
      'Improves sample efficiency, especially early in training',
      'A core component of the Rainbow algorithm',
    ],
    cons: [
      'Requires importance sampling correction to avoid bias',
      'Adds overhead for priority tracking and sampling',
      'Can overfit to high-error transitions if alpha is too high',
    ],
    tip: 'Enable for Rainbow. Use alpha=0.6 and beta=0.4 as starting values.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay_alpha',
    title: 'Prioritized Replay Alpha',
    description: 'How strongly prioritization is applied.',
    details:
      'Alpha controls the degree to which TD error is used to determine sampling probability. With alpha=0, sampling is uniform (standard replay). With alpha=1, sampling is fully proportional to TD error. Intermediate values blend both approaches. Higher alpha means high-error transitions dominate the training distribution. This can speed up learning but also increases the risk of overfitting to a small subset of transitions. Alpha must be used in combination with beta (importance sampling correction) to prevent biased updates.',
    pros: [
      'Higher alpha focuses more on high-TD-error transitions',
      'Improves convergence speed when set correctly',
      'Smoothly interpolates between uniform and full prioritization',
    ],
    cons: [
      'Too high increases bias from over-sampling rare transitions',
      'Requires beta correction to offset the bias',
      'Sensitive to the scale of TD errors in the environment',
    ],
    tip: 'Use 0.6 as the standard starting value, as used in the original Rainbow paper.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay_beta',
    title: 'Prioritized Replay Beta',
    description: 'How much to correct for bias introduced by prioritized sampling.',
    details:
      'Because PER samples transitions non-uniformly, the gradient updates are biased toward frequently sampled transitions. Beta is the exponent used in importance sampling weights to correct for this bias. A value of 1.0 fully corrects the bias, while lower values apply partial correction. In practice, beta is typically annealed from a low starting value (e.g. 0.4) to 1.0 over training, so that early in training (when value estimates are inaccurate) the correction is lighter, and later in training (when stability matters more) the correction is full.',
    pros: [
      'Corrects the bias introduced by non-uniform sampling',
      'Annealing beta to 1 ensures unbiased updates at convergence',
      'Stabilises training in combination with alpha',
    ],
    cons: [
      'Too low leaves significant bias in gradient updates',
      'Requires annealing schedule for best results',
      'Interacts with alpha — must be tuned together',
    ],
    tip: 'Start at 0.4 and anneal linearly to 1.0 over the course of training.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'prioritized_replay_eps',
    title: 'Prioritized Replay Epsilon',
    description: 'Small constant to avoid zero priority. Prevents experiences from being ignored.',
    details:
      'When a transition has a TD error of exactly zero, it would receive a priority of zero under pure proportional prioritization and would never be sampled again. This is undesirable because zero-error transitions may still contain useful information. A small epsilon is added to every priority to ensure no transition is assigned zero probability. This acts as a floor on the minimum sampling probability. The value should be very small so it does not meaningfully alter the prioritization of other transitions.',
    pros: [
      'Ensures every transition has a non-zero chance of being sampled',
      'Prevents the replay buffer from ignoring low-error transitions',
      'Simple and effective floor on priority values',
    ],
    cons: [
      'Too large reduces the effect of prioritization',
      'Too small can cause numerical instability',
      'Rarely needs tuning in practice',
    ],
    tip: 'Leave at the default of 1e-6. This rarely needs changing.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'atom_size',
    title: 'Atom Size',
    description: 'Number of discrete points in the distribution of possible returns.',
    details:
      'Rainbow uses distributional RL (C51), which models the full distribution of possible returns rather than just their expected value. The return distribution is represented as a discrete set of "atoms" — fixed support points spread evenly between v_min and v_max. More atoms give a finer-grained representation of the return distribution, potentially capturing multi-modal reward structures. However, more atoms increase the output size of the network and the cost of computing the distributional Bellman update. The gains from more atoms exhibit diminishing returns beyond around 51.',
    pros: [
      'More atoms give a finer-grained value distribution',
      'Improves performance on environments with multi-modal rewards',
      'A key component of the distributional RL approach in Rainbow',
    ],
    cons: [
      'More atoms increase memory and compute cost',
      'Diminishing returns beyond ~51 atoms',
      'Requires v_min and v_max to be set correctly',
    ],
    tip: 'Use 51 atoms (the Rainbow default). Only increase if rewards have high variance.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'v_min',
    title: 'V Min',
    description: 'Minimum value for the distributional support range.',
    details:
      'V Min is the lower bound of the support range for the return distribution in C51/Rainbow. All atoms are evenly spaced between v_min and v_max. Any actual return that falls below v_min will be clipped to the lowest atom, losing precision. To set this correctly, you need to estimate the minimum possible discounted return in your environment. For Atari, where rewards are typically clipped to [-1, 1] and gamma=0.99, the minimum discounted return is around -10, making v_min=-10 a common choice.',
    pros: [
      'Defines the lower bound of the reward distribution',
      'Allows the agent to represent very negative outcomes',
      'Symmetric with v_max for balanced support',
    ],
    cons: [
      'If set too high, negative returns fall outside the support',
      'Too low wastes atoms on unreachable values',
      'Must be set with knowledge of the environment reward range',
    ],
    tip: 'For Atari, use -10. Check the actual reward range of your specific game.',
  },
  {
    algorithms: ['Rainbow'],
    key: 'v_max',
    title: 'V Max',
    description: 'Maximum value for the distributional support range.',
    details:
      'V Max is the upper bound of the support range for the return distribution in C51/Rainbow. It defines the highest return the agent can represent. Any actual return above v_max is clipped to the highest atom. For Atari with reward clipping and gamma=0.99, the maximum discounted return is around 10, making v_max=10 a sensible default. If v_max is set too low, the agent cannot represent high-value states accurately, which limits its ability to plan for long sequences of positive rewards.',
    pros: [
      'Defines the upper bound of the reward distribution',
      'Allows the agent to represent very positive outcomes',
      'Works alongside v_min to cover the full reward range',
    ],
    cons: [
      'If set too low, high returns fall outside the support',
      'Too high wastes atoms on unreachable values',
      'Requires environment-specific knowledge to set well',
    ],
    tip: 'For Atari, use 10. Adjust based on the maximum discounted return in your game.',
  },
  {
    algorithms: ['PPO'],
    key: 'n_steps',
    title: 'Number of Steps',
    description: 'Number of steps to collect before each policy update.',
    details:
      'PPO is an on-policy algorithm that collects a fixed number of environment steps (a rollout) before performing a policy update. n_steps defines the length of this rollout. Longer rollouts give a better estimate of the advantage function because they capture more of the trajectory\'s return. They also reduce the frequency of updates, which can stabilise training. Shorter rollouts update the policy more frequently with noisier estimates. The total number of samples per update is n_steps multiplied by the number of parallel environments.',
    pros: [
      'More steps give a better estimate of the advantage function',
      'Reduces variance in policy gradient updates',
      'Allows the agent to observe longer-horizon trajectories',
    ],
    cons: [
      'More steps delay each policy update',
      'Large values require more memory',
      'Too many steps can make the old policy stale before updating',
    ],
    tip: 'Use 128–2048. A value of 128 works well for most Atari environments.',
  },
  {
    algorithms: ['PPO'],
    key: 'n_epochs',
    title: 'Number of Epochs',
    description: 'Number of times each batch of collected data is reused during training.',
    details:
      'After collecting a rollout of n_steps transitions, PPO performs multiple gradient update passes over the same data. n_epochs controls how many times the entire rollout is iterated over. This improves sample efficiency by extracting more learning from each rollout. The clipping mechanism in PPO prevents the policy from changing too drastically during these multiple updates. However, too many epochs can still cause the policy to drift outside the clipped range, leading to instability. The right number of epochs depends on the clip range and the stability of the environment.',
    pros: [
      'More epochs extract more learning signal from each rollout',
      'Improves sample efficiency without collecting new data',
      'Controlled by clip_range to prevent policy divergence',
    ],
    cons: [
      'Too many epochs overfit to the current batch of data',
      'Can cause the policy to drift beyond the clipping threshold',
      'Increases compute cost per update',
    ],
    tip: 'Use 4–10 epochs. Start with 4 and increase if training is stable.',
  },
  {
    algorithms: ['PPO'],
    key: 'gae_lambda',
    title: 'GAE Lambda',
    description:
      'Controls the bias-variance tradeoff in advantage estimation. Lower values mean less variance but more bias.',
    details:
      'Generalised Advantage Estimation (GAE) is used in PPO to compute advantage values that balance bias and variance. Lambda interpolates between a 1-step TD advantage (low variance, high bias) at lambda=0 and a full Monte Carlo return (high variance, low bias) at lambda=1. The advantage at each step is a weighted sum of future TD errors, with the weights decaying exponentially by lambda. A value of 0.95 is widely used and provides a good balance. Environments with dense, informative rewards can tolerate higher lambda values.',
    pros: [
      'Values near 1 give low-bias, high-variance advantage estimates',
      'Values near 0 give stable but potentially biased estimates',
      'Smoothly interpolates between TD and Monte Carlo estimates',
    ],
    cons: [
      'High values increase variance and can destabilise training',
      'Low values introduce bias that can slow learning',
      'Sensitive to the reward density of the environment',
    ],
    tip: 'Use 0.95 as a default. Lower to 0.9 if training is noisy.',
  },
  {
    algorithms: ['PPO'],
    key: 'clip_range',
    title: 'Clip Range',
    description: 'Limits how much the policy can change per update step.',
    details:
      'PPO\'s core innovation is the clipped surrogate objective. When updating the policy, the ratio of the new policy probability to the old policy probability is clipped to the range [1-clip_range, 1+clip_range]. This prevents any single update from making a large change to the policy, which was the main failure mode of the earlier TRPO algorithm. The clipping creates a pessimistic bound on the policy improvement, ensuring stable monotonic improvement. A smaller clip range is more conservative; a larger clip range allows bigger updates but risks instability.',
    pros: [
      'Prevents destructively large policy updates',
      'Core stability mechanism of the PPO algorithm',
      'Makes training robust to a wide range of hyperparameters',
    ],
    cons: [
      'Too small slows down learning',
      'Too large undermines the stability guarantee of PPO',
      'May need annealing for very long training runs',
    ],
    tip: 'Use 0.1–0.2. Start with 0.2 and reduce if policy updates are too aggressive.',
  },
  {
    algorithms: ['PPO'],
    key: 'ent_coef',
    title: 'Entropy Coefficient',
    description:
      'Encourages exploration by rewarding the agent for maintaining a diverse action distribution.',
    details:
      'The entropy bonus adds a term to the PPO objective that rewards the policy for being uncertain — i.e., for spreading probability mass across multiple actions rather than concentrating it on one. This discourages the policy from converging prematurely to a deterministic strategy before it has explored sufficiently. The entropy coefficient scales how much weight this bonus receives relative to the main policy gradient objective. In sparse-reward environments, a higher entropy coefficient is particularly important because the agent needs to explore more to find any reward at all.',
    pros: [
      'Prevents premature convergence to deterministic policies',
      'Encourages broader exploration of the action space',
      'Particularly useful in sparse-reward environments',
    ],
    cons: [
      'Too high prevents the policy from committing to good actions',
      'Too low leads to premature exploitation',
      'Must be balanced with the scale of the environment reward',
    ],
    tip: 'Use 0.01 as a starting point. Increase to 0.05 in sparse-reward environments.',
  },
  {
    algorithms: ['PPO'],
    key: 'vf_coef',
    title: 'Value Function Coefficient',
    description:
      'Weight for the value function loss relative to the policy loss in the total objective.',
    details:
      'PPO optimises a combined objective that includes the clipped policy gradient loss, the value function loss, and the entropy bonus. The value function coefficient scales how much the value function loss contributes to the total gradient. A higher coefficient pushes the network to prioritise accurate value estimation, which in turn improves the quality of advantage estimates used by the policy gradient. However, if the coefficient is too high, the value loss can dominate the gradients and suppress policy learning. The shared network architecture of most PPO implementations makes this balance important.',
    pros: [
      'Balances how much the agent focuses on value vs. policy learning',
      'Higher values improve value estimates for better advantage computation',
      'Helps stabilise training when rewards are noisy',
    ],
    cons: [
      'Too high can dominate the policy gradient signal',
      'Too low leads to poor value estimates and unstable advantages',
      'Interacts with the learning rate and entropy coefficient',
    ],
    tip: 'Use 0.5 as the standard default. Rarely needs changing.',
  },
  {
    algorithms: ['PPO'],
    key: 'max_grad_norm',
    title: 'Max Gradient Norm',
    description:
      'Clips gradients to prevent excessively large updates that could destabilise training.',
    details:
      'Gradient clipping rescales the gradient vector so that its L2 norm does not exceed max_grad_norm before applying the optimizer update. This is a safeguard against gradient explosions, which can occur when a particularly high-loss batch causes extremely large weight updates. In RL, non-stationarity and reward spikes make gradient explosions more likely than in supervised learning. Clipping does not change the direction of the gradient, only its magnitude, so it preserves the direction of learning while bounding the step size.',
    pros: [
      'Prevents exploding gradients during training',
      'Improves stability across a range of environments',
      'Simple and effective safeguard with minimal downside',
    ],
    cons: [
      'Too low can prevent the model from learning quickly',
      'Too high provides no protection against large updates',
      'Does not address the root cause of gradient spikes',
    ],
    tip: 'Use 0.5. This is the standard PPO default and rarely needs adjustment.',
  },
];