import * as http from "http";
import { dispatch } from "./lib/dispatcher";
import "./lib/load-partials";
import dotenv from "dotenv";
import * as db from "./lib/db-connection";
import { parse } from "./lib/parser";

dotenv.config();
(async () => await db.connect())();
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;
  const body = await parse(req);
  req["body"] = body;
  await dispatch(url, method, req, res);
  res.end();
});

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Http server started on port ${port}`));
