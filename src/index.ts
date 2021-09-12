import { SIGINT, SIGTERM } from "constants";
import * as http from "http";
type Request = http.IncomingMessage;
type Response = http.ServerResponse;

class Route {
  path: String;
  method: String;
  handler: (req: Request, res: Response) => void;
}

const homeHandler = (req: Request, res: Response) => {
  res.write("this");
};

const routes: Route[] = [{ method: "GET", path: "/", handler: homeHandler }];

function dispatch(url: URL, method: String, req: Request, res: Response) {
  const path = url.pathname;
  routes.some((r) => {
    if (r.path === path && r.method === method) {
      r.handler(req, res);
      return true;
    }
  });
}
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;
  dispatch(url, method, req, res);
  res.end();
});

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Http server started on port ${port}`));
