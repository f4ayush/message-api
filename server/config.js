/*************Config files to export the env variables*************/
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
};
