import fs from "node:fs";
const socket_path = "/app/api.socket";

Deno.serve({
    path: (!fs.existsSync(socket_path) || Deno.removeSync(socket_path)) ? socket_path : socket_path,
}, (_req) => {
    return new Response("hello world");
});