import { render } from "../lib/render";
import { readFile, Request, Response } from "../lib/utils";

export const serve = (file) => async (req: Request, res: Response) => {
  await render(file, res);
};

export const dashboard = async (req: Request, res: Response) => {
  await render('dashboard', res, { reviews: [1,2,3,4]});
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
