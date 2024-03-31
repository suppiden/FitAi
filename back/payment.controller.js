import Stripe from "stripe";
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe
(process.env.keyPrueba);

export const createSession = async (req, res) => {
 const sesion = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: 'Laptop',
            description: 'Prueba',
          },
          currency: 'usd',
          unit_amount: 2000 
        },
        quantity: 1
      },
      {
        price_data: {
          product_data: {
            name: 'Cargador',
            description: 'prueba2',
          },
          currency: 'usd',
          unit_amount: 1000,
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/sesion',
    cancel_url: 'http://localhost:3000/failed',
  })
  return res.json(sesion)
}