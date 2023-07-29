#!/bin/sh
while [ ! -d "./shared_volume/$id" ]; do
  sleep 1
done

python ./shared_volume/$id/$filename.py