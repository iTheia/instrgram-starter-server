import { Router } from "express";

import { login, register } from "./controller";

const routerAuth = Router({ mergeParams: true });

routerAuth.post("/register", register);
routerAuth.post("/login", login);

export { routerAuth };
