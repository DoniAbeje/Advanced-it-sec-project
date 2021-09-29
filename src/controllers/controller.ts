import { uuid } from "uuidv4";
import { render } from "../lib/render";
import { session } from "../lib/session";
import { readFile, Request, Response } from "../lib/utils";
import Captcha from "@haileybot/captcha-generator";
import * as repo from "../repositories/user.repository";
import * as feedbackRepo from "../repositories/feedback.repository";
import * as url from "url";

export const serve =
  (file, _csrf = false, captcha = false) =>
  async (req: Request, res: Response) => {
    const context: any = {};
    if (_csrf) {
      context.csrf = setCsrf(req);
    }

    if (captcha) {
      context.captchaImage = setCaptcha(req);
    }

    await render(file, res, context);
  };

export const feedbacks = async (req: Request, res: Response) => {
  const csrf = setCsrf(req);
  const [rows] = await feedbackRepo.findAll();

  await render("all-feedbacks", res, { feedbacks: rows, csrf });
};

export const users = async (req: Request, res: Response) => {
  const [rows] = await repo.findAll();
  await render("users", res, { users: rows, csrf: setCsrf(req) });
};

export const disable = async (req: Request, res: Response) => {
  const queryObject = url.parse(req.url, true).query;
  if (!queryObject.id) {
    res.statusCode = 404;
    res.write("User not found");
    return;
  }
  await repo.disable(queryObject.id);
  await res.writeHead(302, { Location: "/users" });
};

export const enable = async (req: Request, res: Response) => {
  const queryObject = url.parse(req.url, true).query;
  if (!queryObject.id) {
    res.statusCode = 404;
    res.write("User not found");
    return;
  }
  await repo.enable(queryObject.id);
  await res.writeHead(302, { Location: "/users" });
};

export const editFeedback = async (req: Request, res: Response) => {
  const review = {
    email: "john.doe@gmail.com",
    name: "John Doe",
    comment: "I am really upset about the beaurocracy!!",
  };
  await render("edit-feedback", res, { review });
};

export const publicFileHandler = async (req: Request, res: Response) => {
  try {
    const data = await readFile("./src" + req.url);
    res.writeHead(200);
    res.end(data);
  } catch (e) {
    res.writeHead(404);
  }
};

export function setCsrf(req) {
  const csrf = uuid();
  const user = req["user"];
  const userSession = session.users.find((u) => u.data.id == user.id);
  userSession.csrf = csrf;
  return csrf;
}

export function setCaptcha(req) {
  const captcha = new Captcha();
  const user = req["user"];
  const userSession = session.users.find((u) => u.data.id == user.id);
  userSession.captcha = captcha.value;
  return captcha.dataURL;
}
