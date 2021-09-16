import { NONAME } from "dns";
import { render } from "../lib/render";
import { Request, Response } from "../lib/utils";
import { validateAddFeedback } from "../lib/validator";
import * as repo from "../repositories/feedback.repository";

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
