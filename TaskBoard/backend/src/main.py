import asyncio
import os
import sys

import uvicorn
from fastapi.middleware.cors import CORSMiddleware

sys.path.insert(1, os.path.join(sys.path[0], '..'))

from fastapi import FastAPI

from api import main_router
from db.queries.orm import Orm


async def main():
    await Orm.create_tables()


def create_fastapi_app():
    fastapi_app = FastAPI()

    origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
    fastapi_app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    fastapi_app.include_router(main_router)
    return fastapi_app


app = create_fastapi_app()


@app.on_event("startup")
async def on_startup():
    await Orm.create_tables()


if __name__ == '__main__':
    uvicorn.run(
        app="src.main:app",
        reload=True,
    )
