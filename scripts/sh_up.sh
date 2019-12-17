#!/bin/bash
cd $(dirname ${0})
cd ..
docker build .
docker-compose up --build
