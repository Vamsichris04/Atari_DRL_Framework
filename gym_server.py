"""
Backward-compatible entrypoint for the unified API (Gym envs + training).

Prefer running from the backend package:

    cd backend
    uvicorn main:app --reload --host 0.0.0.0 --port 8000

This module still works if you run from the repository root:

    uvicorn gym_server:app --reload --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

import sys
from pathlib import Path

_backend = Path(__file__).resolve().parent / "backend"
_backend_str = str(_backend)
if _backend_str not in sys.path:
    sys.path.insert(0, _backend_str)

from main import app  # noqa: E402

__all__ = ["app"]
