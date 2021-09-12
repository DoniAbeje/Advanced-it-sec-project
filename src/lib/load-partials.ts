import * as hb from "handlebars";
import { readFile } from "./utils";

export const readPartial = async (file: String) => {
  return (await readFile(`./src/views/partials/${file}.handlebars`)).toString();
};

(async function () {
  const top = await readPartial("top");
  hb.registerPartial("top", top);
})();
