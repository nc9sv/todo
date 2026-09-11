from fastapi import HTTPException
from pydantic import BaseModel, ConfigDict, model_validator


class UserLogin(BaseModel):
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    password: str
    confirm_password: str

    @model_validator(mode="after")
    def check_password_match(self):
        if self.password != self.confirm_password:
            raise HTTPException(status_code=400, detail="Пароли не совпадают")
        return self


class UserOut(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)
