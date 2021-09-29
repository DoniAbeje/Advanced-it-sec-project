import { connection } from "../lib/db-connection";

export async function register(name: string, email: string, password: string) {
  const sql = "insert into users (name, email, password) values(?, ?, ?);";
  return await connection.execute(sql, [name, email, password]);
}

export async function login(email: string, password: string) {
  const sql = "select * from users where email=? and password=?;";
  return await connection.execute(sql, [email, password]);
}

export async function disable(id: number) {
  const sql = "update users set disabled=true where id=?;";
  return await connection.execute(sql, [id]);
}

export async function enable(id: number) {
  const sql = "update users set disabled=false where id=?;";
  return await connection.execute(sql, [id]);
}

export async function findUserByEmail(email: string) {
  const sql = "select * from users where email=?;";
  return await connection.execute(sql, [email]);
}

export async function findAll() {
  const sql = "select * from users where 1;";
  return await connection.execute(sql,[]);
}
