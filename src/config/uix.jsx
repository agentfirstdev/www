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
          _light={{ bg: ui.royalBlue, boxShadow: `0 0 8px ${ui.royalBlue}` }}
          _dark={{ bg: ui.cornflowerBlue, boxShadow: `0 0 8px ${ui.cornflowerBlue}` }}
        />
        <Text variant='pill'>
          From the developer of the world’s most-used privacy tools
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>1</sup>
          </Link>
          {' & Proxyway’s benchmark-topping proxy provider'}
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>2</sup>
          </Link>
        </Text>
      </HStack>
      <Text variant='audience' mt={ui.xxsMargin}>
        For data teams · For agent builders · For proxy providers
      </Text>
      <Heading as='h1' variant='tagline' mt={6} fontSize={ui.taglineFontSize}>
        <Box as='span' display='inline-block' position='relative' textAlign='left'>
          <Text fontSize={ui.taglineFontSize} visibility='hidden' pointerEvents='none'>
            Reliable access
          </Text>
          <Text
            ref={ref}
            position='absolute'
            inset={0}
            bgClip='text'
            fontSize={ui.taglineFontSize}
            _light={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.cornflowerBlue}, ${ui.creativeBlue})`
            }}
            _dark={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.creativeBlue}, ${ui.cornflowerBlue})`
            }}
          ></Text>
        </Box>
        {' to every public website'}
      </Heading>
      <Text variant='cta' my={ui.xxsMargin}>
        Search & browse with automatic captcha solving & geo-targeting to 190+ countries — pay only
        for successful requests
      </Text>
      <Flex mt={ui.lgMargin} gap={ui.xxsMargin}>
        <Button size='lg' h={ui.ctaHeight} tabIndex={1} onClick={props.onCtaPress}>
          {ui.ctaLabel}
        </Button>
        <Button as='a' variant='outline' size='lg' w='auto' h={ui.ctaHeight} href={ui.docUrl}>
          {ui.secondaryCtaLabel}
        </Button>
      </Flex>
    </>
  );
});
