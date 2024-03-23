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

clean:
	@echo "Cleaning up"
	if [ "`docker ps -aq`" ]; then docker stop $(shell docker ps -aq); fi
	if [ "`docker ps -aq`" ]; then docker rm $(shell docker ps -aq); fi
	if [ "`docker images -aq`" ]; then docker rmi $(shell docker images -aq); fi
