from fastapi import APIRouter

from crud import users as users_crud
from schemas.users import UserCreate, UserOut, UserLogin

user_router = APIRouter(
    prefix="/users",
)


@user_router.post("/create_user")
async def create_user(
        user: UserCreate,
):
    return await users_crud.create_user(user)


@user_router.post("/login")
async def login(user: UserLogin):
    return await users_crud.login(user)


@user_router.get("", response_model=list[UserOut])
async def get_users():
    return await users_crud.get_users()


@user_router.get("/{id}", response_model=UserOut)
async def get_user_by_id(id: int):
    return await users_crud.get_user_by_id(id)
