//Token model
//using references to establish the model that the token is connected to
//every token will insclude the userId

import { createClient } from '@libsql/client';

const db = createClient({
  url: "libsql://prueba-suppiden.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3ODU2MjEsImlkIjoiMTFlZTg4ZjItYmZkZS00NTUxLWE4YjUtMDgyNjcyN2RhNzdkIn0.GPxzS-ONyY7TNPuqnM-lB9BN83nQGT-uIDUmU5EkU6TOsHYFb1m49zYNk6X8JZVf3uVxMSmCQoeeD6z4_0q6Aw"
})

export class Token{

  constructor(){}

  // Función para obtener un token por ID de usuario
    async getToken(id_user) {
      const result = await db.execute({
        sql: "SELECT * FROM tokens2 WHERE userId = :id_user",
        args: { id_user: id_user }
      });
  
      return result.rows[0]; // Asumiendo que `rows` es el arreglo de resultados
    }
  
    async getTokenUser(token) {
      const result = await db.execute({
        sql: "SELECT * FROM tokens2 WHERE token = :token",
        args: { token: token }
      });
  
      const datos_token = result.rows[0];
      
      if (datos_token && Date.now() > new Date(datos_token.validez).getTime()) {
        await this.deleteToken(datos_token.id_user); // Usa 'this' para referenciar otros métodos de la clase
        return false;
      }
  
      if (datos_token) return datos_token.userId;
    }
  
    async addToken(token, validez, id_user) {
      const token_prev = await this.getToken(id_user); // Usa 'this' para llamar a otro método de la clase
      if (token_prev) {
        await this.deleteToken(token_prev.id_user);
      }
  
      const result = await db.execute({
        sql: "INSERT INTO tokens2 (token, timestamp, userId) VALUES (:token, :validez, :id_user)",
        args: { token: token, validez: validez, id_user: id_user }
      });
  
      return result; // Verifica el resultado según la API de `@libsql/client`
    }
  
    async deleteToken(id_user) {
      const result = await db.execute({
        sql: "DELETE FROM tokens2 WHERE userId = :id_user",
        args: { id_user: id_user }
      });
  
      return result; // Verifica el resultado según la API de `@libsql/client`
    }
  }

