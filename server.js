const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "0.0.0.0";
const port = Number(process.env.PORT) || 8080;
const rootDir = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8"
};

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const basePath = decodedPath === "/" ? "/index.html" : decodedPath;
  const candidatePath = basePath.endsWith("/")
    ? path.join(basePath, "index.html")
    : basePath;

  if (candidatePath === "/favicon.ico") {
    return path.resolve(rootDir, "favicon.svg");
  }

  const absolutePath = path.resolve(rootDir, `.${candidatePath}`);

  if (!absolutePath.startsWith(rootDir)) {
    return null;
  }

  if (path.extname(absolutePath)) {
    return absolutePath;
  }

  const htmlFallback = `${absolutePath}.html`;
  return fs.existsSync(htmlFallback) ? htmlFallback : absolutePath;
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad Request");
    return;
  }

  const filePath = resolveRequestPath(req.url);

  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": contentType
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);

    stream.on("error", () => {
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      }
      res.end("Internal Server Error");
    });

    stream.pipe(res);
  });
});

server.listen(port, host, () => {
  console.log(`Static site available on http://${host}:${port}`);
});