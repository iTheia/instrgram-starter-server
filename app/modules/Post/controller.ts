import { Request, Response } from "express";
import { Post } from "../store/post";
import { User } from "../store/user";
import { Media } from "../store/media";
import { authToken } from "./authToken";
import { Likes } from "../Schemas/likes";
import { Comments } from "../Schemas/comments";
import { savedPost } from "../Schemas/savedPost";
import { JwtPayload } from "jsonwebtoken";
import { CollectionsPost } from "../store/collectionSave";

export async function newPost(req: Request, res: Response) {
  try {
    const { description, media } = req.body;
    const tokenDec: JwtPayload | null = await authToken(req);
    let userDoc;

    if (tokenDec === null) {
      res.send("error token");
    } else {
      userDoc = await User.findById(tokenDec.userId);
    }

    const mediaPost = new Media({ url: media });

    const postDocument = new Post({
      user: userDoc?._id,
      description,
      media: mediaPost,
      date: new Date(),
      hour: new Date().getHours(),
    });

    await postDocument.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

export async function obtain(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const postDoc = await Post.find({ _id: postId });

    res.send(postDoc);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    const { PostId } = req.params;
    const { likeToggle } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const likePost = new Likes({
      user: tokenDec?.userId,
      value: likeToggle,
    });

    await Post.findByIdAndUpdate(PostId, { likes: likePost._id });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function commentsPost(req: Request, res: Response) {
  try {
    const { PostId } = req.params;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const comments = await Post.findById(PostId).populate("Comments");

    res.send(comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function saved(req: Request, res: Response) {
  try {
    const { PostId } = req.params;
    const { nameCollection } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    let userDoc;

    if (tokenDec === null) {
      res.send("error token");
    } else {
      userDoc = await User.findById(tokenDec.userId);
    }

    const collectionDoc = new CollectionsPost({
      name: nameCollection,
    });

    await collectionDoc.save();

    const savePublication = new savedPost({
      user: userDoc?._id,
      post: PostId,
      name: collectionDoc._id,
    });

    await savePublication.save();

    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function addComment(req: Request, res: Response) {
  try {
    const { PostId } = req.params;
    const { comment } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    let userDoc;

    if (tokenDec === null) {
      res.send("error token");
    } else {
      userDoc = await User.findById(tokenDec.userId);
    }

    await Post.findByIdAndUpdate(PostId,)
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
