import { Request, Response } from "express";
import validateRegister from "./validateData";

import { User } from "../../store/user";
import { Login } from "../../store/login";
import { Media } from "../../store/media";

import jwt from "jsonwebtoken";
import config from "../../../config";
import bcrypt from "bcrypt";

export async function register(req: Request, res: Response) {
  try {
    const { name, photo, nickname, password, email } = req.body;

    const validate = {
      username: name,
      password: password,
      email: email,
    };

    await validateRegister(validate);

    const userExist = await User.exists({ nickname });
    const loginExist = await Login.exists({ email });

    if (userExist || loginExist) {
      return res
        .status(400)
        .json({ error: "Usuario o inicio de sesión ya existen." });
    }

    const hash = await bcrypt.hash(password, 10);

    const loginDocument = new Login({
      password: hash,
      email,
    });

    await loginDocument.save();

    const mediaDocument = new Media({ media: photo });

    const userDocument = new User({
      name,
      photo: mediaDocument._id,
      nickname,
      login: loginDocument._id,
    });

    const token = jwt.sign({ userId: userDocument._id }, config.secret, {
      expiresIn: "7h",
    });

    await userDocument.save();

    res.send(token);
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ error: "Error en el servidor." });
  }
}