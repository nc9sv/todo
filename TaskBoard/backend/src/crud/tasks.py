from db.database import async_session_factory
from db.models import TasksOrm
from schemas.tasks import TaskCreate, TaskToggle
from sqlalchemy import select, delete, update
from fastapi import HTTPException


async def get_user_tasks(id: int):
    async with async_session_factory() as session:
        stmt = select(TasksOrm.id, TasksOrm.task_name, TasksOrm.is_completed).where(TasksOrm.user_id == id)
        result = await session.execute(stmt)
        tasks = result.all()
        return [(t[0], t[1], t[2]) for t in tasks]


async def create_task(task: TaskCreate):
    async with async_session_factory() as session:
        new_task = TasksOrm(**task.dict())
        session.add(new_task)
        await session.commit()
        await session.refresh(new_task)
        return new_task


async def delete_task(id: int):
    async with async_session_factory() as session:
        try:
            task = await session.get(TasksOrm, id)
            if not task:
                raise HTTPException(status_code=404, detail="Задача не найдена")

            await session.delete(task)
            await session.commit()
            return {"message": "Задача удалена"}
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Ошибка при удалении задачи {e}")


async def update_task(id: int):
    async with async_session_factory() as session:
        try:
            stmt = update(TasksOrm).where(TasksOrm.id == id).values(
                is_completed=~TasksOrm.is_completed).execution_options(synchronize_session='fetch')
            await session.execute(stmt)
            await session.commit()
            return {"message": "Состояние задачи обновлено"}
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Ошибка при обновлении состояния задачи {e}")
