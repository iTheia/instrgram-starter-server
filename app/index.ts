import { json, urlencoded } from "body-parser";
import express from "express";
import router from "./router";
import config from "./config";
import { connectDb } from "./modules/DataBase/connections";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
connectDb();
router(app);

app.listen(config.port);
