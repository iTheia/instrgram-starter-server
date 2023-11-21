let mongoose = require("mongoose");
import config from "../config";

const server = "127.0.0.1:27017";
const database = "deepWeb";
export const connectDb = () => {
  mongoose
    .connect(`mongodb://${server}/${database}`)
    .then(() => {
      console.log("Conexión exitosa a la base de datos");
    })
    .catch((err: any) => {
      console.error("Error de conexión a la base de datos:", err);
    });
};
