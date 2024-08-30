FROM node:20.17.0-slim

COPY ./package.json /app/

WORKDIR /app

RUN npm install .

COPY . .

ENTRYPOINT [ "npm", "start" ]
