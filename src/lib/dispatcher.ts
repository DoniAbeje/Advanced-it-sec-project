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

export function checkCsrf(req) {
  const { csrf } = req["body"];
  const user = req["user"];

  const pass = session.users.some(
    (u) => u.data.id == user.id && u.csrf == csrf
  );

  return pass;
}

export function checkCaptcha(req) {
  const { captcha } = req["body"];
  const user = req["user"];

  const pass = session.users.some(
    (u) => u.data.id == user.id && u.captcha == captcha
  );

  return pass;
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

function unauthorized(res) {
  res.statusCode = 403;
  res.write("<h1>Unauthorized!!</h1>");
  res.end();
}

function csrfMismatch(res) {
  res.statusCode = 400;
  res.write("<h1>CSRF Mismatch!!</h1>");
  res.end();
}

function captchaFaild(res) {
  res.statusCode = 400;
  res.write("<h1>Captcha Faild!!</h1>");
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
      req["user"] = user ? user.data : undefined;

      if (r.auth && !user) {
        return notAuthenticated(res);
      }

      if (r.role != null) {
        if (!user || user.data.role != r.role) {
          return unauthorized(res);
        }
      }

      if (r.csrf && !checkCsrf(req)) {
        return csrfMismatch(res);
      }

      if (r.captcha && !checkCaptcha(req)) {
        return captchaFaild(res);
      }

      await r.handler(req, res);
      return;
    }
  }
  return notFound(res);
}
