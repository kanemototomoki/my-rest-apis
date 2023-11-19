import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

/** middleware */
app.use("*", logger());
// app.use(cors());

const MAX_DELAY = 1000 * 60;
app.use("/*", async (c, next) => {
  const url = new URL(c.req.url);
  const delay = url.searchParams.get("delay");

  if (delay) {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(Number(delay), MAX_DELAY))
    );
  }

  await next();
});

app.get("/", (c) => c.json({ ok: true, message: "ok" }, 200));

export default app;
