#!/bin/bash

docker-compose up server --detach --no-log-prefix
docker-compose up java --detach --no-log-prefix
docker-compose up javascript --detach --no-log-prefix
docker-compose up c --detach --no-log-prefix
docker-compose up cpp --detach --no-log-prefix
docker-compose up python --detach --no-log-prefix
docker-compose up cleanup --detach --no-log-prefix