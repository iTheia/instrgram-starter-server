import { Router } from "express";

import { login } from "./controller";

const routerLogin = Router({ mergeParams: true });

routerLogin.post("/", login);

export { routerLogin };
