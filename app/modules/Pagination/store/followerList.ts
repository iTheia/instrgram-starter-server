import mongoose, { Schema, model, Types } from "mongoose";

interface FollowerList {
  user: Schema.Types.ObjectId;
  following?: [Types.ObjectId];
  follower?: [Types.ObjectId];
}

const followSchema = new Schema<FollowerList>({
  user: { type: Schema.Types.ObjectId, required: true },
  following: [{ type: Types.ObjectId }],
  follower: [{ type: Types.ObjectId }],
});

export const FollowerList =
  mongoose.models.FollowerList ||
  model<FollowerList>("FollowerList", followSchema);
