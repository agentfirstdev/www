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
    body: 'Lato, sans-serif'
  },
  components: {
    Heading: {
      baseStyle: { color: 'accent.primary' },
      variants: {
        section: { textAlign: 'center' },
        'post-it': { fontSize: '28px', color: 'gray.800' },
        service: { fontFamily: 'subheading' },
        name: { fontFamily: 'subheading', fontSize: '3xl', color: 'brand.primary' }
      }
    },
    Text: {
      variants: {
        'post-it': {
          my: 6,
          textAlign: 'left',
          fontFamily: 'subheading',
          fontSize: '26px',
          color: 'gray.800'
        },
        service: { mt: 4, fontSize: ['lg', 'xl'], fontWeight: 300 },
        teammate: { mt: 2, fontSize: 'lg', fontWeight: 300, color: 'accent.primary' },
        bold: { fontWeight: 'bold' },
        co: { mx: '.2em', fontFamily: 'heading', fontWeight: 'normal' },
        name: { lineHeight: 1.25, fontFamily: 'subheading', fontSize: 'larger', fontWeight: 'bold' }
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
        fontWeight: 'bold',
        color: 'accent.primary',
        transition: ui.transition,
        _hover: { color: 'brand.secondary', textDecoration: 'none' }
      },
      variants: {
        ghost: { display: 'inline-block', color: 'inherit', _hover: { color: 'inherit' } },
        nav: {
          fontFamily: 'heading',
          fontWeight: 'normal',
          color: 'brand.secondary',
          _hover: { color: 'accent.primary' },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
        },
        team: {
          display: 'inline-block',
          borderBottom: '2px solid var(--chakra-colors-accent-primary)',
          p: 0,
          h: '25px',
          _hover: { borderColor: 'brand.secondary' }
        }
      }
    },
    Button: {
      baseStyle: {
        fontFamily: 'body',
        _hover: { borderColor: 'transparent' },
        _focus: { outline: ui.outlineStyle, shadow: ui.shadowStyle }
      },
      variants: {
        solid: {
          bg: 'accent.primary',
          w: ui.buttonWidth,
          h: ui.controlHeight,
          fontSize: 'xl',
          color: 'white',
          _hover: { bg: 'brand.secondary' },
          _active: { bg: 'brand.secondary' }
        },
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
        border: '1px solid var(--chakra-colors-accent-primary)',
        bg: 'chakra-accent-bg',
        pt: '2px',
        fontFamily: 'body',
        color: 'accent.primary'
      }
    }
  },
  styles: { global: { '.hljs': { bg: 'none !important' } } }
});
