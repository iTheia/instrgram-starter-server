import { Router } from "express";

import { newPost, obtain, commentsPost, saved } from "./controller";

const routerPost = Router({ mergeParams: true });

routerPost.post("/", newPost);
routerPost.get("/:postId", obtain);
routerPost.get("/:PostId/comments", commentsPost);
routerPost.post("/:PostId/saved", saved);

export { routerPost };
