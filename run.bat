docker rm signal --force

docker image rm signal:latest
docker build -t signal:latest ./src/

docker run -it -p 8080:8080 -e PORT=8080 --name signal signal