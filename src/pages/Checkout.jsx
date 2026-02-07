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
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';

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
              container: { gap: 0, width: ui.secondaryTextboxWidth },
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
