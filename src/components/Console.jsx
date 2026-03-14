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
import sh from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';

import * as ui from '../config/ui';

const numberLines = (text) => {
  return text
    .split('\n')
    .map((line) => {
      return `<span class='line'>${line || ' '}</span>`;
    })
    .join('');
};

hljs.registerLanguage('bash', sh);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

export default function Console({ request, response, isRunning, isOpen, close }) {
  const margin = useBreakpointValue(ui.codeHorizontalMargin);
  let output = '';

  if (request) {
    output = '$ ';

    switch (request.language) {
      case 'python':
        output += `python3 <<'EOF'\n${request.code}\nEOF`;

        break;

      case 'javascript':
        output += `node <<'EOF'\n${request.code}\nEOF`;

        break;

      default:
        output += request.code.replace("'\\\n'", '').replace('\\\n', '');
    }

    output =
      numberLines(hljs.highlight(output, { language: 'bash' }).value) +
      '<span class="line"> </span>' +
      (response?.content
        ? numberLines(hljs.highlight(response.content, { language: response.type }).value)
        : isRunning
          ? '<span class="line"><span class="cursor">█</span></span>'
          : '');
  }

  return (
    <Modal isOpen={isOpen} isCentered autoFocus={false} returnFocusOnClose={false} onClose={close}>
      <ModalOverlay />
      <ModalContent
        mx={4}
        bg={ui.darkBackground}
        p={0}
        maxW={ui.consoleWidth}
        h={ui.consoleHeight}
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
        <ModalBody p={0} overflow='auto'>
          {output && (
            <Box
              fontFamily='code'
              fontSize={ui.codeFontSize}
              sx={{
                '@keyframes blink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
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
                  ml: `calc(-${margin} - 3ch)`,
                  mr: margin,
                  w: '3ch',
                  textAlign: 'right',
                  color: 'whiteAlpha.300',
                  content: 'counter(line)',
                  userSelect: 'none',
                  counterIncrement: 'line'
                },
                '& .cursor': { color: 'whiteAlpha.800', animation: 'blink 1s step-end infinite' }
              }}
              dangerouslySetInnerHTML={{ __html: `<pre><code class='hljs'>${output}</code></pre>` }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
