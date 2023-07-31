#!/bin/sh

until nc -z rabbitmq 5672; do
  echo "Waiting for RabbitMQ to be available..."
  sleep 2
done

echo "RabbitMQ is ready! Starting other services..."
