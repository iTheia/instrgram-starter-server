import "dotenv/config";

const { PORT, SECRET, URI, DATABASE } = process.env;

type Secret = string;
const SECRET_TOKEN: Secret = SECRET || "";

const config = {
  port: PORT,
  secret: SECRET_TOKEN,
  uri: URI || "",
  database: DATABASE || "",
};

export default config;
