import { Schema, model } from "mongoose";

interface FollowerList {
  following?: Schema.Types.ObjectId;
  followers?: Schema.Types.ObjectId;
}

const followSchema = new Schema<FollowerList>({
  following: { type: Schema.Types.ObjectId },
  followers: { type: Schema.Types.ObjectId },
});

export const FollowerList = model<FollowerList>("FollowerList", followSchema);
