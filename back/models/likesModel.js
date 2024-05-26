import { createClient } from '@libsql/client';

const db = createClient({
  url: "libsql://fitai-suppiden.turso.io",
  authToken: process.env.keyTurso
})


export class Likes{
  constructor(){}

  async addLike(threadId, userId) {{
    const result = await db.execute({
      sql: 'INSERT INTO new_likes (threadId, userId) VALUES (?, ?)', 
    args: [threadId, userId]});
    return result.rows[0];
  }
  }


  async countLikesByThreadId(threadId) {
    const result = await db.execute({
      sql: 'SELECT COUNT(*) AS count FROM new_likes WHERE threadId = ?',
     args: [threadId]});
    return result.rows;
  }

 
}