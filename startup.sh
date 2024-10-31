#!/bin/bash

# Create a data directory and set permissions
if [ ! -d "./database/data" ]; then
  mkdir ./database/data
  chmod 777 ./database/data
fi

# Start docker compose
docker-compose up --build
