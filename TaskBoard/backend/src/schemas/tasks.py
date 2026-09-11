from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    user_id: int
    task_name: str
    is_completed: bool


class TaskOut(BaseModel):
    id: int
    task_name: str
    is_completed: bool


    model_config = ConfigDict(from_attributes=True)

class TaskToggle(BaseModel):
    is_completed: bool | None