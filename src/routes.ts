import { Request, Response } from "./lib/utils";
import * as controller from "./controllers/controller";
import * as userController from "./controllers/user.controller";

export class Route {
  path: String;
  method: String;
  auth?: boolean = false;
  csrf?: boolean = false;
  role? = null;
  handler: (req: Request, res: Response) => void;
}

export const routes: Route[] = [
  { method: "GET", path: "/login", handler: controller.serve("login") },
  { method: "POST", path: "/login", handler: userController.login },
  {
    method: "POST",
    path: "/logout",
    handler: userController.logout,
    auth: true,
    csrf: true,
  },

  { method: "GET", path: "/register", handler: controller.serve("register") },
  { method: "POST", path: "/register", handler: userController.register },

  { method: "GET", path: "/dashboard", handler: controller.dashboard },
  {
    method: "GET",
    path: "/add-feedback",
    handler: controller.serve("add-feedback"),
  },
  { method: "GET", path: "/edit-feedback", handler: controller.editFeedback },
  // admin
  { method: "GET", path: "/users", handler: controller.users },
  {
    method: "GET",
    path: "/feedbacks",
    handler: controller.feedbacks,
    auth: true,
  },
];
