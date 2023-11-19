import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import Top from "./components/Top";
import { Route } from "./components/types";

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

const routes: Route[] = [
  {
    path: "/",
    description: "このページ",
  },
  {
    path: "*/?delay=1000",
    description: "delayミリ秒待機してレスポンスを返却する。最大 60 * 1000ms",
  },
];

app.get("/", (c) => c.html(<Top routes={routes} />));

export default app;
