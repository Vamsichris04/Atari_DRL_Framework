from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import gymnasium as gym
import uuid
import io
import base64
from PIL import Image

# This is a temporary backend to test connecting to the frontend

# Run the following commands to set up:
# python -m venv venv
# venv\Scripts\activate
# pip install fastapi uvicorn gymnasium pillow
# pip install "gymnasium[classic-control]"

# Run the following command to run:
# uvicorn gym_server:app --reload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

envs = {}

class CreateEnvRequest(BaseModel):
    env_id: str

class StepRequest(BaseModel):
    action: int

@app.post("/v1/envs/")
def create_env(req: CreateEnvRequest):
    env = gym.make(req.env_id, render_mode="rgb_array")
    env_id = str(uuid.uuid4())
    envs[env_id] = env
    obs, info = env.reset()
    print(f"Created env with ID: {env_id}")
    return {"instance_id": env_id, "observation": obs.tolist()}

@app.post("/v1/envs/{env_id}/reset/")
def reset_env(env_id: str):
    env = envs.get(env_id)
    if not env:
        print(f"Env ID not found: {env_id}")
        return {"error": "Environment not found"}
    obs, info = env.reset()
    return {"observation": obs.tolist()}

@app.post("/v1/envs/{env_id}/step/")
def step_env(env_id: str, req: StepRequest):
    env = envs.get(env_id)
    if not env:
        print(f"Env ID not found: {env_id}")
        return {"error": "Environment not found"}
    obs, reward, terminated, truncated, info = env.step(req.action)
    return {
        "observation": obs.tolist(),
        "reward": reward,
        "terminated": terminated,
        "truncated": truncated,
        "info": info
    }

@app.get("/v1/envs/{env_id}/render/")
def render_env(env_id: str):
    env = envs.get(env_id)
    if not env:
        print(f"Env ID not found: {env_id}")
        return {"error": "Environment not found"}
    frame = env.render()
    img = Image.fromarray(frame)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    img_bytes = buf.getvalue()
    img_base64 = base64.b64encode(img_bytes).decode("utf-8")
    return {"image": img_base64}
