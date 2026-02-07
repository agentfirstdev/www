import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Button,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

import * as ui from '../config/ui';
import Login from '../components/Login';

const toastId = 'checkout';
const creditsPerDollar = 1000 / ui.cpm;
const discountedCreditsPerDollar = 1000 / ui.discountedCpm;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const calculateCredits = (dollars) => {
  return Math.ceil(
    Math.floor(dollars) *
      (dollars < ui.discountedPurchaseThreshold ? creditsPerDollar : discountedCreditsPerDollar)
  ).toLocaleString();
};

export default function Checkout({ supabaseClient, session, isSessionLoading }) {
  const [amount, setAmount] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const parsedAmount = parseFloat(amount);
  const isAmountValid = Number.isInteger(parsedAmount) && parsedAmount >= ui.minPurchaseAmount;
  const addToCart = () => {
    setIsLoading(true);

    supabaseClient.functions
      .invoke('start-checkout', { body: { amount: parsedAmount } })
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

  return session && !isSessionLoading ? (
    <>
      <Heading variant='secondary' size='lg'>
        {ui.purchaseLabel}
      </Heading>
      {clientSecret ? (
        <Flex justify='center' align='start' flex={1}>
          <Box w={ui.secondaryWidth} maxW={ui.checkoutWidth}>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </Box>
        </Flex>
      ) : (
        <Flex justify='center' align='start' flex={1}>
          <Flex mt={2} w={ui.secondaryTextboxWidth} direction='column' gap={4}>
            <InputGroup>
              <InputLeftElement
                h={ui.controlDimension}
                fontSize='lg'
                color={amount ? 'chakra-body-text' : 'chakra-label-color'}
                pointerEvents='none'
              >
                $
              </InputLeftElement>
              <NumberInput
                w='100%'
                precision={ui.purchaseDecimalPlaces}
                min={ui.minPurchaseAmount}
                value={amount}
                onChange={setAmount}
                isValidCharacter={(character) => {
                  return character >= '0' && character <= '9';
                }}
              >
                <NumberInputField
                  pl={ui.purchaseAmountPadding}
                  h={ui.controlDimension}
                  fontSize='lg'
                  placeholder={`${ui.minPurchaseAmount} minimum`}
                />
              </NumberInput>
            </InputGroup>
            <Button
              h={ui.controlDimension}
              isDisabled={!isAmountValid}
              isLoading={isLoading}
              onClick={addToCart}
            >
              {`Add${isAmountValid ? ` ${calculateCredits(parsedAmount)}` : ''} credits`}
            </Button>
          </Flex>
        </Flex>
      )}
    </>
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
