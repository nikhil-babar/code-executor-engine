#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

javac $filename.java

if [ -f "input.txt" ]; then
  java $filename < input.txt
else 
  java $filename
fi