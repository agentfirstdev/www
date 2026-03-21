import { useRef, useState, useEffect } from 'react';
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

const inputPrompt = `${ui.prompt}${ui.urlPrompt} [${ui.defaultUrl}]: `;
const blankLine = "<span class='line'> </span>";
const numberLines = (text) => {
  return text
    .split('\n')
    .map((line) => {
      return `<span class='line'>${line || ' '}</span>`;
    })
    .join('');
};
const print = (apiResponse, isCodeRunning) => {
  return apiResponse
    ? apiResponse.isError
      ? `<span class='line'>${ui.errorMessage}</span>`
      : numberLines(hljs.highlight(apiResponse.content, { language: apiResponse.type }).value)
    : isCodeRunning
      ? `<span class='line'><span class='cursor'>${ui.cursorChar}</span></span>`
      : '';
};

hljs.registerLanguage('bash', sh);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

export default function Console({
  apiUrl,
  apiToken,
  apiRequest,
  apiResponse,
  isOpen,
  isInteractive,
  isRunning,
  close
}) {
  const hiddenInput = useRef();
  const [input, setInput] = useState('');
  const [rawUserUrl, setRawUserUrl] = useState('');
  const [userUrl, setUserUrl] = useState('');
  const [encodedUserUrl, setEncodedUserUrl] = useState('');
  const [interactiveResponse, setInteractiveResponse] = useState(null);
  const codeMargin = useBreakpointValue(ui.codeHorizontalMargin);
  const terminalStyle = {
    '@keyframes blink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
    '& code.hljs': { px: ui.codeHorizontalMargin, py: ui.codeVerticalMargin, counterReset: 'line' },
    '& .line': {
      display: 'block',
      pl: `calc(${codeMargin} + 1ch)`,
      color: 'whiteAlpha.500',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    },
    '& .line::before': {
      display: 'inline-block',
      ml: `calc(-${codeMargin} - 3ch)`,
      mr: codeMargin,
      w: '3ch',
      textAlign: 'right',
      color: 'whiteAlpha.300',
      content: 'counter(line)',
      userSelect: 'none',
      counterIncrement: 'line'
    },
    '& .cursor': {
      pos: 'relative',
      top: '-2px',
      color: 'whiteAlpha.800',
      animation: 'blink 1s step-end infinite'
    }
  };
  const maskedToken = apiToken
    ? apiToken.slice(0, ui.tokenPrefixCharCount) +
      ui.maskChar.repeat(Math.max(0, apiToken.length - ui.tokenPrefixCharCount))
    : '';
  const isAwaitingInput = isInteractive && !userUrl;
  const runCode = async () => {
    const rawUrl = input.trim() || ui.defaultUrl;
    let candidateUrl;

    try {
      candidateUrl = new URL(rawUrl);
    } catch {
      try {
        candidateUrl = new URL(`https://${rawUrl}`);
      } catch {
        // Ignoring exceptions.
      }
    }

    const url = candidateUrl ? candidateUrl.href : rawUrl;
    const encodedUrl = url.includes('?') ? encodeURIComponent(url) : url;

    setRawUserUrl(rawUrl);
    setUserUrl(url);
    setEncodedUserUrl(encodedUrl);
    setInteractiveResponse(
      await ui.apiCall(apiUrl.replace(ui.urlPlaceholder, encodedUrl), apiToken)
    );
  };
  let output = '';

  useEffect(() => {
    if (isOpen && isInteractive) {
      setInput('');
      setUserUrl('');
      setInteractiveResponse(null);

      const focus = setTimeout(() => {
        if (hiddenInput.current) hiddenInput.current.focus();
      }, 100);

      return () => {
        clearTimeout(focus);
      };
    }
  }, [isOpen, isInteractive]);

  if (isInteractive) {
    if (userUrl) {
      output =
        numberLines(hljs.highlight(inputPrompt + rawUserUrl, { language: 'bash' }).value) +
        blankLine +
        numberLines(
          hljs.highlight(
            apiRequest.code
              .replaceAll("'\\\n'", '')
              .replaceAll('"\\\n"', '')
              .replaceAll('\\\n', '')
              .replaceAll('"', "'")
              .replace(ui.shTokenPlaceholder, maskedToken)
              .replace(ui.urlPlaceholder, encodedUserUrl)
              .replace(ui.examplePlaceholder, encodedUserUrl),
            { language: 'bash' }
          ).value
        ) +
        blankLine +
        print(interactiveResponse, !interactiveResponse);
    }
  } else {
    if (apiRequest) {
      output = ui.prompt;

      switch (apiRequest.language) {
        case 'python':
          output += `python3 <<'EOF'\n${apiRequest.code}\nEOF`
            .replace("f'", "'")
            .replace(ui.pyTokenPlaceholder, maskedToken);

          break;

        case 'javascript':
          output += `node <<'EOF'\n${apiRequest.code}\nEOF`
            .replaceAll('`', "'")
            .replace(ui.jsTokenPlaceholder, maskedToken);

          break;

        default:
          output += apiRequest.code
            .replaceAll("'\\\n'", '')
            .replaceAll('\\\n', '')
            .replaceAll('"', "'")
            .replace(ui.shTokenPlaceholder, maskedToken);
      }

      output =
        numberLines(hljs.highlight(output, { language: 'bash' }).value) +
        blankLine +
        print(apiResponse, isRunning);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      isCentered
      autoFocus={false}
      trapFocus={false}
      returnFocusOnClose={false}
      onClose={close}
    >
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
        <ModalBody
          p={0}
          overflow='auto'
          cursor={isAwaitingInput ? 'text' : 'auto'}
          onClick={() => {
            if (isAwaitingInput) hiddenInput.current?.focus();
          }}
          sx={{
            scrollbarColor: 'var(--chakra-colors-whiteAlpha-200) transparent',
            '&::-webkit-scrollbar-track': { bg: 'transparent' },
            '&::-webkit-scrollbar-thumb': { bg: 'whiteAlpha.200' }
          }}
        >
          {isAwaitingInput ? (
            <Box fontFamily='code' fontSize={ui.codeFontSize} sx={terminalStyle}>
              <pre>
                <code className='hljs'>
                  <form
                    className='line'
                    style={{ display: 'flex', alignItems: 'baseline' }}
                    onSubmit={(event) => {
                      event.preventDefault();
                      runCode();
                    }}
                  >
                    <span>{inputPrompt}</span>
                    <input
                      ref={hiddenInput}
                      value={input}
                      inputMode='url'
                      autoComplete='off'
                      spellCheck={false}
                      style={{
                        outline: 'none',
                        background: 'none',
                        width: `${input.length}ch`,
                        caretColor: 'transparent',
                        transition: 'none'
                      }}
                      onChange={(event) => {
                        setInput(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                          event.preventDefault();
                          runCode();
                        }
                      }}
                    />
                    <span className='cursor'>{ui.cursorChar}</span>
                  </form>
                </code>
              </pre>
            </Box>
          ) : (
            output && (
              <Box
                fontFamily='code'
                fontSize={ui.codeFontSize}
                sx={terminalStyle}
                dangerouslySetInnerHTML={{
                  __html: `<pre><code class='hljs'>${output}</code></pre>`
                }}
              />
            )
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
