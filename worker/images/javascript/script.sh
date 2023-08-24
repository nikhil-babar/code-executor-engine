#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

if [ -f "input.txt" ]; then
  node $filename.js < input.txt >> output.txt 2>&1
else 
  node $filename.js >> output.txt 2>&1
fi