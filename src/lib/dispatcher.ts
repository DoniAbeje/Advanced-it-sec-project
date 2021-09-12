import { publicFileHandler } from "../controllers/controller";
import { routes } from "../routes";
import { Request, Response } from "./utils";

export async function dispatch(
  url: URL,
  method: String,
  req: Request,
  res: Response
) {
  const path = url.pathname;
  if (/^\/public/.test(path)) {
    await publicFileHandler(req, res);
    return;
  }

  for await (const r of routes) {
    if (r.path === path && r.method === method) {
      await r.handler(req, res);
      return;
    }
  }
  res.statusCode = 404;
  res.write("<h1>Page Not Found!!</h1>");
  res.end()
}
