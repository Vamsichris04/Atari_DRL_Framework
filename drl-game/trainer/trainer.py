import os
import argparse
import yaml
import gymnasium as gym

from stable_baselines3 import DQN
from stable_baselines3.common.env_util import make_atari_env
from stable_baselines3.common.vec_env import VecFrameStack
from stable_baselines3.common.callbacks import EvalCallback, CheckpointCallback
from stable_baselines3.common.monitor import Monitor
try:
    # When installed or run as module
    from trainer.callbacks.json_logger import JSONLoggerCallback
    from trainer.envs import build_env
except Exception:
    # When running trainer.py directly as a script
    from callbacks.json_logger import JSONLoggerCallback
    from envs import build_env

def main(cfg_path: str):
    with open(cfg_path, "r") as f:
        cfg = yaml.safe_load(f)

    run_name = cfg.get("run_name", "run")
    log_dir  = cfg.get("log_dir", f"drl-game/data/runs/{run_name}")
    save_dir = cfg.get("save_dir", f"drl-game/data/models/{run_name}")
    os.makedirs(log_dir, exist_ok=True)
    os.makedirs(save_dir, exist_ok=True)

    env_id = cfg["env_id"]
    seed   = int(cfg.get("seed", 0))
    total_timesteps = int(cfg.get("total_timesteps", 100_000))
    hp = cfg.get("dqn", {})

    def _coerce_numeric(val):
        if isinstance(val, str):
            val_str = val.strip()
            if val_str.isdigit():
                return int(val_str)
            try:
                return float(val_str)
            except ValueError:
                return val
        return val

    hp = {k: _coerce_numeric(v) for k, v in hp.items()}

    # =================================== Training ======================================= #
    env = build_env(env_id, seed)
    eval_env = build_env(env_id, seed + 123)

    # --- Callbacks: eval + periodic checkpoints ---
    callbacks = []
    if cfg.get("eval", {}).get("enabled", True):
        eval_cb = EvalCallback(
            eval_env,
            best_model_save_path=save_dir,
            log_path=log_dir,
            eval_freq=cfg["eval"].get("freq", 10_000),
            n_eval_episodes=cfg["eval"].get("n_episodes", 5),
            deterministic=cfg["eval"].get("deterministic", True),
        )
        callbacks.append(eval_cb)

    ckpt_cb = CheckpointCallback(
        save_freq=50_000,
        save_path=save_dir,
        name_prefix="ckpt",
        save_replay_buffer=True
    )
    callbacks.append(ckpt_cb)

    # JSON logging for frontend consumption: writes newline-delimited JSON records
    json_freq = int(cfg.get("log_json_freq", 1000))
    try:
        env_short = env_id.split('/')[-1].split('-')[0].lower()
    except Exception:
        env_short = env_id.replace('/', '_').lower()
    algo_short = 'dqn'
    json_fname = f"{env_short}_{algo_short}_progress.jsonl"
    # Saving progress files under drl-game/data/ 
    json_path = os.path.join('drl-game', 'data', json_fname)
    json_cb = JSONLoggerCallback(json_path, write_freq=json_freq)
    callbacks.append(json_cb)

    # ================================= Model ========================================== #
    model = DQN(
        "CnnPolicy",
        env,
        verbose=1,
        tensorboard_log=log_dir,
        seed=seed,
        **hp
    )

    # ================================ Train =============================================== #
    model.learn(total_timesteps=total_timesteps, callback=callbacks)

    # Save the final model
    final_path = os.path.join(save_dir, "final.zip")
    model.save(final_path)

    # Clean up
    env.close()
    eval_env.close()
    print(f"\n Finished training.\n- Best/ckpt models: {save_dir}\n- TensorBoard logs: {log_dir}\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("config", nargs="?", default="drl-game/configs/breakout_dqn.yaml",
                        help="Path to YAML config")
    args = parser.parse_args()
    main(args.config)
