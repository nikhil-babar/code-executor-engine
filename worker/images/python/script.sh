#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

if [ -f "input.txt" ]; then
  python $filename.py < input.txt
else 
  python $filename.py 
fi

