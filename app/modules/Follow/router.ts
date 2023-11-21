import { Router } from "express";

import {
  following,
  followers,
  allFollowers,
  allFollowings,
} from "./controller";

const routerFollow = Router({ mergeParams: true });

routerFollow.post("/:nickname/following", following);
routerFollow.post("/:nickname/followers", followers);
routerFollow.get("/followers", allFollowers);
routerFollow.get("/followings", allFollowings);

export { routerFollow };
