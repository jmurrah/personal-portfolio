.PHONY: backend frontend stack

backend:
	echo "Building backend"
	docker build -t backend ./backend
	docker run -p 5000:5000 backend

frontend:
	echo "Building frontend"
	docker build -t frontend ./frontend
	docker run -p 3000:3000 frontend
	
stack:
	echo "Building stack"
	docker-compose up

# clean:
# 	echo "Cleaning up"
# 	docker rm $(docker ps -aq)
# 	docker rmi $(docker images -aq)