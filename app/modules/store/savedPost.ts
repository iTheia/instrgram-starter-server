import { Schema, model } from "mongoose";

interface Save {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  name: Schema.Types.ObjectId;
}

const SaveSchema = new Schema<Save>({
  user: { type: Schema.Types.ObjectId, required: true },
  post: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
});

export const Save = model<Save>("Save", SaveSchema);
