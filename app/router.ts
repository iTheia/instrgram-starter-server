import { Express } from "express";
import { healthCheckRouter } from "./modules";

import { routerList } from "./modules/Login/router";

export default function (app: Express) {
  app.use("/health-check", healthCheckRouter);

  app.use("/register", routerList);

  app.use((_, res) => {
    res.status(404).json({ error: "Not Found" });
  });
}
