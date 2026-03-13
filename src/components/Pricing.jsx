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

export default forwardRef(function Pricing({ shouldInvertColors, isCartLoading, addToCart }, ref) {
  const textbox = useRef();
  const [dollarAmount, setDollarAmount] = useState('');
  const parsedAmount = parseFloat(dollarAmount);
  const isAmountValid = Number.isInteger(parsedAmount) && parsedAmount >= ui.minPurchaseAmount;
  const reportValidity = () => {
    return textbox.current?.reportValidity();
  };
  const handleSubmit = () => {
    if (reportValidity()) addToCart(parsedAmount);
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
      reportValidity,
      submit: handleSubmit,
      focus: () => {
        textbox.current?.focus();
      },
      isFocused: () => {
        return document.activeElement == textbox.current;
      },
      hasAmount: !!parsedAmount,
      isAmountValid
    };
  }, [parsedAmount, isAmountValid, addToCart]);

  return (
    <Flex w={ui.secondaryTextboxWidth} maxW='100%' direction='column' gap={4}>
      <InputGroup>
        <InputLeftElement
          h={ui.controlDimension}
          fontSize='lg'
          color={
            shouldInvertColors
              ? dollarAmount
                ? 'fg-button'
                : 'whiteAlpha.700'
              : dollarAmount
                ? 'chakra-body-text'
                : 'chakra-placeholder-color'
          }
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
            pl={ui.purchaseAmountPadding}
            h={ui.controlDimension}
            fontSize='lg'
            placeholder={`${ui.minPurchaseAmount} minimum`}
            required
            onClick={(event) => {
              event.stopPropagation();
            }}
            _focus={{
              borderColor: 'transparent',
              shadow: shouldInvertColors ? ui.outline('fg-button') : ui.outline('bg-button')
            }}
            {...(shouldInvertColors && {
              borderColor: 'whiteAlpha.500',
              bg: 'whiteAlpha.400',
              color: 'fg-button',
              _placeholder: { color: 'whiteAlpha.700' },
              _hover: { borderColor: 'whiteAlpha.700', _focus: { borderColor: 'transparent' } }
            })}
          />
        </NumberInput>
      </InputGroup>
      <Button
        h={ui.controlDimension}
        isLoading={isCartLoading}
        onClick={handleSubmit}
        {...(shouldInvertColors && {
          bg: 'fg-button',
          color: 'bg-button',
          _hover: { _focus: { shadow: ui.outlineInset('bg-button', 'whiteAlpha-700') } },
          _focus: { shadow: ui.outlineInset('bg-button', 'whiteAlpha-700') },
          _light: { _hover: { bg: 'whiteAlpha.700' }, _active: { bg: 'whiteAlpha.700' } },
          _dark: { _hover: { bg: 'whiteAlpha.600' }, _active: { bg: 'whiteAlpha.600' } }
        })}
      >
        {`Buy ${isAmountValid ? `${calculateCredits(parsedAmount)} ` : ''}credits`}
      </Button>
    </Flex>
  );
});
