# drl-game/trainer/envs.py
import gymnasium as gym
from stable_baselines3.common.env_util import make_atari_env
from stable_baselines3.common.vec_env import VecFrameStack
from stable_baselines3.common.monitor import Monitor
import warnings

def build_env(env_id: str, seed: int, n_envs: int = 1, frame_stack: int = 4):
    """
    Factory function to create and configure environments.
    Automatically adds Atari preprocessing and frame stacking.
    """

    # Detect if Atari
    if "ALE/" in env_id or "NoFrameskip" in env_id:
        venv = make_atari_env(env_id, n_envs=n_envs, seed=seed)
        venv = VecFrameStack(venv, n_stack=frame_stack)
        return venv

    # Default Gymnasium envs
    try:
        env = gym.make(env_id)
        env.reset(seed=seed)
        env = Monitor(env)
        return env
    except Exception as e:
        warnings.warn(f"Could not build environment '{env_id}': {e}")
        raise
