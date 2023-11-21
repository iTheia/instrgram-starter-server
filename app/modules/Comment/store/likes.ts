import mongoose,{ Schema, model } from "mongoose";

interface Likes {
  user: Schema.Types.ObjectId;
  value: boolean;
}

const likesSchema = new Schema<Likes>({
  user: { type: Schema.Types.ObjectId, required: true },
  value: { type: Boolean, required: true },
});

export const Likes = mongoose.models.Likes || model<Likes>("Likes", likesSchema);
