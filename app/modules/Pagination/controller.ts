import { Response, Request } from "express";
import { Post } from "./store/post";
import { authToken } from "../../middleware/authToken";
import { JwtPayload } from "jsonwebtoken";
import { FollowerList } from "./store/followerList";

export async function PostPagination(req: Request, res: Response) {
  try {
    const LIMIT: number = 2;
    const { page } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const followerList = await FollowerList.find({ user: tokenDec?.userId });

    const post = await Post.aggregate([
      {
        $match: {
          user: { $in: followerList[0].follower },
        },
      },
      { $skip: page * LIMIT },
      { $limit: LIMIT },
    ]);

    res.send(post);
  } catch (error) {
    res.send(error);
  }
}
