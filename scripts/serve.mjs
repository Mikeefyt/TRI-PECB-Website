// Static preview of the exported site in out/ (adapted from v23's scripts/serve.mjs).
// Usage: npm run build && npm run preview   →  http://127.0.0.1:4173/
// Optional: node scripts/serve.mjs <directory> <port>
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 4173);
const host = process.env.HOST || "127.0.0.1";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
    return;
  }
  const send = async (file, status = 200) => {
    const body = await readFile(file);
    response.writeHead(status, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Content-Length": body.length, "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : body);
  };
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes("\0") || pathname.includes("\\")) throw Object.assign(new Error("Invalid path"), { code: "EINVAL" });
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(file);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(302, { Location: url.pathname + "/" + url.search }).end();
        return;
      }
      file = path.join(file, "index.html");
    }
    await send(file);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      try {
        await send(path.join(root, "404.html"), 404);
      } catch {
        response.writeHead(404).end("Page not found");
      }
    } else response.writeHead(400).end("Bad request");
  }
}).listen(port, host, () => {
  console.log(`Think Risk preview: http://${host}:${port}/`);
  console.log("Static preview only. Email submission is not implemented by this server.");
});
