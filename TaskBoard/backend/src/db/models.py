from typing import Annotated

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from db.database import Base

intpk = Annotated[int, mapped_column(primary_key=True)]


class UsersOrm(Base):
    __tablename__ = 'users'
    id: Mapped[intpk]
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]


class TasksOrm(Base):
    __tablename__ = 'tasks'
    id: Mapped[intpk]
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), index=True)
    task_name: Mapped[str]
    task_description: Mapped[str | None]
    is_completed: Mapped[bool | None] = mapped_column(default=False)
