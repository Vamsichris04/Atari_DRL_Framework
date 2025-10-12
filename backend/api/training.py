import asyncio
import base64
import io
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import gymnasium as gym
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
    env = gym.make("ALE/Breakout-v5", render_mode="rgb_array")
    obs, _ = env.reset()

    try:
        while True:
            action = env.action_space.sample()  # replace with agent action later
            obs, reward, terminated, truncated, _ = env.step(action)
            frame = env.render()

            image = Image.fromarray(frame)
            buf = io.BytesIO()
            image.save(buf, format="PNG")
            frame_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

            await ws.send_json({
                "frame": frame_b64,
                "reward": float(reward),
            })

            if terminated or truncated:
                obs, _ = env.reset()
                training_status["episode"] += 1

            training_status["reward"] = reward
            await asyncio.sleep(0.05)
    except WebSocketDisconnect:
        env.close()
        print("WebSocket disconnected")
