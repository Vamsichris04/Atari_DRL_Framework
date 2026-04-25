import asyncio
import base64
import io
import time
import sys
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from PIL import Image

import subprocess
import yaml
import os
from pathlib import Path
from multiprocessing import Process, Queue

router = APIRouter()

training_status = {"running": False, "episode": 0, "reward": 0.0, "results": {}}
trainer_process = None
frame_queue = None

class TrainRequest(BaseModel):
    env_id: str = "ALE/Breakout-v5"
    episodes: int = 1

def run_trainer_wrapper(config_path, queue):
    base_dir = Path(__file__).resolve().parents[2]
    trainer_dir = base_dir / "drl-game" / "trainer"
    if str(trainer_dir) not in sys.path:
        sys.path.append(str(trainer_dir))
    from trainer import trainer_main
    trainer_main(config_path, queue)

@router.post("/start")
async def start_training(req: dict):
    """Start a training run."""
    global trainer_process, frame_queue

    run_name = req.get("run_name", f"run_{int(time.time())}")
    base_dir = Path(__file__).resolve().parents[2]
    config_dir = base_dir / "drl-game" / "configs"
    config_dir.mkdir(parents=True, exist_ok=True)
    config_path = config_dir / f"{run_name.split('/')[-1]}.yaml"

    with open(config_path, "w") as f:
        yaml.dump(req, f)

    frame_queue = Queue()

    trainer_process = subprocess.Popen(
        [
            sys.executable,
            str(base_dir / "drl-game" / "trainer" / "run_trainer.py"),
            str(config_path)
        ],
        env=os.environ.copy()
    )

    training_status["running"] = True
    training_status["episode"] = 0
    training_status["reward"] = 0.0
    training_status["results"] = {}

    return {"message": f"Training started: {run_name}", "config_path": str(config_path)}


@router.get("/status")
async def get_status():
    """Return the current training status."""
    return training_status

@router.get("/results")
async def get_results():
    return training_status["results"]

@router.websocket("/stream")
async def stream_game(ws: WebSocket):
    """Send live frames and rewards from a Gymnasium environment."""
    global frame_queue
    await ws.accept()

    if frame_queue is None:
        await ws.send_json({"error": "No training is running"})
        await ws.close()
        return

    try:
        while True:
            msg = frame_queue.get()

            if "results" in msg:
                training_status["results"] = msg["results"]
                training_status["running"] = False
                await ws.send_json({"results": msg["results"]})
                continue

            frame = msg["frame"]
            reward = msg["reward"]
            episode = msg["episode"]
            done = msg["done"]

            image = Image.fromarray(frame)
            buf = io.BytesIO()
            image.save(buf, format="PNG")
            frame_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

            training_status["reward"] = reward
            training_status["episode"] = episode

            await ws.send_json({
                "frame": frame_b64,
                "step_reward": reward,
                "episode": episode,
                "done": done
            })

    except WebSocketDisconnect:
        pass
