import Stripe from "stripe";

const keyBuena = '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';
const keyPrueba = 'sk_test_51OxbMG02HGRRuhQL9eiwLKACsMRDcmqj8rcZAjwttOG666b6cxnoH0eL3HtVGVLTunuLZ9io4mClQD6SaW07849n00cWX5Jv7j';

const stripe = new Stripe
(keyPrueba);

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