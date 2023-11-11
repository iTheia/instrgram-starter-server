import { Schema, model } from "mongoose";

interface savedPost {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  name: Schema.Types.ObjectId;
}

const savedPostSchema = new Schema<savedPost>({
  user: { type: Schema.Types.ObjectId, required: true },
  post: { type: Schema.Types.ObjectId, required: true },
  name: { type: Schema.Types.ObjectId, required: true },
});

export const savedPost = model<savedPost>("savedPost", savedPostSchema);
