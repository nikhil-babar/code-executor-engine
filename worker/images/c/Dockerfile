FROM alpine:latest
RUN apk add --no-cache gcc musl-dev
WORKDIR /app/
COPY . .
CMD ["./script.sh", "id:$id", "filename:$filename"]