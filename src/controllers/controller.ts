import { render } from "../lib/render";
import { Request, Response } from "../lib/types";

export const home = (req: Request, res: Response) => {
  render('index', res, { name: 'The name'});
};
