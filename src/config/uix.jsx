import { forwardRef } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import * as ui from './ui';

// Strings
export const Tagline = forwardRef(function Tagline(props, ref) {
  return (
    <>
      <Heading as='h1' variant='tagline' fontSize={ui.taglineFontSize}>
        {'We make '}
        <Box as='span' display='inline-block' position='relative' textAlign='left'>
          <Text fontSize={ui.taglineFontSize} visibility='hidden' pointerEvents='none'>
            (HTTP)
          </Text>
          <Text
            ref={ref}
            position='absolute'
            inset='0'
            bgClip='text'
            fontSize={ui.taglineFontSize}
            _light={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.cornflowerBlue}, ${ui.creativeBlue})`
            }}
            _dark={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.cornflowerBlue}, ${ui.creativeBlue})`
            }}
          ></Text>
        </Box>
        {' fetch happen'}
      </Heading>
      <Text variant='cta'>Enhance your agent in minutes with world-class research abilities</Text>
    </>
  );
});
