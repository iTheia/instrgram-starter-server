import { Router } from "express";

import { following, allFollowers, allFollowings } from "./controller";

const routerFollow = Router({ mergeParams: true });

routerFollow.post("/:nickname/following", following);
routerFollow.get("/followers", allFollowers);
routerFollow.get("/followings", allFollowings);

export { routerFollow };
