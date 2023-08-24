#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

cd ./shared_volume/$id

if [ -f "input.txt" ]; then
  python $filename.py < input.txt >> output.txt 2>&1
else 
  python $filename.py >> output.txt 2>&1
fi

