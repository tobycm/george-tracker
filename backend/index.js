// Start HTTP server in Node.js environment
const port = Number(process.env.PORT) || 3000;

if (typeof process !== "undefined" && process.versions?.node && !process.versions?.bun) {
  try {
    const { serve } = await import("@hono/node-server");
    serve({ fetch: app.fetch, port }, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch {
    const { createServer } = await import("node:http");
    const server = createServer(async (req, res) => {
      try {
        const url = `http://${req.headers.host || "localhost"}${req.url}`;
        const request = new Request(url, {
          method: req.method,
          headers: req.headers,
          body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
          duplex: "half",
        });

        const response = await app.fetch(request);
        res.statusCode = response.status;
        response.headers.forEach((val, key) => res.setHeader(key, val));

        if (response.body) {
          const reader = response.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
        }
        res.end();
      } catch (e) {
        res.statusCode = 500;
        res.end(e?.message || "Internal Server Error");
      }
    });

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}
