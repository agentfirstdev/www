import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Spinner, useToast } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';

const toastId = 'checkout';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout({ supabaseClient, session, isSessionLoading }) {
  const [clientSecret, setClientSecret] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (session) {
      let isCancelled = false;

      supabaseClient.functions
        .invoke('start-checkout', { body: { priceId: import.meta.env.VITE_STRIPE_PRICE_ID } })
        .then(({ data, error }) => {
          if (!isCancelled) {
            if (error || !data?.clientSecret) {
              if (!toast.isActive(toastId)) {
                toast({
                  id: toastId,
                  position: 'top',
                  status: 'error',
                  description: ui.errorMessage,
                  duration: null,
                  isClosable: true
                });
              }

              console.error(error ?? 'clientSecret not returned');
            } else {
              setClientSecret(data.clientSecret);
            }
          }
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [supabaseClient, session, toast]);

  return session && !isSessionLoading ? (
    clientSecret ? (
      <>
        <Heading variant='secondary' size='lg'>
          {ui.checkoutLabel}
        </Heading>
        <Flex justify='center' align='start' flex={1}>
          <Box w={ui.secondaryWidth} maxW={ui.checkoutWidth}>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </Box>
        </Flex>
      </>
    ) : (
      <Flex justify='center' align='center' flex={1}>
        <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
      </Flex>
    )
  ) : isSessionLoading ? (
    <Flex justify='center' align='center' flex={1}>
      <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
    </Flex>
  ) : (
    <>
      <Heading variant='secondary' size='lg'>
        {ui.loginLabel}
      </Heading>
      <Flex justify='center' align='start' flex={1}>
        <Auth
          supabaseClient={supabaseClient}
          providers={[]}
          view='magic_link'
          redirectTo={ui.checkoutUrl}
          localization={{
            variables: { magic_link: { email_input_label: '', button_label: ui.magicLabel } }
          }}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'var(--chakra-colors-accent-secondary)',
                  brandAccent: 'var(--chakra-colors-chakra-inverse-bg)',
                  inputPlaceholder: 'var(--chakra-colors-chakra-label-color)'
                }
              }
            },
            style: {
              container: { gap: 0, width: ui.secondaryWidth },
              label: { marginBottom: 0 },
              input: {
                borderRadius: 'var(--chakra-radii-md)',
                borderColor: 'var(--chakra-colors-chakra-border-color)',
                background: 'var(--chakra-colors-chakra-inset-bg)',
                height: ui.controlDimension,
                font: 'var(--chakra-fontSizes-lg) var(--chakra-fonts-body)',
                color: 'var(--chakra-colors-chakra-body-text)'
              },
              button: {
                margin: ui.loginButtonMargin,
                border: ui.buttonBorder,
                height: ui.controlDimension,
                font: 'var(--chakra-fontSizes-lg) var(--chakra-fonts-body)',
                fontWeight: 'var(--chakra-fontWeights-bold)',
                transition: ui.transition
              }
            }
          }}
          showLinks={false}
        />
      </Flex>
    </>
  );
}
