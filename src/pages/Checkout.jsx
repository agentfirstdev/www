import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Box, Flex, Heading, Spinner, useToast } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

import * as ui from '../config/ui';
import Pricing from '../components/Pricing';
import Login from '../components/Login';

const toastId = 'checkout';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout({ supabaseClient, session, isSessionLoading }) {
  const hasStartedCheckout = useRef(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryString] = useSearchParams();
  const toast = useToast();
  const dollarAmount = parseFloat(queryString.get(ui.purchaseKey));
  const isAmountValid = Number.isInteger(dollarAmount) && dollarAmount >= ui.minPurchaseAmount;
  const addToCart = (amount) => {
    setIsLoading(true);

    supabaseClient.functions
      .invoke('start-checkout', { body: { amount } })
      .then(({ data, error }) => {
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

        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (session && isAmountValid && !hasStartedCheckout.current) {
      hasStartedCheckout.current = true;
      addToCart(dollarAmount);
    }
  }, [session, isAmountValid, dollarAmount]);

  return session && !isSessionLoading ? (
    clientSecret ? (
      <>
        {/* <Heading variant='secondary' size='lg'>
          {ui.purchaseLabel}
        </Heading> */}
        <Flex pt={ui.smMargin} pb={5} justify='center' align='start' flex={1}>
          <Box w={ui.secondaryWidth} maxW={ui.checkoutWidth}>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </Box>
        </Flex>
      </>
    ) : isLoading ? (
      <Flex pt={7} pb={5} justify='center' align='center' flex={1}>
        <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
      </Flex>
    ) : (
      <>
        {/* <Heading variant='secondary' size='lg'>
          {ui.purchaseLabel}
        </Heading> */}
        <Flex pt={7} pb={5} justify='center' align='center' flex={1}>
          <Pricing isCartLoading={isLoading} addToCart={addToCart} />
        </Flex>
      </>
    )
  ) : isSessionLoading ? (
    <Flex pt={7} pb={5} justify='center' align='center' flex={1}>
      <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
    </Flex>
  ) : (
    <>
      {/* <Heading variant='secondary' size='lg'>
        {ui.loginLabel}
      </Heading> */}
      <Flex pt={ui.smMargin} pb={1} justify='center' align='center' flex={1}>
        <Login
          supabaseClient={supabaseClient}
          width={ui.secondaryTextboxWidth}
          font='var(--chakra-fontSizes-lg) var(--chakra-fonts-body)'
          textboxBackground='var(--chakra-colors-chakra-inset-bg)'
          redirectUrl={ui.checkoutUrl}
        />
      </Flex>
    </>
  );
}
