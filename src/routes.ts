import { Request, Response } from "./lib/utils";
import * as controller from './controllers/controller';

export class Route {
  path: String;
  method: String;
  handler: (req: Request, res: Response) => void;
}

export const routes: Route[] = [
  { method: "GET", path: "/login", handler: controller.serve('login') },
  { method: "GET", path: "/register", handler: controller.serve('register') },
  { method: "GET", path: "/dashboard", handler: controller.dashboard },
  { method: "GET", path: "/add-feedback", handler: controller.serve('add-feedback') },
  { method: "GET", path: "/users", handler: controller.users },
];
