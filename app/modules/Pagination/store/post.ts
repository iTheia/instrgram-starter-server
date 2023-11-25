import mongoose, { Schema, model } from "mongoose";

interface Post {
  user: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId;
  description: string;
  comments: [Schema.Types.ObjectId];
  media: Schema.Types.ObjectId;
  date: number;
  hour: number;
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, required: true },
  likes: { type: Schema.Types.ObjectId },
  description: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  media: { type: Schema.Types.ObjectId },
  date: { type: Number },
  hour: { type: Number },
});

export const Post = mongoose.models.Post || model<Post>("Post", postSchema);
