import express from "express";
import { Request, Response, NextFunction } from "express";
import * as http from "http";
import { config } from "./config/config";
import { DB } from "./models/db";
var expressValidator = require("express-validator");

var cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const db = new DB();
const port = config.port || 9000;
const mongodbURI: string = config.mongodbURI;
const LABEL = config.serviceName;

app.set("port", port);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/test", (req, res) => {
  res.send(config.serviceName + "is LIVE");
});

db.connectWithRetry(mongodbURI);

//start the server

server.listen(port, () => {
  console.log(LABEL + "is runnning on port " + port);
});

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Page/Api not found");
});

module.exports = app;
