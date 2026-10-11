/** A dependency-free preview of the exact dist/ files served by GitHub Pages. */
import { createReadStream } from "node:fs";
import * as fs from "node:fs/promises";
import { createServer, type ServerResponse } from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".rss": "application/rss+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".bib": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".wasm": "application/wasm",
  ".gz": "application/gzip",
  ".zip": "application/zip",
};

export function parseOptions(args: string[]): {
  host: string;
  port: number;
  help: boolean;
} {
  let host = "127.0.0.1";
  let port = 4174;
  let help = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }
    const [flag, inline] = arg.split(/=(.*)/s, 2);
    if (!["--port", "-p", "--host", "-H"].includes(flag))
      throw new Error(`Unknown option: ${arg}`);
    const value = inline ?? args[++index];
    if (!value || value.startsWith("-") || /\s/.test(value))
      throw new Error(`Missing or invalid value for ${flag}`);
    if (flag === "--port" || flag === "-p") {
      if (!/^\d+$/.test(value) || Number(value) > 65535)
        throw new Error("Port must be an integer from 0 to 65535.");
      port = Number(value);
    } else {
      host = value;
    }
  }
  return { host, port, help };
}

function inside(directory: string, filename: string): boolean {
  const relative = path.relative(directory, filename);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}

function respond(
  response: ServerResponse,
  status: number,
  message: string,
): void {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(message);
}

export async function createPreviewServer(directory: string) {
  const root = await fs.realpath(directory);
  if (!(await fs.stat(root)).isDirectory())
    throw new Error(`Static output is not a directory: ${directory}`);

  async function serveFile(
    filename: string,
    response: ServerResponse,
    head: boolean,
    status = 200,
  ) {
    // Resolve symlinks as well as .. segments before opening any file.
    const resolved = await fs.realpath(filename);
    if (!inside(root, resolved)) return respond(response, 403, "Forbidden\n");
    const stat = await fs.stat(resolved);
    if (!stat.isFile()) return respond(response, 404, "Not found\n");
    response.writeHead(status, {
      "Content-Type":
        mimeTypes[path.extname(filename).toLowerCase()] ||
        "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    if (head) return response.end();
    const stream = createReadStream(resolved);
    stream.on("error", (error) => response.destroy(error));
    response.on("close", () => stream.destroy());
    stream.pipe(response);
  }

  async function notFound(response: ServerResponse, head: boolean) {
    try {
      await serveFile(path.join(root, "404.html"), response, head, 404);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      respond(response, 404, "Not found\n");
    }
  }

  return createServer((request, response) => {
    void (async () => {
      if (request.method !== "GET" && request.method !== "HEAD") {
        response.setHeader("Allow", "GET, HEAD");
        return respond(response, 405, "Method not allowed\n");
      }
      const head = request.method === "HEAD";
      const target = request.url || "/";
      const question = target.indexOf("?");
      const rawPath = question < 0 ? target : target.slice(0, question);
      const query = question < 0 ? "" : target.slice(question);
      let pathname: string;
      try {
        pathname = decodeURIComponent(rawPath);
      } catch {
        return respond(response, 400, "Invalid URL encoding\n");
      }
      if (
        !pathname.startsWith("/") ||
        /[\0\\]/.test(pathname) ||
        pathname.split("/").includes("..")
      )
        return respond(response, 403, "Forbidden\n");
      const filename = path.resolve(root, `.${pathname}`);
      if (!inside(root, filename)) return respond(response, 403, "Forbidden\n");
      try {
        const resolved = await fs.realpath(filename);
        if (!inside(root, resolved))
          return respond(response, 403, "Forbidden\n");
        const stat = await fs.stat(resolved);
        if (stat.isDirectory()) {
          if (!pathname.endsWith("/")) {
            // Always redirect to this origin, even for a path starting with //.
            const location =
              pathname
                .split("/")
                .map(encodeURIComponent)
                .join("/")
                .replace(/^\/+/, "/") +
              "/" +
              query;
            response.writeHead(308, { Location: location });
            return response.end();
          }
          return await serveFile(
            path.join(resolved, "index.html"),
            response,
            head,
          );
        }
        return await serveFile(resolved, response, head);
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code === "ENOENT" || code === "ENOTDIR")
          return await notFound(response, head);
        throw error;
      }
    })().catch((error: unknown) => {
      console.error("[preview] Request failed:", error);
      if (response.headersSent) response.destroy();
      else respond(response, 500, "Internal server error\n");
    });
  });
}

async function main(): Promise<void> {
  const { host, port, help } = parseOptions(process.argv.slice(2));
  if (help) {
    console.log(
      "Usage: npm run preview -- [--port 4174] [--host 127.0.0.1]\nServes the existing dist/ export; run npm run build first.",
    );
    return;
  }
  const server = await createPreviewServer(path.resolve("dist"));
  server.on("error", (error) => {
    console.error("[preview] Server failed:", error);
    process.exitCode = 1;
  });
  for (const signal of ["SIGINT", "SIGTERM"] as const)
    process.on(signal, () => {
      server.close();
      server.closeAllConnections();
    });
  server.listen(port, host, () => {
    const address = server.address();
    const actualPort =
      typeof address === "object" && address ? address.port : port;
    console.log(
      `Serving dist/ at http://${
        host.includes(":") ? `[${host}]` : host
      }:${actualPort}/`,
    );
  });
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
)
  main().catch((error: unknown) => {
    console.error("[preview] Could not start. Run npm run build first.", error);
    process.exitCode = 1;
  });
