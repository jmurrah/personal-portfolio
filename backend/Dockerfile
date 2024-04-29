# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the Docker image
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy pyproject.toml and poetry.lock into the Docker image
COPY pyproject.toml poetry.lock ./

# Install the application dependencies with Poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-interaction --no-ansi

# Copy the rest of the application code into the Docker image
COPY . .

# Expose port 5000 for the application
EXPOSE 5000

# Set the FLASK_APP environment variable
ENV FLASK_APP=./backend/api.py
ENV FLASK_ENV=development
ENV TZ=America/Chicago

# Command to run the application
CMD [ "poetry", "run", "flask", "run", "--host=0.0.0.0" ]