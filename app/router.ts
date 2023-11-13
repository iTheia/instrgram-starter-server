import { Express } from "express";
import { healthCheckRouter } from "./modules";

import { routerAuth } from "./modules/Auth/router";

export default function (app: Express) {
  app.use("/health-check", healthCheckRouter);

  app.use("/auth", routerAuth);

  app.use((_, res) => {
    res.status(404).json({ error: "Not Found" });
  });
}
