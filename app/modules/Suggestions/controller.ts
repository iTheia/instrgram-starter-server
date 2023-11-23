import { Response, Request } from "express";
import { User } from "./user";
import { authToken } from "../../middleware/authToken";
import { JwtPayload } from "jsonwebtoken";

export async function suggestions(req: Request, res: Response) {
  try {
    const tokenDec: JwtPayload | null = await authToken(req);

    if (tokenDec === null) {
      res.send("error token");
    }

    const randomUser = await User.aggregate().sample(10);
    res.send(randomUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
