import { uuid } from "uuidv4";
import { render } from "../lib/render";
import { session } from "../lib/session";
import { readFile, Request, Response } from "../lib/utils";
import Captcha from "@haileybot/captcha-generator";

export const serve =
  (file, _csrf = false, captcha = false) =>
  async (req: Request, res: Response) => {
    const context: any = {}
    if(_csrf){
      context.csrf = setCsrf(req);
    }
    
    if(captcha){
      context.captchaImage = setCaptcha(req);
    }

    await render(file, res, context);
  };

export const feedbacks = async (req: Request, res: Response) => {
  const csrf = setCsrf(req);
  await render("feedbacks", res, { feedbacks: [1, 2, 3, 4], csrf });
};

export const users = async (req: Request, res: Response) => {
  await render("users", res, { users: [1, 2, 3, 4] });
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
