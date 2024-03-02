FROM python:3.9-slim

WORKDIR /app

RUN pip install poetry
RUN poetry config virtualenvs.create false

COPY . /app

RUN poetry install


EXPOSE 5000
ENV FLASK_APP=./backend/api.py

CMD [ "poetry", "run", "flask", "run", "--host=0.0.0.0" ]