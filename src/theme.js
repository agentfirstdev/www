import { extendTheme } from '@chakra-ui/react';

import * as ui from './config/ui';

export default extendTheme({
  config: { useSystemColorMode: true },
  cssVarPrefix: 'chakra',
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#fbfaf9', _dark: 'gray.800' },
      'chakra-accent-bg': { _light: 'gray.300', _dark: 'whiteAlpha.300' },
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.800' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' }
    }
  },
  colors: {
    brand: { primary: ui.royalBlue, secondary: ui.creativeBlue },
    accent: { primary: ui.resolutionBlue, secondary: '#ff8840' }
  },
  fonts: { heading: '"Permanent Marker", cursive', body: '"Source Sans 3", sans-serif' },
  components: {
    Link: {
      baseStyle: {
        borderRadius: ui.outlineRadius,
        p: ui.linkPadding,
        color: 'accent.secondary',
        transition: ui.transition,
        _hover: { color: 'brand.primary', textDecoration: 'none' }
      },
      variants: {
        ghost: { display: 'inline-block', color: 'inherit', _hover: { color: 'inherit' } },
        nav: { fontFamily: 'heading', color: 'accent.primary', _hover: { color: 'brand.primary' } }
      }
    },
    Button: {
      baseStyle: {
        _hover: { borderColor: 'transparent' },
        _focus: { outline: ui.outlineStyle, shadow: ui.shadowStyle }
      },
      variants: {
        solid: {
          bg: 'accent.secondary',
          color: 'white',
          _hover: { bg: 'brand.secondary' },
          _active: { bg: 'brand.secondary' }
        },
        ghost: {
          borderRadius: 2,
          _hover: { bg: 'inherit', color: 'brand.secondary' },
          _disabled: { _hover: { color: 'inherit' } }
        },
        monochrome: {
          bg: 'chakra-border-color',
          _hover: { bg: 'chakra-accent-bg' },
          _active: { bg: 'chakra-accent-bg' }
        }
      }
    },
    Menu: {
      baseStyle: {
        item: {
          _hover: { borderColor: 'transparent', bg: 'outline' },
          _focus: { bg: 'inherit', outline: ui.outlineStyle },
          _active: { bg: 'outline' }
        }
      }
    }
  },
  styles: { global: { '.hljs': { bg: 'none !important' } } }
});
