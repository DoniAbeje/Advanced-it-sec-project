import { uuid } from "uuidv4";
import { render } from "../lib/render";
import { session } from "../lib/session";
import { Request, Response } from "../lib/utils";
import { validateRegister } from "../lib/validator";
import * as repo from "../repositories/user.repository";
import { hash, compare } from "bcrypt";

const saltRound = 10;

export const register = async (req: Request, res: Response) => {
  const body = req["body"];
  const validationResult = validateRegister(body);
  if (validationResult.length) {
    return await render("register", res, { errors: validationResult, ...body });
  }

  const { name, email, password } = body;
  const [rows] = await repo.findUserByEmail(email);

  if (rows.length) {
    return await render("register", res, {
      errors: ["Email taken. Please use another email"],
      ...body,
    });
  }

  const passwordHash = await hash(password, saltRound);
  await repo.register(name, email, passwordHash);
  await render("register", res, { success: ["Registered!!"] });
};

export const login = async (req: Request, res: Response) => {
  const body = req["body"];

  const { email, password } = body;
  const [rows] = await repo.findUserByEmail(email);

  if (!rows.length || !(await compare(password, rows[0].password))) {
    return await render("login", res, {
      errors: ["Incorrect email or password"],
      ...body,
    });
  }

  const id = uuid();
  session.users.push({ sessionId: id, data: rows[0] });

  const maxAge = 86400;
  res.writeHead(302, {
    "Set-Cookie": `sessionId=${id};HttpOnly;max-age=${maxAge}`,
    Location: "/feedbacks",
  });
};

export const logout = async (req: Request, res: Response) => {
  const user = req["user"];

  var index = session.users.findIndex((u) => u.data.id == user.id);
  if (index !== -1) {
    session.users.splice(index, 1);
  }

  res.writeHead(302, {
    Location: "/login",
  });
};

