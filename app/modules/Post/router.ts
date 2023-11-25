import { Router } from "express";

import {
  newPost,
  obtain,
  commentsPost,
  saved,
  addComment,
  remove,
  likePost,
} from "./controller";

const routerPost = Router({ mergeParams: true });

routerPost.post("/", newPost);
routerPost.get("/:postId", obtain);
routerPost.get("/:postId/comments", commentsPost);
routerPost.post("/:postId/saved", saved);
routerPost.patch("/:postId/comment", addComment);
routerPost.delete("/:postId", remove);
routerPost.post("/:postId/like", likePost);

export { routerPost };
