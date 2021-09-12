import { Request, Response } from "./lib/types";
import * as controller from './controllers/controller';

export class Route {
  path: String;
  method: String;
  handler: (req: Request, res: Response) => void;
}

export const routes: Route[] = [
  { method: "GET", path: "/", handler: controller.home },
];
