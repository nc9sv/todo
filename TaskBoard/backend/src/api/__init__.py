from fastapi import APIRouter

from src.api.tasks import task_router
from src.api.users import user_router

main_router = APIRouter()
main_router.include_router(user_router)
main_router.include_router(task_router)
