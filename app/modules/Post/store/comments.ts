import { Schema, model } from "mongoose";

interface Comments {
  user: Schema.Types.ObjectId;
  description: string;
  reply: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId;
}

const commentsSchema = new Schema<Comments>({
  user: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  reply: { type: Schema.Types.ObjectId },
  likes: { type: Schema.Types.ObjectId },
});

export const Comments = model<Comments>("Comments", commentsSchema);
