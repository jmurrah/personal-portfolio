FROM node:21-slim

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install
COPY . .

EXPOSE 3000
ENV WATCHPACK_POLLING=true

CMD [ "yarn", "start" ]