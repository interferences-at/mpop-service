#!/bin/bash
docker-compose rm
if [ $? -eq 0 ]; then
  docker volume remove mpop-service_mysql_data_volume
fi

