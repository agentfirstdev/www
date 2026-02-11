import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';
import Stripe from 'https://esm.sh/stripe@17?target=deno';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const stripeKey = Deno.env.get('STRIPE_PRIVATE_KEY');
const stripeSecret = Deno.env.get('STRIPE_SIGNING_SECRET');

if (!supabaseUrl) throw new Error('SUPABASE_URL is not set');

if (!supabaseKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

if (!stripeKey) throw new Error('STRIPE_PRIVATE_KEY is not set');

if (!stripeSecret) throw new Error('STRIPE_SIGNING_SECRET not set');

const validDays = 30;
const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(stripeKey, { apiVersion: '2025-09-30.clover' });

Deno.serve(async (request) => {
  let response;

  if (request.method == 'POST') {
    try {
      const event = await stripe.webhooks.constructEventAsync(
        await request.text(),
        request.headers.get('stripe-signature'),
        stripeSecret
      );

      if (event.type == 'checkout.session.completed') {
        const { data: purchase, error: purchaseError } = await supabase
          .from('ledger')
          .select('id, plan_id, amount')
          .eq('status', 'pending')
          .eq('stripe_checkout_session_id', event.data.object.id)
          .single();

        if (purchaseError || !purchase) {
          response = new Response('Purchase was not found or already completed\n', { status: 200 });
        } else {
          const { data: plan, error: planError } = await supabase
            .from('plans')
            .select('cpm')
            .eq('id', purchase.plan_id)
            .single();

          if (planError || !plan) {
            response = new Response('Plan is missing\n', { status: 500 });
          } else {
            await supabase
              .from('ledger')
              .update({
                status: 'completed',
                credits_issued: Math.ceil((purchase.amount / plan.cpm) * 1000),
                credits_expire_at: new Date(
                  Date.now() + validDays * 24 * 60 * 60 * 1000
                ).toISOString(),
                stripe_payment_intent_id: event.data.object.payment_intent
              })
              .eq('id', purchase.id)
              .eq('status', 'pending');

            response = new Response(JSON.stringify({ received: true }), {
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } else {
        response = new Response(JSON.stringify({ received: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch {
      response = new Response('Signature is invalid\n', { status: 400 });
    }
  } else {
    response = new Response(null, { status: 405 });
  }

  return response;
});
