from fastapi import APIRouter
from .training import router as training_router

router = APIRouter()
router.include_router(training_router, prefix="/training", tags=["training"])
