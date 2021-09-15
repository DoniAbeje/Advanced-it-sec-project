import * as http from "http";
import { dispatch } from "./lib/dispatcher";
import "./lib/load-partials";
import dotenv from "dotenv";

dotenv.config();
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;
  await dispatch(url, method, req, res);
  res.end();
});

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Http server started on port ${port}`));
