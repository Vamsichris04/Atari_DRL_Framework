# drl-game/trainer/callbacks/json_logger.py
import os, json
from stable_baselines3.common.callbacks import BaseCallback

class JSONLoggerCallback(BaseCallback):
    """Write periodic JSON lines for episode stats and exploration rate."""

    def __init__(self, out_path: str, write_freq: int = 1000, verbose: int = 0):
        super().__init__(verbose)
        self.out_path = out_path
        self.write_freq = int(write_freq)
        self._f = None

    def _on_training_start(self) -> None:
        os.makedirs(os.path.dirname(self.out_path), exist_ok=True)
        self._f = open(self.out_path, 'a', encoding='utf-8')

    def _on_step(self) -> bool:
        ts = int(self.num_timesteps)
        if ts % self.write_freq != 0:
            return True

        rec = {'timesteps': ts}
        infos = self.locals.get('infos', [])
        rews = [float(i['episode']['r']) for i in infos if 'episode' in i]
        lens = [int(i['episode']['l']) for i in infos if 'episode' in i]

        if rews:
            rec.update({
                'episode_reward_mean': sum(rews)/len(rews),
                'episode_reward_max': max(rews),
                'episode_reward_min': min(rews)
            })
        if lens:
            rec['episode_length_mean'] = sum(lens)/len(lens)

        eps = getattr(self.model, 'exploration_rate', None)
        if eps is not None:
            rec['exploration_rate'] = float(eps)

        self._f.write(json.dumps(rec) + '\n')
        self._f.flush()
        return True

    def _on_training_end(self) -> None:
        if self._f:
            self._f.close()
