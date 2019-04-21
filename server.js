const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const configureRoutes = require("./config/routes");

server.get("/", (req, res) => {
  res.status(200).json({ message: "please use API endpoints" });
});
configureRoutes(server);
module.exports = server;
