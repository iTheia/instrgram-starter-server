import mongoose, { Schema, model, Types } from "mongoose";

interface savedPost {
  user: Types.ObjectId;
  post: Types.ObjectId;
  name: Types.ObjectId;
}

const savedPostSchema = new Schema<savedPost>({
  user: { type: Schema.Types.ObjectId, required: true },
  post: { type: Schema.Types.ObjectId, required: true },
  name: { type: Schema.Types.ObjectId, required: true },
});

export const savedPost =
  mongoose.models.savedPost || model<savedPost>("savedPost", savedPostSchema);
