#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

gcc -o $filename $filename.c

if [ -f "input.txt" ]; then
  ./$filename < input.txt
else 
  ./$filename
fi
