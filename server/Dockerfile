FROM golang:1.11.1-alpine3.8
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go mod download
EXPOSE 8080
CMD go run main.go
