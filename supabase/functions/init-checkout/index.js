import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';
import Stripe from 'https://esm.sh/stripe@17?target=deno';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const stripeKey = Deno.env.get('STRIPE_PRIVATE_KEY');
const prodOrigin = Deno.env.get('AGENT_FIRST_ORIGIN');

if (!supabaseUrl) throw new Error('SUPABASE_URL is not set');

if (!supabaseKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

if (!stripeKey) throw new Error('STRIPE_PRIVATE_KEY is not set');

const baseSlug = 'base';
const discountedSlug = 'discounted_base';
const discountedThreshold = 100;
const minAmount = 10;
const devOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const allowedOrigins = new Set(prodOrigin ? [prodOrigin, ...devOrigins] : devOrigins);
const corsHeaders = (origin) => {
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info'
  };
};
const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(stripeKey, { apiVersion: '2025-09-30.clover' });

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  let response;

  if (request.method == 'POST') {
    const { amount, background } = await request.json();

    if (Number.isInteger(amount) && amount >= minAmount) {
      const token = request.headers.get('authorization')?.replace('Bearer ', '');
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser(token);

      if (userError || !user) {
        response = new Response(JSON.stringify({ error: 'Session is invalid' }), {
          status: 401,
          headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
        });
      } else {
        const { data: account, error: accountError } = await supabase
          .from('accounts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (accountError || !account) {
          response = new Response(JSON.stringify({ error: 'Account was not found' }), {
            status: 404,
            headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
          });
        } else {
          const { data: plan, error: planError } = await supabase
            .from('plans')
            .select('id, cpm')
            .eq('name', amount >= discountedThreshold ? discountedSlug : baseSlug)
            .single();

          if (planError || !plan) {
            response = new Response(JSON.stringify({ error: 'Plan is missing' }), {
              status: 500,
              headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
            });
          } else {
            const session = await stripe.checkout.sessions.create({
              mode: 'payment',
              ui_mode: 'embedded',
              ...(background && { branding_settings: { background_color: background } }),
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    unit_amount: amount * 100,
                    product_data: {
                      name:
                        Math.ceil(((amount * 100) / plan.cpm) * 1000).toLocaleString() +
                        ' Agent First API credits'
                    }
                  },
                  quantity: 1
                }
              ],
              return_url: `${origin}/dashboard?session={CHECKOUT_SESSION_ID}`
            });

            await supabase
              .from('ledger')
              .insert({
                account_id: account.id,
                entry: 'purchase',
                status: 'pending',
                plan_id: plan.id,
                amount: amount * 100,
                stripe_checkout_session_id: session.id
              });

            response = new Response(JSON.stringify({ clientSecret: session.client_secret }), {
              headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
            });
          }
        }
      }
    } else {
      response = new Response(
        JSON.stringify({ error: `Minimum purchase is $${minAmount} in whole dollars` }),
        { status: 400, headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
      );
    }
  } else if (request.method == 'OPTIONS') {
    response = new Response(null, { status: 204, headers: corsHeaders(origin) });
  } else {
    response = new Response(null, { status: 405, headers: corsHeaders(origin) });
  }

  return response;
});
