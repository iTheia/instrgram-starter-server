import { number } from "joi";

require("dotenv").config();

const { PORT, SECRET, URI, DATABASE } = process.env;

const config = {
  port: PORT,
  secret: SECRET || "deepweb",
  uri: URI,
  database: DATABASE,
};

export default config;
