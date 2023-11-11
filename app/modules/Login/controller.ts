import { Request, Response } from "express";
import validateRegister from "./validateLogin";
import jwt from "jsonwebtoken";
import { authToken } from "./authToken";
import config from "../../config";

import { User } from "../DataBase/Schemas/user";
import { Login } from "../DataBase/Schemas/login";

export async function login(req: Request, res: Response) {
  /// si esta en la base de datos darle un token

  try {
    const { username, password, email } = req.params;

    const userDocument = await User.find({ nickname: username })



    const token = jwt.sign({ username }, config.secret, { expiresIn: "1h" });

    const validateUser = await validateRegister(req.body);

    res.send(token);
  } catch (err) {
    res.sendStatus(401);
  }
}

export async function testToken(req: Request, res: Response) {
  try {
    authToken(req, res);
  } catch (error) {}
}
