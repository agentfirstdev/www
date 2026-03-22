import { forwardRef } from 'react';
import { Box, Flex, HStack, Heading, Text, Link, Button } from '@chakra-ui/react';

import * as ui from './ui';

// Strings
export const Tagline = forwardRef(function Tagline(props, ref) {
  return (
    <>
      <HStack
        borderWidth='1px'
        rounded='full'
        px={3.5}
        py={1.5}
        _light={{ borderColor: ui.blueAlpha, bg: ui.lightBlueAlpha }}
        _dark={{ borderColor: ui.grayAlpha, bg: ui.lightGrayAlpha }}
      >
        <Box
          rounded='full'
          w={1.5}
          h={1.5}
          _light={{ bg: ui.royalBlue, shadow: `0 0 8px ${ui.royalBlue}` }}
          _dark={{ bg: ui.cornflowerBlue, shadow: `0 0 8px ${ui.cornflowerBlue}` }}
        />
        <Text variant='pill' display={{ base: 'none', md: 'inline' }}>
          From the developer of the world’s most-used privacy tools
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>1</sup>
          </Link>
          {' & Proxyway’s benchmark-topping proxy provider'}
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>2</sup>
          </Link>
        </Text>
        <Text variant='pill' display={{ base: 'inline', md: 'none' }}>
          From the developer of Proxyway’s benchmark-topping proxy
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>1</sup>
          </Link>
        </Text>
      </HStack>
      <Text variant='audience' display={{ base: 'none', sm: 'block' }} mt={ui.xxsMargin}>
        {ui.audienceLabel}
      </Text>
      <Text variant='audience' display={{ base: 'block', sm: 'none' }} mt={ui.xxsMargin}>
        {ui.shortAudienceLabel}
      </Text>
      <Heading as='h1' variant='tagline' mt={6} fontSize={ui.altTaglineFontSize}>
        {'Upgrade your product with '}
        <Box as='span' display='inline-block' position='relative' textAlign='left'>
          <Text fontSize={ui.altTaglineFontSize} visibility='hidden' pointerEvents='none'>
            reliable access
          </Text>
          <Text
            ref={ref}
            position='absolute'
            inset={0}
            bgClip='text'
            fontSize={ui.altTaglineFontSize}
            _light={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.cornflowerBlue}, ${ui.creativeBlue})`
            }}
            _dark={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.creativeBlue}, ${ui.cornflowerBlue})`
            }}
          ></Text>
        </Box>
        {' to any site'}
      </Heading>
      <Text variant='altheading' display={{ base: 'none', lg: 'inline' }} my={ui.xxsMargin}>
        {ui.altSubheadingLabel}
      </Text>
      <Text variant='altheading' display={{ base: 'inline', lg: 'none' }} my={ui.xxsMargin}>
        {ui.altShortSubheadingLabel}
      </Text>
      <Flex mt={ui.lgMargin} gap={ui.xxsMargin}>
        <Button
          size={{ base: 'md', sm: 'lg' }}
          h={ui.ctaHeight}
          tabIndex={1}
          onClick={props.onCtaPress}
        >
          <Text as='span' display={{ base: 'none', md: 'inline' }}>
            {ui.ctaLabel}
          </Text>
          <Text as='span' display={{ base: 'inline', md: 'none' }} fontSize='inherit'>
            {ui.shortCtaLabel}
          </Text>
        </Button>
        <Button
          as='a'
          variant='outline'
          w='auto'
          h={ui.ctaHeight}
          fontSize={{ base: 'md', sm: 'lg' }}
          href={ui.docUrl}
        >
          {ui.secondaryCtaLabel}
        </Button>
      </Flex>
    </>
  );
});
