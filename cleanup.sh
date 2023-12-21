#!/bin/bash

docker rmi $(docker images -aq)
docker rm $(docker ps -aq)
docker volume rm $(docker volume ls -q)
