import base64
import io
import uuid
from typing import Any

import ale_py  # noqa: F401 — registers ALE envs with Gymnasium
import gymnasium as gym
from fastapi import APIRouter, Query
from PIL import Image
from pydantic import BaseModel

router = APIRouter(prefix="/v1", tags=["envs"])

_env_instances: dict[str, Any] = {}


def _frame_png_base64(env: Any) -> str:
    frame = env.render()
    img = Image.fromarray(frame)
    buf = io.BytesIO()
    # Faster encoding than default; still lossless (good enough for play responsiveness).
    img.save(buf, format="PNG", compress_level=3)
    return base64.b64encode(buf.getvalue()).decode("utf-8")


class CreateEnvRequest(BaseModel):
    env_id: str


class StepRequest(BaseModel):
    action: int
    """If true, include a base64 PNG frame in the response (avoids a second HTTP round-trip)."""
    render: bool = False


@router.post("/envs/")
def create_env(req: CreateEnvRequest):
    env = gym.make(req.env_id, render_mode="rgb_array")
    instance_id = str(uuid.uuid4())
    _env_instances[instance_id] = env
    obs, _info = env.reset()
    print(f"Created env with ID: {instance_id}")
    return {"instance_id": instance_id, "observation": obs.tolist()}


@router.post("/envs/{instance_id}/reset/")
def reset_env(instance_id: str, render: bool = Query(False)):
    env = _env_instances.get(instance_id)
    if not env:
        print(f"Env ID not found: {instance_id}")
        return {"error": "Environment not found"}
    obs, _info = env.reset()
    out: dict[str, Any] = {"observation": obs.tolist()}
    if render:
        out["image"] = _frame_png_base64(env)
    return out


@router.post("/envs/{instance_id}/step/")
def step_env(instance_id: str, req: StepRequest):
    env = _env_instances.get(instance_id)
    if not env:
        print(f"Env ID not found: {instance_id}")
        return {"error": "Environment not found"}
    obs, reward, terminated, truncated, info = env.step(req.action)
    out: dict[str, Any] = {
        "observation": obs.tolist(),
        "reward": reward,
        "terminated": terminated,
        "truncated": truncated,
        "info": info,
    }
    if req.render:
        out["image"] = _frame_png_base64(env)
    return out


@router.get("/envs/{instance_id}/render/")
def render_env(instance_id: str):
    env = _env_instances.get(instance_id)
    if not env:
        print(f"Env ID not found: {instance_id}")
        return {"error": "Environment not found"}
    return {"image": _frame_png_base64(env)}
