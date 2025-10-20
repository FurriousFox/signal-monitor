# Signal monitor

Hey! *\*silence\**  
Anyone there? *\*silence\**  
damn it, lost signal i think...  

`GET / HTTP/1.1`? *`HTTP/1.1 200 OK`*  

ah, all good :\)

## what's this?

It's monitor checking whether services are up, nothing spectacular, but hopefully it'll be soon.

## running it

you can try it at [signal-demo.argv.nl](https://signal-demo.argv.nl/)
or watch the demo at <https://youtu.be/KSAcIBlxux8>

### recommended way (linux)

<!-- ```ShellSession
micha@mini:~$ docker pull signal_monitor
micha@mini:~$ docker volume create signal_monitor_data
micha@mini:~$ docker run -e PORT=8080 -dit --restart=always --network=host --name signal_monitor -v signal_monitor_data:/data signal_monitor
``` -->
```ShellSession
micha@mini:~$ git clone https://github.com/FurriousFox/signal-monitor.git
micha@mini:~$ cd signal-monitor
micha@mini:~$ ./run.sh
```

<!-- ### windows

Both `--network=host` and IPv6 are barely supported on Docker for Windows, this means there's no IPv6 support for Windows.  
Make sure to **not** use --network=host (as this causes issues with exposing ports)

```ShellSession
C:\Users\micha> docker pull signal_monitor
C:\Users\micha> docker volume create signal_monitor_data
C:\Users\micha> docker run -e PORT=8080 -dit --restart=always -p 8080:8080 --name signal_monitor -v signal_monitor_data:/data signal_monitor
``` -->

## made using

- Nginx
- Deno

- Next.js (App Router)
- React
- shadcn/ui
- Tailwind
- lucide-react
- react-hook-form + zod

### and potentional future expansion of the stack?

- Zustand
- TanStack Query (React Query)
- tRPC
- Chart.js (react-chartjs-2) / Recharts
- sonner

- drizzle-orm
- PostgreSQL

- NextAuth.js

## future goals

- good looking public-facing ui
- more notification channels (telegram, signal, ntfy, email)
- use a proper database format that can be synced across servers
- graphs
- (multi-node) high availability
- more protocols
- kubernetes
- rust rewrite(?)
- proper ipv6 support (instead of --network=host)
- auto https
- certificate monitoring
- verbosely detect certificate chain issues (example: skills.ewi.tudelft.nl)
- determine general state (e.g. some good tests similar to those on ssllabs and internet.nl)
