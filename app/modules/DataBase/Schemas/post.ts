import { Schema, model } from "mongoose";

interface Post {
  user: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
  media: Schema.Types.ObjectId;
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, required: true },
  likes: { type: Schema.Types.ObjectId },
  comments: { type: Schema.Types.ObjectId },
  media: { type: Schema.Types.ObjectId },
});

export const Post = model<Post>("Post", postSchema);
