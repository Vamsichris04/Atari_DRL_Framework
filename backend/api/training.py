import asyncio
import base64
import io

import ale_py  # noqa: F401 — registers ALE envs with Gymnasium
import gymnasium as gym
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from PIL import Image

router = APIRouter()

training_status = {"running": False, "episode": 0, "reward": 0.0}

class TrainRequest(BaseModel):
    env_id: str = "ALE/Breakout-v5"
    episodes: int = 1

@router.post("/start")
async def start_training(req: TrainRequest):
    """Start a training run (placeholder, to be replaced with actual implementation)."""
    training_status["running"] = True
    training_status["episode"] = 0
    training_status["reward"] = 0.0
    return {"message": f"Training started for {req.env_id}", "episodes": req.episodes}

@router.get("/status")
async def get_status():
    """Return the current training status."""
    return training_status

@router.websocket("/stream")
async def stream_game(ws: WebSocket):
    """Send live frames and rewards from a Gymnasium environment."""
    await ws.accept()
    env_id = ws.query_params.get("env_id", "ALE/Breakout-v5")
    env = gym.make(env_id, render_mode="rgb_array")
    obs, _ = env.reset()
    episode_return = 0.0

    try:
        while True:
            action = env.action_space.sample()  # replace with agent action later
            obs, reward, terminated, truncated, _ = env.step(action)
            r = float(reward)
            episode_return += r
            frame = env.render()

            image = Image.fromarray(frame)
            buf = io.BytesIO()
            image.save(buf, format="PNG")
            frame_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

            await ws.send_json({
                "frame": frame_b64,
                "step_reward": r,
                "episode_return": episode_return,
                "terminated": terminated,
                "truncated": truncated,
            })

            if terminated or truncated:
                obs, _ = env.reset()
                episode_return = 0.0
                training_status["episode"] += 1

            training_status["reward"] = r
            await asyncio.sleep(0.05)
    except WebSocketDisconnect:
        env.close()
        print("WebSocket disconnected")
