import { Express } from "express";
import { healthCheckRouter } from "./modules";

import { routerLogin } from "./modules/Login/router";
import { routerRegister } from "./modules/Register/router";

export default function (app: Express) {
  app.use("/health-check", healthCheckRouter);

  app.use("/login", routerLogin);
  app.use("/register", routerRegister);

  app.use((_, res) => {
    res.status(404).json({ error: "Not Found" });
  });
}
