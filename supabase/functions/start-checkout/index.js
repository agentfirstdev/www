import Stripe from 'https://esm.sh/stripe@17?target=deno';

const stripeKey = Deno.env.get('STRIPE_PRIVATE_KEY');

if (!stripeKey) throw new Error('STRIPE_PRIVATE_KEY not set');

const prodOrigin = Deno.env.get('AGENT_FIRST_ORIGIN');
const devOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const allowedOrigins = new Set(prodOrigin ? [prodOrigin, ...devOrigins] : devOrigins);
const stripe = new Stripe(stripeKey, { apiVersion: '2025-04-30.basil' });
const corsHeaders = (origin) => {
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info'
  };
};

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  let response;

  if (request.method == 'POST') {
    response = new Response(
      JSON.stringify({
        clientSecret: (
          await stripe.checkout.sessions.create({
            mode: 'payment',
            ui_mode: 'embedded',
            line_items: [{ price: (await request.json()).priceId, quantity: 1 }],
            return_url: `${origin}/dashboard?session={CHECKOUT_SESSION_ID}`
          })
        ).client_secret
      }),
      { headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
    );
  } else if (request.method == 'OPTIONS') {
    response = new Response(null, { status: 204, headers: corsHeaders(origin) });
  } else {
    response = new Response(null, { status: 405 });
  }

  return response;
});
