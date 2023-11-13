import { Request, Response } from "express";
import { Post } from "./store/post";

export function createPost(req: Request, res: Response) {
  const { user, likes, comments, media } = req.body;
}
