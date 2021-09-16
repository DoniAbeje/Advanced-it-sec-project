import { publicFileHandler } from "../controllers/controller";
import { routes } from "../routes";
import { session } from "./session";
import { Request, Response } from "./utils";

function getUser(sessionId) {
  return session.users.find((u) => u.sessionId === sessionId);
}

function parseCookies(req) {
  const list: any = {};
  const rc = req.headers.cookie;

  rc &&
    rc.split(";").forEach((cookie) => {
      var parts = cookie.split("=");
      list[parts[0].trim()] = parts[1];
    });
  return list;
}

function notFound(res) {
  res.statusCode = 404;
  res.write("<h1>Page Not Found!!</h1>");
  res.end();
}

function notAuthenticated(res) {
  res.statusCode = 401;
  res.write("<h1>Not Authenticated!!</h1>");
  res.end();
}

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
      const cookies = parseCookies(req);
      const user = getUser(cookies.sessionId);

      if (r.auth && !user) {
        return notAuthenticated(res);
      }

      req["user"] = user ? user.data : undefined;
      await r.handler(req, res);
      return;
    }
  }
  return notFound(res);
}
