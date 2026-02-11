import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';
import Stripe from 'https://esm.sh/stripe@17?target=deno';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const stripeKey = Deno.env.get('STRIPE_PRIVATE_KEY');
const prodOrigin = Deno.env.get('AGENT_FIRST_ORIGIN');

if (!supabaseUrl) throw new Error('SUPABASE_URL is not set');

if (!supabaseKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

if (!stripeKey) throw new Error('STRIPE_PRIVATE_KEY is not set');

const validDays = 30;
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
    const { sessionId } = await request.json();
    const { data: purchase, error: purchaseError } = await supabase
      .from('ledger')
      .select('id, status, credits_issued, plan_id, amount')
      .eq('stripe_checkout_session_id', sessionId)
      .single();

    if (purchaseError || !purchase) {
      response = new Response(JSON.stringify({ error: 'Session was not found' }), {
        status: 404,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
      });
    } else if (purchase.status == 'completed') {
      response = new Response(
        JSON.stringify({ status: 'completed', credits: purchase.credits_issued }),
        { headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' } }
      );
    } else {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status == 'paid') {
        const { data: plan, error: planError } = await supabase
          .from('plans')
          .select('cpm')
          .eq('id', purchase.plan_id)
          .single();

        if (planError || !plan) {
          response = new Response(JSON.stringify({ error: 'Plan is missing' }), {
            status: 500,
            headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
          });
        } else {
          const creditsIssued = Math.ceil((purchase.amount / plan.cpm) * 1000);

          await supabase
            .from('ledger')
            .update({
              status: 'completed',
              credits_issued: creditsIssued,
              credits_expire_at: new Date(
                Date.now() + validDays * 24 * 60 * 60 * 1000
              ).toISOString(),
              stripe_payment_intent_id: session.payment_intent
            })
            .eq('id', purchase.id)
            .eq('status', 'pending');

          response = new Response(JSON.stringify({ status: 'completed', credits: creditsIssued }), {
            headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
          });
        }
      } else {
        response = new Response(JSON.stringify({ status: 'pending' }), {
          headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' }
        });
      }
    }
  } else if (request.method == 'OPTIONS') {
    response = new Response(null, { status: 204, headers: corsHeaders(origin) });
  } else {
    response = new Response(null, { status: 405, headers: corsHeaders(origin) });
  }

  return response;
});
