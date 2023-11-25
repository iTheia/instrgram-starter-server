import { Request, Response } from "express";
import { authToken } from "../../middleware/authToken";
import { Likes } from "./store/likes";
import { Comments } from "./store/comments";
import { JwtPayload } from "jsonwebtoken";

export async function likeComment(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const { likeToggle, description } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const likePost = new Likes({
      user: tokenDec?.userId,
      value: likeToggle,
    });

    const newComment = new Comments({
      user: commentId,
      description,
      likes: likePost,
    });

    await newComment.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
