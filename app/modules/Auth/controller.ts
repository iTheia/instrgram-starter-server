import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { authToken } from "../../middleware/authToken";
import { Login } from "../Schemas/login";
import { User } from "../Schemas/user";
import { Media } from "../Schemas/media";
import bcrypt from "bcrypt";
import { validateRequest } from "./validateData";

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

export async function register(req: Request, res: Response) {
  try {
    const { name, photo, nickname, password, email } = req.body;

    const validate = {
      username: name,
      password: password,
      email: email,
    };

    await validateRequest(validate);

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
