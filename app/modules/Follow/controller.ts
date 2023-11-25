import { Request, Response } from "express";
import { authToken } from "../../middleware/authToken";
import { JwtPayload } from "jsonwebtoken";
import { FollowerList } from "./store/followerList";
import User from "./store/user";

export async function following(req: Request, res: Response) {
  try {
    const { nickname } = req.params;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    if ((await User.exists({ nickname })) === null) {
      res.send("the user you are trying to follow does not exist");
    }

    const userId = tokenDec?.userId;
    const followDoc = await FollowerList.find({ user: userId });

    const userToFollow = await User.find({ nickname }).select("_id");
    const userIdFollow = userToFollow[0]._id;

    const followingDoc = await FollowerList.find({ user: userIdFollow });

    followDoc[0]?.following?.push(userIdFollow);
    followingDoc[0]?.follower?.push(userId);

    const followSave1 = new FollowerList(followDoc[0]);
    const followSave2 = new FollowerList(followingDoc[0]);

    await followSave1.save();
    await followSave2.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function allFollowers(req: Request, res: Response) {
  try {
    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const userId = tokenDec?.userId;

    const followDoc = await FollowerList.find({ user: userId }).populate(
      "follower"
    );

    const onlyFollowers = followDoc[0].follower?.map((x: any) => x);

    res.send(onlyFollowers);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function allFollowings(req: Request, res: Response) {
  try {
    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const userId = tokenDec?.userId;

    const followDoc = await FollowerList.find({ user: userId }).populate(
      "following"
    );

    const onlyFollowers = followDoc[0].following?.map((x: any) => x);

    res.send(onlyFollowers);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
