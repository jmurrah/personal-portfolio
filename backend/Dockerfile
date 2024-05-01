FROM python:3.9-slim

WORKDIR /app
RUN pip install poetry
COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-interaction --no-ansi

COPY . .

EXPOSE 5000

ENV FLASK_APP=./backend/api.py
ENV FLASK_ENV=development
ENV TZ=America/Chicago

CMD [ "poetry", "run", "flask", "run", "--host=0.0.0.0" ]