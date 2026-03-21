import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Link,
  Tooltip,
  Spinner,
  useBreakpointValue,
  useDisclosure,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import hljs from 'highlight.js/lib/core';
import sh from 'highlight.js/lib/languages/bash';
import py from 'highlight.js/lib/languages/python';
import js from 'highlight.js/lib/languages/javascript';

import * as ui from '../config/ui';
import CurlSymbol from '../assets/CurlSymbol';
import PythonDevice from '../assets/PythonDevice';
import NodeHex from '../assets/NodeHex';
import PlayIcon from '../assets/PlayIcon';
import Console from './Console';

const toastId = crypto.randomUUID();
const languageNames = { sh: 'bash', py: 'python', js: 'javascript' };
const languageIcons = { sh: CurlSymbol, py: PythonDevice, js: NodeHex };

hljs.registerLanguage('bash', sh);
hljs.registerLanguage('python', py);
hljs.registerLanguage('javascript', js);

export default function Code({ markdown, apiUrl, apiToken, openLogin, moreUrl }) {
  const [activeLanguage, setActiveLanguage] = useState('sh');
  const [apiRequest, setApiRequest] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const margin = useBreakpointValue(ui.codeHorizontalMargin);
  const { isOpen: isConsoleOpen, onOpen: openConsole, onClose: closeConsole } = useDisclosure();
  const { hasCopied, onCopy, setValue } = useClipboard('');
  const toast = useToast();
  const languages = Object.keys(markdown);
  const rawCode = ui.stripFences(markdown[activeLanguage]);
  const shouldShowChrome = languages.length > 1;
  const runCode = async () => {
    if (apiToken) {
      setApiRequest({ code: rawCode, language: languageNames[activeLanguage] });
      setApiResponse(null);
      setIsRunning(true);
      openConsole();
      setApiResponse(await ui.apiCall(apiUrl, apiToken));
      setIsRunning(false);
    } else {
      openLogin();
    }
  };

  useEffect(() => {
    setValue(rawCode);
  }, [rawCode]);

  return (
    <>
      <Box
        mt={4}
        borderWidth='1px'
        rounded='md'
        borderColor='chakra-border-color'
        bg='bg-editor'
        overflow='hidden'
        shadow='sm'
      >
        {shouldShowChrome && (
          <Flex
            borderBottomWidth='1px'
            borderColor='chakra-border-color'
            bg='bg-chrome'
            px={ui.chromePadding}
            py={2}
            minH={ui.chromeButtonDimension}
            justify='space-between'
          >
            <Flex gap={ui.chromeButtonMargin}>
              {languages.map((language, i) => {
                const Icon = languageIcons[language];
                const isActive = language == activeLanguage;

                return (
                  <Box
                    as='button'
                    key={language}
                    display={i == languages.length - 1 ? { base: 'none', sm: 'flex' } : 'flex'}
                    rounded='md'
                    bg={isActive ? 'chakra-border-color' : 'transparent'}
                    px={ui.chromeButtonPadding}
                    h={ui.chromeButtonDimension}
                    alignItems='center'
                    fontSize={ui.codeFontSize}
                    color={isActive ? 'accent.primary' : 'fg-muted'}
                    gap={ui.chromeButtonMargin}
                    pointerEvents={isActive ? 'not-allowed' : 'auto'}
                    onClick={() => {
                      setActiveLanguage(language);
                    }}
                    _hover={{
                      bg: isActive ? 'chakra-border-color' : 'chakra-subtle-bg',
                      color: isActive ? 'accent.primary' : 'fg-tab'
                    }}
                    _focus={{ outline: 'none', shadow: ui.outline('accent-primary') }}
                  >
                    {Icon ? <Icon dimension={ui.chromeIconDimension} /> : null}
                    {ui.codeLabels[language]}
                  </Box>
                );
              })}
            </Flex>
            <Flex gap={ui.chromeButtonMargin}>
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={hasCopied ? null : ui.codeLabel}
                hasArrow
              >
                <Box
                  as='button'
                  display={{ base: 'none', md: 'flex' }}
                  rounded='md'
                  w={ui.chromeButtonDimension}
                  h={ui.chromeButtonDimension}
                  justifyContent='center'
                  alignItems='center'
                  color='fg-muted'
                  aria-label={ui.codeLabel}
                  pointerEvents={hasCopied ? 'not-allowed' : 'auto'}
                  onClick={() => {
                    onCopy();

                    if (!toast.isActive(toastId)) {
                      toast({
                        id: toastId,
                        position: 'top',
                        status: 'success',
                        description: ui.codeMessage,
                        duration: ui.toastTimeoutMs
                      });
                    }
                  }}
                  _hover={{ bg: 'chakra-subtle-bg', color: 'fg-tab' }}
                  _focus={{ outline: 'none', shadow: ui.outline('accent-primary') }}
                >
                  {hasCopied ? <CheckIcon /> : <CopyIcon />}
                </Box>
              </Tooltip>
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={isRunning ? null : ui.runLabel}
                hasArrow
              >
                <Box
                  as='button'
                  display='flex'
                  rounded='md'
                  w={ui.chromeButtonDimension}
                  h={ui.chromeButtonDimension}
                  justifyContent='center'
                  alignItems='center'
                  color='fg-muted'
                  aria-label={ui.runLabel}
                  pointerEvents={isRunning ? 'not-allowed' : 'auto'}
                  onClick={runCode}
                  _hover={{ bg: 'chakra-subtle-bg', color: 'fg-tab' }}
                  _focus={{ outline: 'none', shadow: ui.outline('accent-primary') }}
                >
                  {isRunning ? (
                    <Spinner size='xs' />
                  ) : (
                    <PlayIcon dimension={ui.chromeIconDimension} />
                  )}
                </Box>
              </Tooltip>
            </Flex>
          </Flex>
        )}
        <Box position='relative' align='left'>
          <Flex>
            <Box
              ml={`calc(${margin} - 1ch)`}
              mt={ui.codeVerticalMargin}
              fontFamily='code'
              fontSize={ui.codeFontSize}
              color='fg-gutter'
              userSelect='none'
            >
              {Array.from({ length: rawCode.split('\n').length }, (_, i) => {
                return (
                  <Box key={i} w='2ch' textAlign='right'>
                    {i + 1}
                  </Box>
                );
              })}
            </Box>
            <Box
              flex='1'
              fontSize={ui.codeFontSize}
              overflow='auto'
              sx={{ '& code.hljs': { px: ui.codeHorizontalMargin, py: ui.codeVerticalMargin } }}
              dangerouslySetInnerHTML={{
                __html:
                  '<pre><code class="hljs">' +
                  hljs.highlight(rawCode, { language: languageNames[activeLanguage] }).value +
                  '</code></pre>'
              }}
            />
          </Flex>
          {moreUrl && shouldShowChrome && (
            <Link variant='doc' href={moreUrl}>
              {ui.moreLabel}
            </Link>
          )}
        </Box>
      </Box>
      <Console
        apiToken={apiToken}
        apiRequest={apiRequest}
        apiResponse={apiResponse}
        isOpen={isConsoleOpen}
        isRunning={isRunning}
        close={closeConsole}
      />
    </>
  );
}
