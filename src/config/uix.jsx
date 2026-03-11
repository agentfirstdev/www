import { forwardRef } from 'react';
import { Box, HStack, Heading, Text } from '@chakra-ui/react';

import * as ui from './ui';

// Strings
export const Tagline = forwardRef(function Tagline(props, ref) {
  return (
    <>
      <HStack
        border='1px solid'
        rounded='full'
        px={3.5}
        py={1.5}
        color='bg-button'
        _light={{ borderColor: `rgba(74, 109, 229, 0.24)`, bg: `rgba(74, 109, 229, 0.08)` }}
        _dark={{ borderColor: `rgba(121, 153, 247, 0.24)`, bg: `rgba(121, 153, 247, 0.08)` }}
      >
        <Box
          rounded='full'
          w={1.5}
          h={1.5}
          _light={{ bg: ui.royalBlue, boxShadow: `0 0 8px ${ui.royalBlue}` }}
          _dark={{ bg: ui.cornflowerBlue, boxShadow: `0 0 8px ${ui.cornflowerBlue}` }}
        />
        <Text variant='pill'>
          From the developer of the world’s most-used privacy tools<sup>1</sup> & Proxyway’s
          most-performant proxy provider<sup>2</sup>
        </Text>
      </HStack>
      <Text variant='audience'>For data teams · For agent builders · For proxy providers</Text>
      <Heading as='h1' variant='tagline' fontSize={ui.taglineFontSize}>
        {'Upgrade your product with '}
        <Box as='span' display='inline-block' position='relative' textAlign='left'>
          <Text fontSize={ui.taglineFontSize} visibility='hidden' pointerEvents='none'>
            reliable access
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
        {' to any site'}
      </Heading>
      <Text variant='cta'>
        Search & browsing API, automatic captcha solving, & geo-targeting to 190+ countries — you
        pay only for successful calls
      </Text>
    </>
  );
});
