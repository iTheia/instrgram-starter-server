import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import config from "../../../config";

export const authToken = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, "deepweb") as JwtPayload;

    if (decoded.exp !== undefined && Date.now() > decoded.exp * 1000) {
      return res.send("Token is expired");
    }

    res.send({
      token,
      decoded,
    });
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
