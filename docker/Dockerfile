FROM node:20.17.0-slim

COPY ./package.json /app/

WORKDIR /app

RUN npm install .

COPY . .
COPY ./docker/key/https_certificate.pem /app/ca.pem

ENTRYPOINT [ "npm", "start" ]
