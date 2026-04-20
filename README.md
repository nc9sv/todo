# TaskBoard

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-0.116-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Ant_Design-5-1677FF?style=for-the-badge&logo=antdesign&logoColor=white" alt="Ant Design">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose">
</p>

TaskBoard — веб-приложение для управления задачами. Пользователь может зарегистрироваться, войти в систему, создавать задачи, удалять их и отмечать как выполненные.

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Backend](#backend)
- [Frontend](#frontend)
- [Project structure](#project-structure)
- [Authors](#authors)

## About

Проект сделан как простой task manager с разделением на frontend и backend.

В приложении есть базовый сценарий работы с задачами:
- регистрация пользователя;
- вход в систему;
- просмотр списка задач;
- создание новой задачи;
- удаление задачи;
- переключение статуса выполнения.

Backend поднимается на FastAPI, frontend сделан на React, а данные хранятся в PostgreSQL.

## Installation

### Run with Docker

Клонируйте репозиторий:

```bash
git clone https://github.com/Jlychee/TaskBoard.git
cd TaskBoard
```

Запустите проект через Docker Compose:

```bash
docker compose up --build
```

После запуска сервисы будут доступны по адресам:
- frontend — `http://localhost:5173`
- backend — `http://localhost:8000`
- PostgreSQL — `localhost:5433`

### Local run

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn src.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Tech Stack

- Python 3.12
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Passlib / bcrypt
- React
- Vite
- Tailwind CSS
- Ant Design
- React Router
- Axios
- Docker Compose

## Backend

Backend находится в папке `backend/`.

Что есть в серверной части:
- роуты для пользователей и задач;
- регистрация и логин;
- создание таблиц при старте приложения;
- CRUD-операции для задач;
- хеширование паролей;
- миграции через Alembic;
- CORS для локального frontend.

Основные endpoint'ы:
- `POST /users/create_user`
- `POST /users/login`
- `GET /users`
- `GET /users/{id}`
- `GET /tasks/{id}`
- `POST /tasks/create_task`
- `DELETE /tasks/delete_task/{id}`
- `PATCH /tasks/toggle_task/{id}`

## Frontend

Frontend находится в папке `frontend/`.

Клиентская часть включает:
- форму регистрации;
- форму входа;
- контейнер со списком задач;
- маршрутизацию между экранами;
- контекст авторизации;
- UI на Ant Design и Tailwind CSS.

Основные компоненты:
- `Card.jsx`
- `LoginForm.jsx`
- `RegisterForm.jsx`
- `ToDoContainer.jsx`

## Project structure

```text
TaskBoard/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   ├── crud/
│   │   ├── db/
│   │   ├── migrations/
│   │   ├── schemas/
│   │   └── main.py
│   ├── Dockerfile
│   ├── alembic.ini
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── AuthContext.jsx
│   │   └── main.jsx
│   └── package.json
└── docker-compose.yml
```

## Authors

- [Jlychee](https://github.com/Jlychee)

