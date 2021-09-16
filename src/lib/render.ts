import { readFile, Response } from "./utils";
import * as hb from "handlebars";

export const render = async (file: String, res: Response, context = null) => {
  const source = await readFile(`./src/views/${file}.handlebars`);
  const template = hb.compile(source.toString());
  const html = template(context);
  res.write(html);
  res.end();
};

function escape(prop: string) {
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return prop.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
}
