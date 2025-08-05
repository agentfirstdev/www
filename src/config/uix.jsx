import { Text } from '@chakra-ui/react';

import * as ui from './ui';

// Strings
export const Tagline = () => {
  return (
    <>
      <Text as='span' display={{ base: 'none', md: 'inline' }} fontSize={ui.postItFont}>
        The missing
      </Text>
      <Text as='span' display={{ base: 'inline', md: 'none' }} fontSize={ui.postItFont}>
        Missing
      </Text>
      {' services for '}
      <br />
      agent-first development
    </>
  );
};
