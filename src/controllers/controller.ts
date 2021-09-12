import { render } from "../lib/render";
import { readFile, Request, Response } from "../lib/utils";

export const home = async (req: Request, res: Response) => {
 await render("index", res, { name: "The name" });
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
