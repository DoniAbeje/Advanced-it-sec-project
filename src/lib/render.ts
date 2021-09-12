import { readFile, Response } from "./utils";
import * as hb from "handlebars";

export const render = async (file: String, res: Response, context = null) => {
  const source = await readFile(`./src/views/${file}.handlebars`);
  const template = hb.compile(source.toString());
  const html = template(context);
  res.write(html)
  res.end();
};