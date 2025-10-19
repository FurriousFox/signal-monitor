docker rm signal --force

docker image rm signal:latest
docker build -t signal:latest ./src/

docker run -it --network=host -e PORT=8080 --name signal signal