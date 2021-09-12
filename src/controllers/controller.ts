import { render } from "../lib/render";
import { Request, Response } from "../lib/types";

export const homeHandler = (req: Request, res: Response) => {
  render('index', res, { name: 'The name'});
};
