import { Router } from "express";

import { login, testToken } from "./controller";

const routerList = Router({ mergeParams: true });

routerList.post("/", login);
routerList.post("/uploadImage", testToken);

export { routerList };
