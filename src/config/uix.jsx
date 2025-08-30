import { Heading, Text } from '@chakra-ui/react';

import * as ui from './ui';

// Strings
export const Tagline = () => {
  return (
    <>
      <Heading as='h1' variant='tagline' fontSize={ui.taglineFontSize}>
        <Text as='span' display={{ base: 'none', md: 'inline' }} fontSize={ui.taglineFontSize}>
          The missing
        </Text>
        <Text as='span' display={{ base: 'inline', md: 'none' }} fontSize={ui.taglineFontSize}>
          Missing
        </Text>
        {' services for '}
        <Text as='span' fontSize={ui.taglineFontSize} color='brand.primary'>
          agent-first
        </Text>
        {' development'}
      </Heading>
      <Text variant='cta'>
        Enhance your agent instantly with world-class research abilities
      </Text>
    </>
  );
};
