import { Schema, model } from "mongoose";

interface Post {
  user: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
  media: Schema.Types.ObjectId;
  date: number;
  hour: number;
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, required: true },
  likes: { type: Schema.Types.ObjectId },
  comments: { type: Schema.Types.ObjectId },
  media: { type: Schema.Types.ObjectId },
  date: { type: Number },
  hour: { type: Number },
});

export const Post = model<Post>("Post", postSchema);
