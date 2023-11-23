import mongoose, { Schema, model } from "mongoose";

interface User {
  nickname: string;
  name: string;
  photo?: {};
  login: Schema.Types.ObjectId;
}

const userSchema = new Schema<User>({
  nickname: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  photo: {
    type: {},
    required: false,
  },
  login: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "login",
  },
});

export const User = mongoose.models.User || model<User>("User", userSchema);
