import { useState, useEffect } from 'react';
import { Box, Flex, Link, Tooltip, useClipboard, useToast } from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import hljs from 'highlight.js/lib/core';
import sh from 'highlight.js/lib/languages/bash';
import py from 'highlight.js/lib/languages/python';
import js from 'highlight.js/lib/languages/javascript';

import * as ui from '../config/ui';
import CurlSymbol from '../assets/CurlSymbol';
import PythonDevice from '../assets/PythonDevice';
import NodeHex from '../assets/NodeHex';

const toastId = 'copy';
const languageNames = { sh: 'bash', py: 'python', js: 'javascript' };
const languageIcons = { sh: CurlSymbol, py: PythonDevice, js: NodeHex };
const stripFences = (markdown) => {
  return markdown.replace(/^```[^\n]*\n/, '').replace(/\n```\s*$/, '');
};

hljs.registerLanguage('bash', sh);
hljs.registerLanguage('python', py);
hljs.registerLanguage('javascript', js);

export default function Code({ markdown, moreUrl }) {
  const [activeLanguage, setActiveLanguage] = useState('sh');
  const { hasCopied, onCopy, setValue } = useClipboard('');
  const toast = useToast();
  const rawCode = stripFences(markdown[activeLanguage]);

  useEffect(() => {
    setValue(rawCode);
  }, [rawCode]);

  return (
    <Box
      mt={4}
      borderWidth='1px'
      borderRadius='md'
      borderColor='chakra-border-color'
      bg='bg-editor'
      overflow='hidden'
      shadow='sm'
    >
      <Flex
        borderBottomWidth='1px'
        borderColor='chakra-border-color'
        bg='bg-chrome'
        px={ui.chromePadding}
        py={2}
        justify='space-between'
      >
        <Flex gap={ui.chromeButtonMargin}>
          {Object.keys(markdown).map((language) => {
            const Icon = languageIcons[language];
            const isActive = language == activeLanguage;

            return (
              <Box
                as='button'
                display='flex'
                borderRadius='md'
                bg={isActive ? 'chakra-border-color' : 'transparent'}
                px={ui.chromeButtonPadding}
                h={ui.chromeButtonDimension}
                alignItems='center'
                fontSize={ui.editorFontSize}
                color={isActive ? 'accent.primary' : 'fg-muted'}
                gap={ui.chromeButtonMargin}
                key={language}
                disabled={isActive}
                _hover={{
                  bg: isActive ? 'chakra-border-color' : 'chakra-subtle-bg',
                  color: isActive ? 'accent.primary' : 'fg-tab'
                }}
                _focus={{ outline: 'none', shadow: ui.outline('accent-primary') }}
                onClick={() => {
                  setActiveLanguage(language);
                }}
              >
                {Icon ? <Icon dimension={ui.chromeIconDimension} /> : null}
                {ui.codeLabels[language]}
              </Box>
            );
          })}
        </Flex>
        <Tooltip
          mx={ui.tooltipMargin}
          p={ui.tooltipPadding}
          label={hasCopied ? null : ui.codeLabel}
          hasArrow
        >
          <Box
            as='button'
            display='flex'
            borderRadius='md'
            w={ui.chromeButtonDimension}
            h={ui.chromeButtonDimension}
            justifyContent='center'
            alignItems='center'
            color='fg-muted'
            aria-label={ui.codeLabel}
            _hover={{ bg: 'chakra-subtle-bg', color: 'fg-tab' }}
            _focus={{ outline: 'none', shadow: ui.outline('accent-primary') }}
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
          >
            {hasCopied ? <CheckIcon /> : <CopyIcon />}
          </Box>
        </Tooltip>
      </Flex>
      <Box position='relative'>
        <Flex>
          <Box
            mt={ui.editorVerticalMargin}
            ml={ui.editorHorizontalMargin}
            fontFamily='mono'
            fontSize={ui.editorFontSize}
            color='fg-gutter'
            userSelect='none'
          >
            {Array.from({ length: rawCode.split('\n').length }, (_, i) => {
              return <Box key={i}>{i + 1}</Box>;
            })}
          </Box>
          <Box
            flex='1'
            fontSize={ui.editorFontSize}
            overflow='auto'
            sx={{ '& code.hljs': { px: ui.editorHorizontalMargin, py: ui.editorVerticalMargin } }}
            dangerouslySetInnerHTML={{
              __html:
                '<pre><code class="hljs">' +
                hljs.highlight(rawCode, { language: languageNames[activeLanguage] }).value +
                '</code></pre>'
            }}
          />
        </Flex>
        {moreUrl ? (
          <Link variant='doc' href={moreUrl}>
            {ui.moreLabel}
          </Link>
        ) : null}
      </Box>
    </Box>
  );
}
