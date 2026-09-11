from fastapi import HTTPException

from passlib.handlers.bcrypt import bcrypt
from sqlalchemy import select

from db.database import async_session_factory
from db.models import UsersOrm
from schemas.users import UserCreate, UserOut, UserLogin


async def login(user: UserLogin):
    async with async_session_factory() as session:
        stmt = select(UsersOrm).where(UsersOrm.username == user.username)
        result = await session.execute(stmt)
        db_user = result.scalar_one_or_none()

        if db_user is None or not bcrypt.verify(user.password, db_user.password):
            raise HTTPException(status_code=400, detail="Неверное имя пользователя или пароль")

        return {"message": "Успешная авторизация", "user_id": db_user.id}


async def create_user(user: UserCreate):
    async with async_session_factory() as session:
        try:
            hashed_password = bcrypt.hash(user.password)
            new_user = UsersOrm(username=user.username, password=hashed_password)
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)

            return {"message": "Успешная регистрация", "user_id": new_user.id}
        except Exception as e:
            await session.rollback()
            raise HTTPException(status_code=400, detail="Пользователь с таким именем уже существует")


async def get_users():
    async with async_session_factory() as session:
        query = select(UsersOrm)
        result = await session.execute(query)
        users = result.scalars().all()
        return [UserOut.model_validate(user) for user in users]


async def get_user_by_id(id: int):
    async with async_session_factory() as session:
        query = select(UsersOrm).where(UsersOrm.id == id)
        result = await session.execute(query)
        return result.scalars().one()
