import { Router } from "express";

import {
  newPost,
  obtain,
  commentsPost,
  saved,
  addComment,
  remove,
} from "./controller";

const routerPost = Router({ mergeParams: true });

routerPost.post("/", newPost);
routerPost.get("/:postId", obtain);
routerPost.get("/:PostId/comments", commentsPost);
routerPost.post("/:PostId/saved", saved);
routerPost.patch("/:postId/comment", addComment);
routerPost.delete("/:postId", addComment);

export { routerPost };
