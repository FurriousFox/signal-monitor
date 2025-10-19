import fs from "node:fs";

export async function GET() {
    return new Response(fs.readFileSync("../database.json", 'utf-8'));
}

export async function POST(req: Request) {
    const monitor = await req.json();
    // console.log(monitor);

    let status = false;
    try {
        if (Math.floor((await fetch(monitor.url, { method: monitor.method ?? "GET" })).status / 100) !== 2) {
            throw new Error("non 200 response");
        } else {
            status = true;
        }
    } catch (_e) {
        status = false;
    }

    monitor.status = status;

    // THIS ISN'T A GOOD DATABASE, YES I GOTTA SWITCH TO A BETTER ONE SOMETIME
    const database = JSON.parse(fs.readFileSync("../database.json", 'utf-8'));
    if (!database.monitors) database.monitors = [];
    database.monitors.push(monitor);
    fs.writeFileSync("../database.json", JSON.stringify(database, null, 2));

    return Response.json({
        status: true,
    });
}

export async function DELETE(req: Request) {
    const monitor = await req.text();
    const database = JSON.parse(fs.readFileSync("../database.json", 'utf-8'));
    if (!database.monitors) database.monitors = [];
    database.monitors = database.monitors.filter((_e, f) => f !== +monitor);
    fs.writeFileSync("../database.json", JSON.stringify(database, null, 2));

    return Response.json({
        status: true,
    });
}