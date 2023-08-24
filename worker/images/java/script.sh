#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

touch output.txt

javac $filename.java >> output.txt 2>&1


if [ $? -eq 0 ]; then
  if [ -f "input.txt" ]; then
    java $filename < input.txt >> output.txt 2>&1
  else 
    java $filename >> output.txt 2>&1
  fi
fi