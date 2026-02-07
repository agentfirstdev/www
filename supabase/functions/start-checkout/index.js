import Stripe from 'https://esm.sh/stripe@17?target=deno';

const cpm = 1;
const discountedCpm = 0.9;
const creditsPerDollar = 1000 / cpm;
const discountedCreditsPerDollar = 1000 / discountedCpm;
const discountedThreshold = 100;
const minAmount = 10;
const stripeKey = Deno.env.get('STRIPE_PRIVATE_KEY');

if (!stripeKey) throw new Error('STRIPE_PRIVATE_KEY not set');

const prodOrigin = Deno.env.get('AGENT_FIRST_ORIGIN');
const devOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const allowedOrigins = new Set(prodOrigin ? [prodOrigin, ...devOrigins] : devOrigins);
const corsHeaders = (origin) => {
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info'
  };
};
const stripe = new Stripe(stripeKey, { apiVersion: '2025-04-30.basil' });
const calculateCredits = (dollars) => {
  return Math.ceil(
    Math.floor(dollars) *
      (dollars < discountedThreshold ? creditsPerDollar : discountedCreditsPerDollar)
  ).toLocaleString();
};

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  let response;

  if (request.method == 'POST') {
    const { amount } = await request.json();

    if (!isNaN(amount) && amount >= minAmount) {
      response = new Response(
        JSON.stringify({
          clientSecret: (
            await stripe.checkout.sessions.create({
              mode: 'payment',
              ui_mode: 'embedded',
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    unit_amount: Math.round(amount * 100),
                    product_data: { name: `${calculateCredits(amount)} Agent First API credits` }
                  },
                  quantity: 1
                }
              ],
              return_url: `${origin}/dashboard?session={CHECKOUT_SESSION_ID}`
            })
          ).client_secret
        }),
        { headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
      );
    } else {
      response = new Response(`Minimum purchase is $${minAmount}\n`, {
        status: 400,
        headers: corsHeaders(origin)
      });
    }
  } else if (request.method == 'OPTIONS') {
    response = new Response(null, { status: 204, headers: corsHeaders(origin) });
  } else {
    response = new Response(null, { status: 405 });
  }

  return response;
});
