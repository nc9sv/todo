FROM python:3.13-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       curl=8.14.1-2+deb13u4 \
       jq=1.7.1-6+deb13u3 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir pip==26.2.1 \
    && pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x start.sh

ENV PYTHONPATH=/app/src

ENTRYPOINT ["./start.sh"]
