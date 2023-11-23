import { Request, Response } from "express";
import { Post } from "./store/post";
import { User } from "./store/user";
import { Media } from "./store/media";
import { authToken } from "../../middleware/authToken";
import { Likes } from "./store/likes";
import { Comments } from "./store/comments";
import { savedPost } from "./store/savedPost";
import { JwtPayload } from "jsonwebtoken";
import { CollectionsPost } from "./store/collectionSave";

export async function newPost(req: Request, res: Response) {
  try {
    const { description, media } = req.body;
    const tokenDec: JwtPayload | null = await authToken(req);
    let userDoc;

    if (tokenDec === null) {
      res.send("error token");
    }

    userDoc = await User.findById(tokenDec?.userId);

    const mediaPost = new Media({ url: media });

    const postDocument = new Post({
      user: userDoc?._id,
      description,
      media: mediaPost,
      date: new Date(),
      hour: new Date().getHours(),
    });

    await postDocument.save();

    res.send(postDocument);
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

    const postDoc = await Post.findById(postId);

    if (postDoc === null) {
      res.send("post is not exist");
      return;
    }

    res.send(postDoc);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { likeToggle } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const likePost = new Likes({
      user: tokenDec?.userId,
      value: likeToggle,
    });

    await likePost.save();

    await Post.findByIdAndUpdate(postId, {
      likes: likePost._id,
    });

    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function commentsPost(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const comments = await Post.find({ _id: postId });

    if (comments === null) {
      res.send("post id is incorrect");
      return;
    }

    res.send(comments[0].comments);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function saved(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { nameCollection } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    let userDoc;

    if (tokenDec === null) {
      res.send("error token");
    }

    userDoc = await User.findById(tokenDec?.userId);

    const collectionDoc = new CollectionsPost({
      collectionName: nameCollection,
    });

    await collectionDoc.save();

    const savePublication = new savedPost({
      user: userDoc?._id,
      post: postId,
      name: collectionDoc._id,
    });

    await savePublication.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function addComment(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const tokenDec: JwtPayload | null = await authToken(req);

    let userDoc;

    if (tokenDec === null) {
      res.send("error token");
    }

    userDoc = await User.findById(tokenDec?.userId);

    const commentDoc = new Comments({
      user: userDoc?._id,
      description: comment,
    });

    await commentDoc.save();

    const PostDoc = await Post.findById(postId);

    if (!PostDoc) {
      res.sendStatus(404);
    }

    PostDoc?.comments.push(commentDoc.id);

    PostDoc?.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }
    const PostDoc = await Post.findById(postId);

    if (!PostDoc) {
      res.sendStatus(404);
    }

    await PostDoc?.deleteOne({ _id: PostDoc._id });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
