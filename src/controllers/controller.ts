import { render } from "../lib/render";
import { readFile, Request, Response } from "../lib/utils";

export const serve = (file) => async (req: Request, res: Response) => {
  await render(file, res);
};

export const dashboard = async (req: Request, res: Response) => {
  await render("feedbacks", res, { feedbacks: [1, 2, 3, 4] });
};

export const feedbacks = async (req: Request, res: Response) => {
  await render("feedbacks", res, { feedbacks: [1, 2, 3, 4] });
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
