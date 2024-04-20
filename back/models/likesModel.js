import { createClient } from '@libsql/client';

const db = createClient({
  url: "libsql://prueba-suppiden.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3ODU2MjEsImlkIjoiMTFlZTg4ZjItYmZkZS00NTUxLWE4YjUtMDgyNjcyN2RhNzdkIn0.GPxzS-ONyY7TNPuqnM-lB9BN83nQGT-uIDUmU5EkU6TOsHYFb1m49zYNk6X8JZVf3uVxMSmCQoeeD6z4_0q6Aw"
})


export class Likes{
  constructor(){}

  async addLike(threadId, userId) {{
    const result = await db.execute({
      sql: 'INSERT INTO new_likes1 (threadId, userId) VALUES (?, ?)', 
    args: [threadId, userId]});
    return result.rows[0];
  }
  }

  async countLikesByThreadId(threadId) {
    const result = await db.execute({
      sql: 'SELECT COUNT(*) AS count FROM new_likes1 WHERE threadId = ?',
     args: [threadId]});
    return result.rows;
  }

 
}