import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
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

export default forwardRef(function Pricing({ isCartLoading, addToCart, textboxBackground }, ref) {
  const textbox = useRef();
  const [dollarAmount, setDollarAmount] = useState('');
  const parsedAmount = parseFloat(dollarAmount);
  const isAmountValid = Number.isInteger(parsedAmount) && parsedAmount >= ui.minPurchaseAmount;
  const handleSubmit = () => {
    if (textbox.current?.reportValidity()) addToCart(parsedAmount);
  };

  useEffect(() => {
    if (textbox.current) {
      textbox.current.setCustomValidity(
        dollarAmount && !isAmountValid ? `Please enter at least $${ui.minPurchaseAmount}.` : ''
      );
    }
  }, [dollarAmount, isAmountValid]);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        textbox.current?.focus();
      },
      submit: handleSubmit,
      isAmountValid
    };
  }, [parsedAmount, isAmountValid, addToCart]);

  return (
    <Flex w={ui.secondaryTextboxWidth} direction='column' gap={4}>
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
          // min={ui.minPurchaseAmount}
          value={dollarAmount}
          onChange={setDollarAmount}
          isValidCharacter={(character) => {
            return character >= '0' && character <= '9';
          }}
        >
          <NumberInputField
            ref={textbox}
            {...(textboxBackground && { bg: textboxBackground })}
            pl={ui.purchaseAmountPadding}
            h={ui.controlDimension}
            fontSize='lg'
            placeholder={`${ui.minPurchaseAmount} minimum`}
            required
            _focus={{
              borderColor: 'transparent',
              shadow: `${ui.outlineStyle} var(--chakra-colors-bg-button)`
            }}
          />
        </NumberInput>
      </InputGroup>
      <Button h={ui.controlDimension} isLoading={isCartLoading} onClick={handleSubmit}>
        {`Buy ${isAmountValid ? `${calculateCredits(parsedAmount)} ` : ''}credits`}
      </Button>
    </Flex>
  );
});
