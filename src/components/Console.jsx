import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
  Button,
  useBreakpointValue
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';

import * as ui from '../config/ui';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

export default function Console({ apiResponse, isOpen, close }) {
  const margin = useBreakpointValue(ui.codeHorizontalMargin);
  const output = apiResponse?.content
    ? hljs
        .highlight(apiResponse.content, { language: apiResponse.type })
        .value.split('\n')
        .map((line) => {
          return `<span class='line'>${line || ' '}</span>`;
        })
        .join('')
    : '';

  return (
    <Modal isOpen={isOpen} isCentered autoFocus={false} returnFocusOnClose={false} onClose={close}>
      <ModalOverlay />
      <ModalContent
        mx={4}
        bg={ui.darkBackground}
        p={0}
        maxW={ui.consoleWidth}
        maxH={ui.consoleHeight}
        overflow='hidden'
      >
        <Flex bg='whiteAlpha.50' px={ui.chromePadding} py={2} justify='flex-end'>
          <Button
            variant='unstyled'
            display='flex'
            rounded='md'
            p={1}
            minW='auto'
            h='auto'
            fontSize='xs'
            color='whiteAlpha.500'
            aria-label={ui.closeLabel}
            onClick={close}
            _hover={{ bg: 'whiteAlpha.200', color: 'whiteAlpha.800' }}
          >
            <AddIcon transform={`rotate(-${ui.openRotation}deg)`} />
          </Button>
        </Flex>
        <ModalBody p={0}>
          {output && (
            <Box
              fontFamily='code'
              fontSize={ui.codeFontSize}
              sx={{
                '& code.hljs': {
                  px: ui.codeHorizontalMargin,
                  py: ui.codeVerticalMargin,
                  counterReset: 'line'
                },
                '& .line': {
                  display: 'block',
                  pl: `calc(${margin} + 1ch)`,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                },
                '& .line::before': {
                  display: 'inline-block',
                  ml: `calc(-${margin} - 2ch)`,
                  mr: margin,
                  w: '2ch',
                  textAlign: 'right',
                  color: 'whiteAlpha.300',
                  content: 'counter(line)',
                  userSelect: 'none',
                  counterIncrement: 'line'
                }
              }}
              dangerouslySetInnerHTML={{ __html: `<pre><code class="hljs">${output}</code></pre>` }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
