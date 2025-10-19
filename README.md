# Signal monitor

Hey! *\*silence\**  
Anyone there? *\*silence\**  
damn it, lost signal i think...  

`GET / HTTP/1.1`? *`HTTP/1.1 200 OK`*  

ah, all good :\)

## running it

you can try it at [signal.argv.nl/demo](https://signal.argv.nl/demo)

### recommended way (linux)

```ShellSession
micha@mini:~$ docker pull signal_monitor
micha@mini:~$ docker volume create signal_monitor_data
micha@mini:~$ docker run -e PORT=8080 -dit --restart=always --network=host --name signal_monitor -v signal_monitor_data:/data signal_monitor
```

### windows

Both `--network=host` and IPv6 are barely supported on Docker for Windows, this means there's no IPv6 support for Windows.  
Make sure to **not** use --network=host (as this causes issues with exposing ports)

```ShellSession
C:\Users\micha> docker pull signal_monitor
C:\Users\micha> docker volume create signal_monitor_data
C:\Users\micha> docker run -e PORT=8080 -dit --restart=always -p 8080:8080 --name signal_monitor -v signal_monitor_data:/data signal_monitor
```

## future goals

- notifications (discord, telegram, signal, ntfy, email)
- good looking ui
- (multi-node) high availability
- more protocols
- kubernetes
- rust rewrite(?)
- proper ipv6 support (instead of --network=host)
- auto https
- certificate monitoring
