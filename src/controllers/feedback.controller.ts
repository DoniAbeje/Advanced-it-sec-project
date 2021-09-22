import { NONAME } from "dns";
import { render } from "../lib/render";
import { Request, Response } from "../lib/utils";
import { validateAddFeedback } from "../lib/validator";
import * as repo from "../repositories/feedback.repository";
import * as url from "url";
import { setCaptcha, setCsrf } from "./controller";

export async function addFeedback(req: Request, res: Response) {
  const user = req["user"];
  const body = req["body"];
  const validationResult = validateAddFeedback(body);
  if (validationResult.length) {
    return await render("add-feedback", res, {
      errors: validationResult,
      ...body,
    });
  }
  const { name, email, comment } = body;
  await repo.addFeedback(name, email, comment, user.id);
  return await render("add-feedback", res, { success: ["Feedback added!!"] });
}

export const dashboard = async (req: Request, res: Response) => {
  const user = req["user"];
  const [rows] = await repo.findFeedbacksByUserId(user.id);
  await render("feedbacks", res, { feedbacks: rows });
};

export async function displayEditFeedback(req: Request, res: Response) {
  const queryObject = url.parse(req.url, true).query;
  if (!queryObject.id) {
    res.statusCode = 404;
    res.write("Feedback not found");
    return;
  }

  const user = req["user"];
  const [rows] = await repo.findFeedbackIdAndUserId(queryObject.id, user.id);

  if (!rows.length) {
    res.statusCode = 404;
    res.write("Feedback not found");
    return;
  }

  await render("edit-feedback", res, { ...rows[0], csrf: setCsrf(req), captchaImage: setCaptcha(req) });
}

export async function editFeedback(req: Request, res: Response) {
  const user = req["user"];
  const body = req["body"];

  const validationResult = validateAddFeedback(body);
  if (validationResult.length) {
    return await render("edit-feedback", res, {
      errors: validationResult,
      ...body,
    });
  }
console.log(user);
console.log(body);

  const [rows] = await repo.findFeedbackIdAndUserId(body.id, user.id);

  if (!rows.length) {
    res.statusCode = 404;
    res.write("Feedback not found");
    return;
  }
  const { name, email, comment, id } = body;
  await repo.updateFeedback(name, email, comment, id);
  
  await render("edit-feedback", res, { ...body, name, email, comment, success: ['Feedback saved!!'] });
}
