import Stripe from "stripe";
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe
(process.env.keyPrueba);

export const createSession = async (req, res) => {
  const { plan } = req.body; // Recibe el plan desde el frontend

  // Define los precios y otros detalles según el plan recibido
  let priceData;
  switch (plan.title) {
    case 'Basic Plan':
      priceData = {
        product_data: {
          name: plan.title,
          description: plan.description,
        },
        currency: 'usd',
        unit_amount: 999,
      };
      break;
    case 'Premium Plan':
      priceData = {
        product_data: {
          name: plan.title,
          description: plan.description,
        },
        currency: 'usd',
        unit_amount: 1999,
      };
      break;
    case 'Pro Plan':
      priceData = {
        product_data: {
          name: plan.title,
          description: plan.description,
        },
        currency: 'usd',
        unit_amount: 2999,
      };
      break;
    default:
      return res.status(400).send('Plan not recognized');
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: priceData,
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/successPay',
    cancel_url: 'http://localhost:3000',
  });

  return res.json({ url: session.url });
};