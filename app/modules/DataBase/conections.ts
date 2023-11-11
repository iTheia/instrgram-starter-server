let mongoose = require("mongoose");
import config from "../../config";

const server = config.uri;
const database = config.database;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(() => {
        console.error("Database connection error");
      });
  }
}

export const DataBase = new Database(); // Se utiliza el patron singlenton
