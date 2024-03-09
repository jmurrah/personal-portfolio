# Use an official Node.js runtime as the base image
FROM node:14-slim

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json into the Docker image
COPY ./package*.json ./

# Install the application dependencies inside the Docker image
RUN npm install

# Copy the rest of the application code into the Docker image
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]