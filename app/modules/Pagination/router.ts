import { Router } from "express";

import { PostPagination } from "./controller";

const routerPag = Router({ mergeParams: true });

routerPag.post("/", PostPagination);

export { routerPag };
