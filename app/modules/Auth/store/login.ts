import { Schema, model } from "mongoose";

interface Login {
  password: string;
  email: string;
  token: string;
}

const loginSchema = new Schema<Login>({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
});

export const Login = model<Login>("Login", loginSchema);
