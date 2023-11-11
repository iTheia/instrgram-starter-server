import { number } from "joi";

require("dotenv").config();

const { PORT, SECRET } = process.env;

const config = {
  port: PORT || 3000,
  secret: SECRET || "deepweb",
};

export default config;
