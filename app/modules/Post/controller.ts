import { Request, Response } from "express";
import { Post } from "./store/post";
import { User } from "./store/user";
import { Likes } from "./store/likes";
import { Media } from "./store/media";
import { Comments } from "./store/comments";

export function createPost(req: Request, res: Response) {
  const { user, likes, comments, media } = req.body;
}
