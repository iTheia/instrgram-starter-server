import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authToken } from "./authToken";
import config from "../../config";

import { Login } from "../DataBase/Schemas/login";

export async function login(req: Request, res: Response) { 

  try {
    const { password, email } = req.body;

    const loginDocument = await Login.find({ email: email });

    if (!loginDocument) {
      return res.send("error no esta definida la cuenta");
    }

    const token = jwt.sign({ email }, "deepweb", { expiresIn: "1h" });

    const loginSave = {
      password,
      email,
      token,
    };

    await Login.findOneAndUpdate({ email: email }, loginSave);

    res.send(loginDocument);
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
