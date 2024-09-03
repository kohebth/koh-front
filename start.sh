#!/bin/bash

docker compose up --build -d
docker image prune
docker compose logs -f
