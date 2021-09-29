import { connection } from "../lib/db-connection";

export async function addFeedback(
  name: string,
  email: string,
  comment: string,
  userId: number
) {
  const sql =
    "insert into feedbacks (name, email, comment, user_id) values(?, ?, ?, ?);";
  return await connection.execute(sql, [name, email, comment, userId]);
}

export async function updateFeedback(
  name: string,
  email: string,
  comment: string,
  id: string
) {
  const sql = "update feedbacks set name= ?, email= ?, comment= ? where id = ?;";
  return await connection.execute(sql, [name, email, comment, id]);
}

export async function findFeedbacksByUserId(userId: number) {
  const sql = "select * from feedbacks where user_id = ?";
  return await connection.execute(sql, [userId]);
}

export async function findFeedbackIdAndUserId(id, userId: number) {
  const sql = "select * from feedbacks where id = ? and user_id = ?";
  return await connection.execute(sql, [id, userId]);
}

export async function findAll() {
  const sql = "select * from feedbacks where 1";
  return await connection.execute(sql, []);
}
