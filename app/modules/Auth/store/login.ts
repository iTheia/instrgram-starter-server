import mongoose, { Schema, model } from "mongoose";

interface Login {
  password: string;
  email: string;
  token: string;
}

const loginSchema = new Schema<Login>({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const Login =
  mongoose.models.Login || model<Login>("Login", loginSchema);
