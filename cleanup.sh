#!/bin/bash

docker rm $(docker ps -aq)
docker volume rm $(docker volume ls -q)
# docker rmi $(docker images -aq)
