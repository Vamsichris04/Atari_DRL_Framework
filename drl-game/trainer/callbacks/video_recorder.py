# drl-game/trainer/callbacks/video_recorder.py
import os, imageio
from stable_baselines3.common.callbacks import BaseCallback

class VideoRecorderCallback(BaseCallback):
    """Record gameplay videos every N timesteps."""
    def __init__(self, env, save_dir, record_freq=50000, n_episodes=1, fps=30, verbose=0):
        super().__init__(verbose)
        self.env = env
        self.save_dir = save_dir
        self.record_freq = record_freq
        self.n_episodes = n_episodes
        self.fps = fps
        os.makedirs(save_dir, exist_ok=True)

    def _on_step(self):
        if self.num_timesteps % self.record_freq != 0:
            return True
        for ep in range(self.n_episodes):
            obs, info = self.env.reset()
            frames = []
            done = trunc = False
            while not (done or trunc):
                action, _ = self.model.predict(obs, deterministic=True)
                obs, reward, done, trunc, info = self.env.step(action)
                frame = self.env.render()
                if frame is not None:
                    frames.append(frame)
            path = os.path.join(self.save_dir, f"vid_{self.num_timesteps}_ep{ep+1}.mp4")
            imageio.mimsave(path, frames, fps=self.fps)
            if self.verbose:
                print(f"[VideoRecorder] Saved {path}")
        return True
