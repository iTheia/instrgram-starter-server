import { Router } from "express";

import { login } from "./Login/controller";
import { register } from "./Register/controller";

const routerAuth = Router({ mergeParams: true });

routerAuth.post("/login", login);
routerAuth.post("/register", register);

export { routerAuth };
