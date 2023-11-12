import { json, urlencoded } from "body-parser";
import express from "express";
import router from "./router";
import config from "./config";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

router(app);

app.listen(3000);
