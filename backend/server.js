import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  createTable,
  getSightings,
  getSighting,
  newSighting,
  deleteSighting,
} from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure database table exists
createTable();

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * Serve uploaded images statically
 */
app.get("/uploads/:filename", (c) => {
  const filename = path.basename(c.req.param("filename"));
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return c.text("File not found", 404);
  }

  const fileBuffer = fs.readFileSync(filePath);

  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };
  const contentType = mimeTypes[ext] || "application/octet-stream";

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
});

/**
 * Get submitted sightings
 */
app.get("/sightings", (c) => {
  try {
    const sightings = getSightings();
    return c.json(sightings);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * Get a single sighting by ID
 */
app.get("/sightings/:id", (c) => {
  try {
    const id = c.req.param("id");
    const sighting = getSighting(id);
    if (!sighting) {
      return c.json({ error: "Sighting not found" }, 404);
    }
    return c.json(sighting);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * Submit a new sighting
 * Sighting has: location, date, notes, and image
 * Supports JSON or FormData (with file upload)
 */
app.post("/sightings", async (c) => {
  try {
    const contentType = c.req.header("content-type") || "";
    let body;
    if (contentType.includes("application/json")) {
      body = await c.req.json();
    } else {
      body = await c.req.parseBody();
    }

    const { location, date, notes, image } = body;

    let imagePath = null;

    // Handle file upload if image is a File / Blob object with content
    if (
      image &&
      typeof image === "object" &&
      typeof image.arrayBuffer === "function" &&
      image.size > 0
    ) {
      const originalName = image.name || "sighting.jpg";
      const ext = path.extname(originalName) || ".jpg";
      const uniqueName = `sighting-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const savePath = path.join(uploadsDir, uniqueName);

      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(savePath, buffer);
      imagePath = `/uploads/${uniqueName}`;
    } else if (typeof image === "string" && image.trim().length > 0) {
      imagePath = image.trim();
    }

    const sighting = newSighting(location, date, notes, imagePath);

    return c.json(sighting, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * Delete a sighting by ID
 */
app.delete("/sightings/:id", (c) => {
  try {
    const id = c.req.param("id");
    deleteSighting(id);
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * Report an inappropriate sighting
 */
app.post("/reports", async (c) => {
  try {
    const contentType = c.req.header("content-type") || "";
    let body;
    if (contentType.includes("application/json")) {
      body = await c.req.json();
    } else {
      body = await c.req.parseBody();
    }

    const sightingId = body.sighting_id ?? body.sightingId ?? body.id;
    const reason = body.reason ?? body.notes ?? "";

    if (!sightingId) {
      return c.json({ error: "sighting_id is required" }, 400);
    }

    return c.json({ success: true, sighting_id: sightingId, reason }, 201);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

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

export default app;
