import * as http from "http";
import { dispatch } from "./lib/dispatcher";
import "./lib/load-partials";
import dotenv from "dotenv";
import * as db from "./lib/db-connection";
import { parse } from "./lib/parser";
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('C:\\Users\\Doni\\Desktop\\It Security Project\\src\\key.pem'),
  cert: fs.readFileSync('C:\\Users\\Doni\\Desktop\\It Security Project\\src\\cert.pem')
};

dotenv.config();
(async () => await db.connect())();
const server = https.createServer(options,async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;
  const body = await parse(req);
  req["body"] = body;
  await dispatch(url, method, req, res);
  res.end();
});

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Http server started on port ${port}`));
