from fastapi import APIRouter

from crud import tasks as tasks_crud
from schemas.tasks import TaskCreate, TaskOut, TaskToggle

task_router = APIRouter(
    prefix="/tasks",
)

@task_router.get("/{id}")
async def get_user_tasks(id: int):
    return await tasks_crud.get_user_tasks(id)

@task_router.post("/create_task", response_model=TaskOut)
async def create_task(task: TaskCreate):
    return await tasks_crud.create_task(task)

@task_router.delete("/delete_task/{id}")
async def delete_task(id: int):
    return await tasks_crud.delete_task(id)

@task_router.patch("/toggle_task/{id}")
async def update_task(id: int):
    return await tasks_crud.update_task(id)
