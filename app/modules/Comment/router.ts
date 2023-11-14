import { Router } from "express";

import { likeComment } from "./controller";

const routerPost = Router({ mergeParams: true });

routerPost.get("/:idComment", likeComment);

export { routerPost };
