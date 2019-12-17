#!/bin/bash
MYSQL_ROOT_PASSWORD=pw

docker exec db sh -c 'exec mysqldump --all-databases -uroot -p"${MYSQL_ROOT_PASSWORD}"' > dump.sql

# Backup
# docker exec CONTAINER /usr/bin/mysqldump -u root --password=root DATABASE > backup.sql

# Restore
# cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE

# For Windows using Powershell with a large database you should use
# Backup
# docker exec CONTAINER /usr/bin/mysqldump -u root --password=root -r DATABASE | Set-Content backup.sql

# docker exec $(docker ps | awk '{print $NF}' | grep -w app1-db) mysqldump DATABASE > app1-db.$(date +"%Y%m%d_%H%M%S").sql
# Where "app1-db" is a part of the name of the docker container with database (like "r-prod-app1-db-1-fdeb0d85")
