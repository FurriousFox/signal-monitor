FROM frolvlad/alpine-glibc:latest

COPY --from=denoland/deno:bin /deno /usr/local/bin/deno
# RUN apk add --no-cache nano htop iproute2
# RUN apk add --no-cache curl nginx envsubst
RUN apk add --no-cache libgcc nodejs npm

COPY ./app /app

ENTRYPOINT [ "sh", "-c", "/app/run.sh" ]