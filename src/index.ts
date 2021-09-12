import { SIGINT, SIGTERM } from "constants";
import * as http from "http";
type Request = http.IncomingMessage;
type Response = http.ServerResponse;

class Route {
  path: String;
  handler: (req: Request, res: Response) => void;
}

const homeHandler = (req: Request, res: Response) => {
  res.write("this");
};

const routes: Route[] = [{ path: "/", handler: homeHandler }];

function dispatch(url: URL) {
  const path = url.pathname;
  console.log(path);
}
const server = http.createServer((req, res) => {
  dispatch(new URL(req.url, req.headers.host));
  res.end();
});

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Http server started on port ${port}`));