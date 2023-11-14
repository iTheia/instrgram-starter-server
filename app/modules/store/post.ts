import { Schema, model } from "mongoose";

interface Post {
  user: Schema.Types.ObjectId;
  description?: string;
  likes?: Schema.Types.ObjectId;
  comments: [Schema.Types.ObjectId];
  media: Schema.Types.ObjectId;
  date: string;
  hour: number;
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, required: true },
  description: { type: String },
  likes: { type: Schema.Types.ObjectId },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  media: { type: Schema.Types.ObjectId },
  date: { type: String },
  hour: { type: Number },
});

export const Post = model<Post>("Post", postSchema);
