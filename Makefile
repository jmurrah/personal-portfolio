.PHONY: backend frontend stack clean

backend:
	@echo "Building backend"
	docker build -t backend ./backend
	docker run -p 5000:5000 backend

frontend:
	@echo "Building frontend"
	docker build -t frontend ./frontend
	docker run -p 3000:3000 frontend

watch:
	@echo "Watching stack"
	docker compose alpha watch

stack: 
	@echo "Building stack"
	(make watch &)
	./compose.sh

get-db:
	@echo "Copying database file from container to host..."
	@if docker cp personal-portfolio-backend-1:/app/backend/database/portfolio.db $$(pwd)/backend/backend/database/portfolio.db; then \
		echo "Copied database file from personal-portfolio-backend-1"; \
	else \
		docker cp personal-portfolio_backend_1:/app/backend/database/portfolio.db $$(pwd)/backend/backend/database/portfolio.db && echo "Copied database file from personal-portfolio_backend_1"; \
	fi

clean:
	@echo "Cleaning up"
	if [ "`docker ps -aq`" ]; then docker stop $(shell docker ps -aq); fi
	if [ "`docker ps -aq`" ]; then docker rm $(shell docker ps -aq); fi
	if [ "`docker images -aq`" ]; then docker rmi $(shell docker images -aq); fi

format:
	(cd frontend && yarn format)
	black .