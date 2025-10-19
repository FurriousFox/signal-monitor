import fs from "node:fs";
import process from "node:process";

process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);

// const socket_path = "/app/api.socket";

// Deno.serve({
//     path: (!fs.existsSync(socket_path) || Deno.removeSync(socket_path)) ? socket_path : socket_path,
// }, (_req) => {
//     return new Response("hello world");
// });

setInterval(async () => {
    const database = JSON.parse(fs.readFileSync("../database.json", 'utf-8'));
    if (!database.monitors) database.monitors = [];
    for (const monitor of database.monitors) {
        try {
            if (Math.floor((await fetch(monitor.url, { method: monitor.method ?? "GET" })).status / 100) !== 2) {
                throw new Error("non 200 response");
            } else {
                console.log(`all went well for ${monitor.url}`);

                const database2 = JSON.parse(fs.readFileSync("../database.json", 'utf-8'));
                if (!database2.monitors) database2.monitors = [];
                database2.monitors = database2.monitors.map(e => {
                    if (e.url == monitor.url) e.status = true;
                    return e;
                });
                fs.writeFileSync("../database.json", JSON.stringify(database2, null, 2));
            }
        } catch (e) {
            const database2 = JSON.parse(fs.readFileSync("../database.json", 'utf-8'));
            if (!database2.monitors) database2.monitors = [];
            database2.monitors = database2.monitors.map(e => {
                if (e.url == monitor.url) e.status = false;
                return e;
            });
            fs.writeFileSync("../database.json", JSON.stringify(database2, null, 2));
        }
    }
}, 15 * 1000);