import { Response } from "../lib/types";
import * as hb from "handlebars";
import * as fs from "fs";

export const render = (file: String, res: Response, context = null) => {
  const source = fs.readFileSync(`./src/views/${file}.handlebars`, "utf-8");
  const template = hb.compile(source);
  const html = template(context);
  res.write(html)
  res.end();
};