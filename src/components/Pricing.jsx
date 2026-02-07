import {
  Flex,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Button
} from '@chakra-ui/react';

import * as ui from '../config/ui';

const creditsPerDollar = 1000 / ui.cpm;
const discountedCreditsPerDollar = 1000 / ui.discountedCpm;
const calculateCredits = (dollars) => {
  return Math.ceil(
    Math.floor(dollars) *
      (dollars < ui.discountedPurchaseThreshold ? creditsPerDollar : discountedCreditsPerDollar)
  ).toLocaleString();
};

export default function Pricing({ dollarAmount, setDollarAmount, isCartLoading, addToCart }) {
  const parsedAmount = parseFloat(dollarAmount);
  const isAmountValid = Number.isInteger(parsedAmount) && parsedAmount >= ui.minPurchaseAmount;

  return (
    <Flex mt={2} w={ui.secondaryTextboxWidth} direction='column' gap={4}>
      <InputGroup>
        <InputLeftElement
          h={ui.controlDimension}
          fontSize='lg'
          color={dollarAmount ? 'chakra-body-text' : 'chakra-label-color'}
          pointerEvents='none'
        >
          $
        </InputLeftElement>
        <NumberInput
          w='100%'
          precision={ui.purchaseDecimalPlaces}
          min={ui.minPurchaseAmount}
          value={dollarAmount}
          onChange={setDollarAmount}
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
        isLoading={isCartLoading}
        onClick={() => {
          addToCart(parsedAmount);
        }}
      >
        {`Add${isAmountValid ? ` ${calculateCredits(parsedAmount)}` : ''} credits`}
      </Button>
    </Flex>
  );
}
