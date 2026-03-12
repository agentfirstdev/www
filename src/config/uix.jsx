import { forwardRef } from 'react';
import { Box, HStack, Heading, Text, Link } from '@chakra-ui/react';

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
          From the developer of The New York Times’s privacy tool of choice
          <sup><Link variant='citation' href={`#${ui.citationsId}`}>1</Link></sup>
          {' & Proxyway’s benchmark-topping proxy provider'}
          <sup><Link variant='citation' href={`#${ui.citationsId}`}>2</Link></sup>
        </Text>
      </HStack>
      <Text variant='audience'>For data teams · For agent builders · For proxy providers</Text>
      <Heading as='h1' variant='tagline' fontSize={ui.taglineFontSize}>
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
      <Text variant='cta'>
        Search & browse with automatic captcha solving & geo-targeting to 190+ countries — pay only
        for successful requests
      </Text>
    </>
  );
});
