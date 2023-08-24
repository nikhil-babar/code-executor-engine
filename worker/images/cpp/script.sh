#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

touch output.txt

g++ -o $filename $filename.cpp >> output.txt 2>&1

if [ $? -eq 0 ]; then
  if [ -f "input.txt" ]; then
    ./$filename < input.txt >> output.txt 2>&1
  else 
    ./$filename >> output.txt 2>&1
  fi
fi
