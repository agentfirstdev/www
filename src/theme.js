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
    brand: { primary: ui.royalBlue, secondary: ui.resolutionBlue },
    accent: { primary: ui.creativeBlue, secondary: '#ff8840' }
  },
  fonts: { heading: '"Permanent Marker", cursive', body: '"Source Sans 3", sans-serif' },
  components: {
    Heading: {
      variants: {
        'post-it': { fontSize: ['28px', '22px', '28px'] },
        service: {
          textAlign: 'left',
          fontFamily: '"Indie Flower", cursive',
          color: 'accent.primary'
        }
      }
    },
    Text: {
      variants: {
        bold: { fontWeight: 500 },
        'post-it': {
          my: 6,
          textAlign: 'left',
          fontFamily: '"Indie Flower", cursive',
          fontSize: ['26px', 'xl', '26px']
        },
        service: {
          mt: 2,
          textAlign: 'left',
          fontSize: { base: 'xl', md: 'lg', lg: 'xl' },
          fontWeight: 300,
          color: 'gray.800'
        },
        co: { fontFamily: '"Indie Flower", cursive' }
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
          bg: 'chakra-border-color',
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
        border: '1px solid var(--chakra-colors-brand-secondary)',
        bg: 'accent.primary',
        pt: '2px',
        fontFamily: 'body',
        color: 'white'
      }
    }
  },
  styles: { global: { '.hljs': { bg: 'none !important' } } }
});
