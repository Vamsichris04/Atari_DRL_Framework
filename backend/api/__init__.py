from fastapi import APIRouter

from .envs import router as envs_router
from .training import router as training_router

router = APIRouter()
router.include_router(envs_router)
router.include_router(training_router, prefix="/training", tags=["training"])
