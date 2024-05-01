.PHONY: backend frontend stack clean

install:
	@echo "Installing dependencies"
	(cd backend && poetry install)
	(cd frontend && yarn install)

backend:
	@echo "Building backend"
	docker build -t backend ./backend
	docker run -p 5000:5000 backend

frontend:
	@echo "Building frontend"
	docker build -t frontend ./frontend
	docker run -p 3000:3000 -v ./frontend:/app -e WATCHPACK_POLLING=true frontend

stack: 
	@echo "Building stack"
	./compose.sh

get-db:
	@echo "Copying database file from container to host..."
	docker cp personal-portfolio-backend-1:/app/backend/database/portfolio.db $$(pwd)/backend/backend/database/portfolio.db

clean:
	@echo "Cleaning up"
	if [ "`docker ps -aq`" ]; then docker stop $(shell docker ps -aq); fi
	if [ "`docker ps -aq`" ]; then docker rm $(shell docker ps -aq); fi
	if [ "`docker images -aq`" ]; then docker rmi $(shell docker images -aq); fi

format:
	(cd backend && black .)
	(cd frontend && yarn format)