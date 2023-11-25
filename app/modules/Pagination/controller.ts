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

    const arrayFollower = followerList[0].follower;

    let allPost: any[] = [];

    const postPromises = arrayFollower.map(async (id: any) => {
      const post = await Post.findOne({ user: id });

      if (post !== null) {
        return allPost.push(post);
      }
    });

    await Promise.all(postPromises);

    allPost = allPost.slice(LIMIT * page, LIMIT * (page + 1));

    res.send(allPost);
  } catch (error) {
    res.send(error);
  }
}
