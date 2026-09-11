FROM python:3.13

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl jq \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod +x start.sh

ENV PYTHONPATH=/app/src

ENTRYPOINT ["./start.sh"]
