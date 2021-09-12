import { routes } from "../routes";
import { Request, Response } from "./types";

export function dispatch(
  url: URL,
  method: String,
  req: Request,
  res: Response
) {
  const path = url.pathname;
  routes.some((r) => {
    if (r.path === path && r.method === method) {
      r.handler(req, res);
      return true;
    }
  });
}
