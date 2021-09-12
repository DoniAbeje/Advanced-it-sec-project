import { Request, Response } from "../lib/types";

export const homeHandler = (req: Request, res: Response) => {
    res.write("this");
  };