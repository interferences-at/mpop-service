#!/bin/bash
MYSQL_ROOT_PASSWORD=pw

docker exec db sh -c 'exec mysqldump --all-databases -uroot -p"${MYSQL_ROOT_PASSWORD}"' > dump.sql

