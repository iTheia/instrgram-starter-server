require('dotenv').config();

const { PORT } = process.env;

export default {
  port: PORT || 3000,
};
