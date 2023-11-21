import { Schema, model, Types } from "mongoose";

interface FollowerList {
  user: Schema.Types.ObjectId;
  following?: [Types.ObjectId];
  follower?: [Types.ObjectId];
}

const followSchema = new Schema<FollowerList>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  following: [{ type: Types.ObjectId, ref: "User" }],
  follower: [{ type: Types.ObjectId, ref: "User" }],
});

export const FollowerList = model<FollowerList>("FollowerList", followSchema);
