import { useState } from 'react';
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

export default function Pricing({ isCartLoading, addToCart }) {
  const [dollarAmount, setDollarAmount] = useState('');
  const parsedAmount = parseFloat(dollarAmount);
  const isAmountValid = Number.isInteger(parsedAmount) && parsedAmount >= ui.minPurchaseAmount;

  return (
    <Flex mt={2} w={ui.secondaryTextboxWidth} direction='column' gap={4}>
      <InputGroup>
        <InputLeftElement
          h={ui.controlDimension}
          fontSize='lg'
          color={dollarAmount ? 'chakra-body-text' : 'chakra-placeholder-color'}
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
            _focus={{
              borderColor: 'transparent',
              shadow: `${ui.outlineStyle} var(--chakra-colors-bg-button)`
            }}
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
        {`Buy ${isAmountValid ? `${calculateCredits(parsedAmount)} ` : ''}credits`}
      </Button>
    </Flex>
  );
}
