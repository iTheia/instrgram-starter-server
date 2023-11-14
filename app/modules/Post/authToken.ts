import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import config from "../../config";

export const authToken = async (req: Request) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, config.secret) as JwtPayload;

    if (decoded.exp !== undefined && Date.now() > decoded.exp * 1000) {
      console.log("token expire");
      return null;
    }

    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
};
