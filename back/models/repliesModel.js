import { createClient } from '@libsql/client';

const db = createClient({
  url: "libsql://fitai-suppiden.turso.io",
  authToken: process.env.keyTurso
})


export class Replies{
  constructor(){}

  async addReply(threadId, userId, content) {
    const result = await db.execute({
      sql: 'INSERT INTO new_replies (threadId, userId, content) VALUES (?, ?, ?)',
      args: [threadId, userId, content]});
    return result.rows[0];
  }


  async countRepliesByThreadId(threadId) {
    const result = await db.execute({
     sql: 'SELECT COUNT(*) AS count FROM new_replies WHERE threadId = ?', 
     args: [threadId]});
    return parseInt(result.rows[0].count, 10);
  }


  async getRepliesById(threadId) {
    const result = await db.execute({
      sql: 'SELECT * FROM new_replies where threadId = ?', 
      args: [threadId]});
    return result.rows;
  }



}