FROM alpine:latest
RUN apk add --no-cache g++ musl-dev
WORKDIR /app/
COPY . .
CMD ["./script.sh", "id:$id", "filename:$filename"]