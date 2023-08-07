#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

if [ -f "input.txt" ]; then
  node $filename.js < input.txt
else 
  node $filename.js
fi