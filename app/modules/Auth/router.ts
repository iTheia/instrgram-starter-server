import { Router } from "express";

import { login, testToken } from "./Login/controller";
import { register } from "./Register/controller";

const routerAuth = Router({ mergeParams: true });

routerAuth.post("/test", testToken);
routerAuth.post("/register", register);
routerAuth.post("/login", login);

export { routerAuth };
