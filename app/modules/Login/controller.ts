import { Request, Response } from "express";
import validateRegister from "./validateLogin";
import jwt from "jsonwebtoken";
import { authToken } from "./authToken";
import config from "../../config";

export async function login(req: Request, res: Response) {
  /// si esta en la base de datos darle un token

  try {
    const { username } = req.params;

    const token = jwt.sign({ username }, config.secret, { expiresIn: "1h" });

    const dataUser = await validateRegister(req.body);

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
