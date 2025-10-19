envsubst '$PORT' < /app/nginx.conf.template > /app/nginx.conf
nginx -c /app/nginx.conf
/usr/local/bin/deno -A --watch /app/api/index.ts # &
sh