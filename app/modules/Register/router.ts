import { Router } from "express";

import { register } from "./controller";

const routerRegister = Router({ mergeParams: true });

routerRegister.post("/", register);

export { routerRegister };
