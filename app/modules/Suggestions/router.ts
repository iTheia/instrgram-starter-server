import { Router } from "express";

import { suggestions } from "./controller";

const routerSuggest = Router({ mergeParams: true });

routerSuggest.get("/", suggestions);

export { routerSuggest };
