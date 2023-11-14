import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { authToken } from "./authToken";
import { Login } from "../../store/login";
import { User } from "../../store/user";
import bcrypt from "bcrypt";

export async function login(req: Request, res: Response) {
  try {
    const { password, email } = req.body;

    const loginDocument = await Login.find({ email: email });
    const hash = loginDocument[0];

    const matchPassword = await bcrypt.compare(password, hash.password);

    if (!matchPassword) {
      return res.send("password incorrect");
    }

    if (!loginDocument) {
      return res.send("error no esta definida la cuenta");
    }

    const login = loginDocument[0];
    const userDocument = await User.find({ login: login._id });
    const userDoc = userDocument[0];

    const token = jwt.sign({ userId: userDoc._id }, config.secret, {
      expiresIn: "7h",
    });

    res.send(token);
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "El error en el Login" });
  }
}

export async function testToken(req: Request, res: Response) {
  try {
    authToken(req, res);
  } catch (error) {}
}
