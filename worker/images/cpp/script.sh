#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id
g++ -o $filename $filename.cpp
./$filename
