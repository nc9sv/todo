FROM python:3.13

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip && pip install -r requirements.txt

COPY . .

ENV PYTHONPATH=/app/src
