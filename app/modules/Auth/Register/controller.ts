import { Request, Response } from "express";
import validateRegister from "./validateData";
import { User } from "../store/user";
import { Login } from "../store/login";
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

    const token = jwt.sign({ email }, "deepweb", { expiresIn: "7h" });

    const hash = await bcrypt.hash(password, 10);

    const loginDocument = new Login({
      password: hash,
      email,
      token,
    });

    await loginDocument.save();

    const userDocument = new User({
      nickname,
      name,
      photo,
      login: loginDocument._id,
    });

    await userDocument.save();

    res.send(token);
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ error: "Error en el servidor." });
  }
}
