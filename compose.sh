#!/bin/bash

# Function to run when the script is interrupted
teardown() {
    echo "Copying database file from container to host and shutting down..."
    docker cp personal-portfolio-backend-1:/app/backend/database/portfolio.db $(pwd)/backend/backend/database/portfolio.db
    docker-compose down
    make clean
    exit 0
}

# Trap the SIGINT signal and call the teardown function
trap teardown SIGINT

# Start docker-compose and wait for it to exit
docker-compose up