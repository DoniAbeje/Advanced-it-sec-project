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

export async function findFeedbacksByUserId(userId: number) {
  const sql = "select * from feedbacks where user_id = ?";
  return await connection.execute(sql, [userId]);
}
