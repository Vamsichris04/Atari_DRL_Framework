 # drl-game/trainer/evaluate.py
import os, argparse, yaml, numpy as np
from stable_baselines3 import DQN
from trainer.envs import build_env

def evaluate_model(model_path, env_id, n_episodes=10, render=False):
    env = build_env(env_id, seed=42)
    model = DQN.load(model_path)
    rewards = []
    for ep in range(n_episodes):
        obs, info = env.reset()
        done = trunc = False
        total = 0
        while not (done or trunc):
            action, _ = model.predict(obs, deterministic=True)
            obs, reward, done, trunc, info = env.step(action)
            total += reward
            if render:
                env.render()
        rewards.append(total)
        print(f"Episode {ep+1}: {total:.2f}")
    env.close()
    print(f"\nMean reward: {np.mean(rewards):.2f} ± {np.std(rewards):.2f}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("config", help="Path to YAML config")
    parser.add_argument("--model", default="final.zip", help="Model file name")
    parser.add_argument("--episodes", type=int, default=10)
    parser.add_argument("--render", action="store_true")
    args = parser.parse_args()

    with open(args.config, "r") as f:
        cfg = yaml.safe_load(f)
    model_path = os.path.join(cfg.get("save_dir", "drl-game/data/models"), cfg["run_name"], args.model)
    evaluate_model(model_path, cfg["env_id"], args.episodes, args.render)
