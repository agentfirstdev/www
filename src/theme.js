import { extendTheme } from '@chakra-ui/react';

import * as ui from './config/ui';

export default extendTheme({
  config: { useSystemColorMode: true },
  cssVarPrefix: 'chakra',
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#f9fafc', _dark: 'gray.800' },
      'chakra-subtle-bg': { _light: 'gray.100', _dark: 'whiteAlpha.50' },
      'chakra-accent-bg': { _light: 'gray.300', _dark: 'whiteAlpha.300' },
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.800' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.100' },
      'chakra-shadow-color': { _light: 'gray.300', _dark: 'whiteAlpha.400' },
      'chakra-button-color': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'chakra-label-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' }
    }
  },
  colors: {
    brand: { primary: ui.royalBlue, secondary: ui.resolutionBlue },
    accent: { primary: ui.creativeBlue }
  },
  fonts: {
    heading: '"Permanent Marker", cursive',
    subheading: '"Indie Flower", cursive',
    body: '"Source Sans 3", sans-serif'
  },
  components: {
    Heading: {
      variants: {
        'post-it': { fontSize: ['28px', '22px', '28px'], color: 'gray.800' },
        service: { mt: ui.sectionMargin, fontFamily: 'subheading', color: 'accent.primary' }
      }
    },
    Text: {
      variants: {
        bold: { fontWeight: 500 },
        'post-it': {
          my: 6,
          textAlign: 'left',
          fontFamily: 'subheading',
          fontSize: ['26px', 'xl', '26px'],
          color: 'gray.800'
        },
        service: { mt: 2, fontSize: ['xl', 'lg', 'xl'], fontWeight: 300 },
        co: { fontFamily: 'subheading' }
      }
    },
    Code: {
      baseStyle: {
        mt: 4,
        border: '1px solid var(--chakra-colors-chakra-border-color)',
        borderRadius: 'md',
        bg: 'chakra-body-bg',
        fontSize: 'md'
      }
    },
    Link: {
      baseStyle: {
        borderRadius: ui.outlineRadius,
        p: ui.linkPadding,
        color: 'accent.primary',
        transition: ui.transition,
        _hover: { color: 'brand.secondary', textDecoration: 'none' }
      },
      variants: {
        ghost: { display: 'inline-block', color: 'inherit', _hover: { color: 'inherit' } },
        nav: {
          fontFamily: 'heading',
          color: 'brand.secondary',
          _hover: { color: 'accent.primary' },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
        }
      }
    },
    Button: {
      baseStyle: {
        _hover: { borderColor: 'transparent' },
        _focus: { outline: ui.outlineStyle, shadow: ui.shadowStyle }
      },
      variants: {
        solid: { bg: 'accent.primary', color: 'white', _hover: { bg: 'brand.secondary' } },
        monochrome: {
          bg: 'chakra-button-color',
          color: 'brand.secondary',
          _hover: { bg: 'chakra-accent-bg', color: 'accent.primary' },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
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
    },
    Badge: {
      baseStyle: {
        border: '1px solid var(--chakra-colors-chakra-label-color)',
        bg: 'chakra-accent-bg',
        pt: '2px',
        fontFamily: 'body',
        color: 'chakra-label-color'
      }
    }
  },
  styles: { global: { '.hljs': { bg: 'none !important' } } }
});
