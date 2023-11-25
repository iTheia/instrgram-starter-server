import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { Login } from "./store/login";
import User from "./store/user";
import { Media } from "./store/media";
import bcrypt from "bcrypt";
import { validateRequest } from "./store/validateData";
import { FollowerList } from "./store/followerList";

export async function login(req: Request, res: Response) {
  try {
    const { password, email } = req.body;

    const loginDocument = await Login.findOne({ email: email });

    if (!loginDocument) {
      return res.send("error no esta definida la cuenta");
    }

    const hash = loginDocument[0];
    const matchPassword = await bcrypt.compare(password, hash.password);

    if (!matchPassword) {
      return res.send("password incorrect");
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
    mediaDocument.save();

    const userDocument = new User({
      nickname,
      name,
      photo: mediaDocument._id,
      login: loginDocument._id,
    });

    const FollowDoc = new FollowerList({ user: userDocument._id });
    await FollowDoc.save();

    await userDocument.save();

    const token = jwt.sign({ userId: userDocument._id }, config.secret, {
      expiresIn: "7h",
    });

    res.send(token);
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ error: "Error en el servidor." });
  }
}
