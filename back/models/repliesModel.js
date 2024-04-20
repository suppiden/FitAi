import { createClient } from '@libsql/client';

const db = createClient({
  url: "libsql://prueba-suppiden.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3ODU2MjEsImlkIjoiMTFlZTg4ZjItYmZkZS00NTUxLWE4YjUtMDgyNjcyN2RhNzdkIn0.GPxzS-ONyY7TNPuqnM-lB9BN83nQGT-uIDUmU5EkU6TOsHYFb1m49zYNk6X8JZVf3uVxMSmCQoeeD6z4_0q6Aw"
})


export class Replies{
  constructor(){}

  async addReply(threadId, userId, content) {
    const result = await db.execute({
      sql: 'INSERT INTO new_replies1 (threadId, userId, content) VALUES (?, ?, ?)',
      args: [threadId, userId, content]});
    return result.rows[0];
  }


  async countRepliesByThreadId(threadId) {
    const result = await db.execute({
     sql: 'SELECT COUNT(*) AS count FROM new_replies1 WHERE threadId = ?', 
     args: [threadId]});
    return parseInt(result.rows[0].count, 10);
  }


  async getRepliesById(threadId) {
    const result = await db.execute({
      sql: 'SELECT * FROM new_replies1 where threadId = ?', 
      args: [threadId]});
    return result.rows;
  }



}