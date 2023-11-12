import { Schema, model } from "mongoose";

interface User {
  nickname: string;
  name: string;
  photo?: Schema.Types.ObjectId;
  login: Schema.Types.ObjectId;
}

const userSchema = new Schema<User>({
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  photo: { type: Schema.Types.ObjectId, required: false },
  login: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "login",
  },
});

export const User = model<User>("User", userSchema);
