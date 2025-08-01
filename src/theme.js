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
      'chakra-inverse-bg': { _light: 'gray.800', _dark: '#f9fafc' },
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.800' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.100' },
      'chakra-shadow-color': { _light: 'gray.300', _dark: 'whiteAlpha.400' },
      'chakra-button-color': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'chakra-label-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' }
    }
  },
  colors: {
    brand: { primary: ui.royalBlue, secondary: ui.resolutionBlue },
    accent: { primary: ui.cornflowerBlue, secondary: ui.creativeBlue }
  },
  fonts: {
    heading: '"Permanent Marker", cursive',
    subheading: '"Indie Flower", cursive',
    body: 'Lato, sans-serif'
  },
  components: {
    Heading: {
      baseStyle: { color: 'accent.secondary', _dark: { color: 'brand.primary' } },
      variants: {
        section: { textAlign: 'center' },
        'post-it': { fontSize: ui.postItFont, color: 'gray.800', _dark: { color: 'gray.800' } },
        service: { fontFamily: 'subheading' },
        name: { fontFamily: 'subheading' }
      }
    },
    Text: {
      baseStyle: { fontSize: { base: 'md', md: 'lg' } },
      variants: {
        'post-it': {
          my: 6,
          textAlign: 'left',
          fontFamily: 'subheading',
          fontSize: ui.postItFont,
          color: 'gray.800'
        },
        service: {
          mt: 4,
          fontWeight: 300,
          _dark: { fontWeight: 'normal', color: 'whiteAlpha.700' }
        },
        teammate: {
          mt: 2,
          fontWeight: 300,
          color: 'accent.secondary',
          _dark: { fontWeight: 'normal', color: 'brand.primary' }
        },
        bold: { fontWeight: 'bold' },
        co: { mx: '.2em', fontFamily: 'heading', fontWeight: 'normal' },
        name: { lineHeight: 1.25, fontFamily: 'subheading', fontSize: 'larger', fontWeight: 'bold' }
      }
    },
    Code: {
      baseStyle: {
        display: 'block',
        mt: 4,
        border: '1px solid var(--chakra-colors-chakra-border-color)',
        borderRadius: 'md',
        bg: 'chakra-body-bg',
        maxW: '100%',
        fontSize: { base: 'sm', md: 'md' }
      }
    },
    Link: {
      baseStyle: {
        borderRadius: ui.outlineRadius,
        p: ui.linkPadding,
        fontWeight: 'bold',
        color: 'accent.secondary',
        _hover: { color: 'brand.secondary', textDecoration: 'none' }
      },
      variants: {
        ghost: { display: 'inline-block', color: 'inherit', _hover: { color: 'inherit' } },
        nav: {
          fontFamily: 'heading',
          fontWeight: 'normal',
          color: 'brand.secondary',
          _hover: { color: 'accent.secondary' },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.secondary' } }
        },
        team: {
          display: 'inline-block',
          borderBottom: '2px solid var(--chakra-colors-accent-secondary)',
          p: 0,
          h: '25px',
          _hover: { borderColor: 'brand.secondary' }
        }
      }
    },
    Button: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: 'bold',
        _hover: { borderColor: 'transparent' },
        _focus: { outline: ui.outlineStyle, shadow: ui.shadowStyle }
      },
      variants: {
        solid: {
          bg: 'accent.secondary',
          w: ui.buttonWidth,
          h: ui.controlHeight,
          fontSize: { base: 'md', md: 'lg' },
          color: 'white',
          _hover: { bg: 'brand.secondary' },
          _active: { bg: 'brand.secondary' },
          _dark: { bg: 'brand.primary', color: 'whiteAlpha.800', _hover: { bg: 'accent.primary' } }
        },
        monochrome: {
          bg: 'chakra-button-color',
          color: 'brand.secondary',
          _hover: { bg: 'chakra-accent-bg', color: 'accent.secondary' },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.secondary' } }
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
        border: '1px solid var(--chakra-colors-accent-secondary)',
        bg: 'chakra-accent-bg',
        pt: '2px',
        fontFamily: 'body',
        color: 'accent.secondary'
      }
    }
  },
  styles: {
    global: {
      '*': { transition: 'all var(--chakra-transition-duration-normal)' },
      '.hljs': { bg: 'none !important' }
    }
  }
});
