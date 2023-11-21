import { Express } from "express";
import { healthCheckRouter } from "./modules";

import { routerAuth } from "./modules/Auth/router";
import { routerPost } from "./modules/Post/router";
import { routerFollow } from "./modules/Follow/router";

export default function (app: Express) {
  app.use("/health-check", healthCheckRouter);

  app.use("/auth", routerAuth);
  app.use("/post", routerPost);
  app.use("/follow", routerFollow);

  app.use((_, res) => {
    res.status(404).json({ error: "Not Found" });
  });
}
