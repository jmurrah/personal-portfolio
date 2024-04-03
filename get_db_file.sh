#!/bin/bash

echo "Copying database file from container to host..."
docker cp personal-portfolio-backend-1:/app/backend/database/portfolio.db $(pwd)/backend/backend/database/portfolio.db