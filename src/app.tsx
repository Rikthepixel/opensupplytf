import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { World } from "./world";
import { raw } from "hono/html";
import path from "path";
import { PropsWithChildren } from "hono/jsx";
import { Hello } from "./hello";
const app = new Hono();

app.use(
  "/assets/*",
  serveStatic({
    root: path.relative(process.cwd(), import.meta.dirname),
  }),
);
app.use(
  "/islands/*",
  serveStatic({
    root: path.relative(process.cwd(), import.meta.dirname),
  }),
);

function Layout(props: PropsWithChildren) {
  return (
    <>
      {raw("<!DOCTYPE html>")}
      <html>
        <head></head>
        <body>{props.children}</body>
      </html>
    </>
  );
}

app.get("/", (c) => {
  const jsx = (
    <Layout>
      <Hello island-load />
      <World island-load />
    </Layout>
  );

  return c.html(jsx);
});

export default app;
