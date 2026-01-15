import { extendTheme } from '@chakra-ui/react';

import * as ui from './config/ui';

export default extendTheme({
  cssVarPrefix: 'chakra',
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#f9fafc', _dark: 'gray.800' },
      'chakra-subtle-bg': { _light: 'gray.100', _dark: 'whiteAlpha.50' },
      'chakra-accent-bg': { _light: 'gray.300', _dark: 'whiteAlpha.300' },
      'chakra-overlay-bg': { _light: 'white', _dark: 'gray.700' },
      'chakra-inverse-bg': { _light: ui.resolutionBlue, _dark: ui.cornflowerBlue },
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.800' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.100' },
      'chakra-shadow-color': { _light: 'gray.300', _dark: 'whiteAlpha.400' },
      'chakra-button-color': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'chakra-label-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' }
    }
  },
  colors: {
    brand: { primary: ui.royalBlue, secondary: ui.resolutionBlue },
    accent: { primary: ui.cornflowerBlue, secondary: ui.creativeBlue },
    outline: ui.royalBlue
  },
  shadows: { outline: `${ui.outlineStyle} var(--chakra-colors-outline)` },
  fonts: {
    tagline: ui.taglineFont,
    heading: ui.headingFont,
    subheading: ui.subheadingFont,
    body: ui.bodyFont,
    footer: ui.footerFont
  },
  components: {
    Divider: {
      baseStyle: {
        _light: { borderColor: 'accent.secondary' },
        _dark: { borderColor: 'brand.primary' }
      }
    },
    Heading: {
      baseStyle: {
        fontSize: { base: '26px', md: '4xl' },
        _light: { color: 'accent.secondary' },
        _dark: { color: 'brand.primary' }
      },
      variants: {
        login: { fontFamily: 'subheading', fontSize: '1.25rem' },
        tagline: {
          fontFamily: 'tagline',
          _light: { color: 'gray.800' },
          _dark: { color: 'whiteAlpha.800' }
        },
        'post-it': { _light: { color: 'gray.800' }, _dark: { color: 'gray.800' } },
        service: { fontFamily: 'subheading' },
        team: { textAlign: 'center', fontWeight: 'normal' },
        name: { fontFamily: 'subheading' }
      }
    },
    Text: {
      baseStyle: { fontSize: { base: 'md', md: 'lg' } },
      variants: {
        cta: {
          my: 4,
          // my: 2,
          fontFamily: 'tagline',
          fontSize: ui.ctaFontSize,
          color: 'chakra-label-color'
        },
        'post-it': {
          my: 6,
          textAlign: 'left',
          fontFamily: 'subheading',
          fontSize: ui.postItFontSize,
          color: 'gray.800'
        },
        service: { mt: 4, _light: { fontWeight: 300 }, _dark: { color: 'whiteAlpha.700' } },
        about: { _light: { fontWeight: 300 }, _dark: { color: 'whiteAlpha.700' } },
        teammate: {
          mt: 2,
          fontFamily: 'footer',
          _light: { fontWeight: 300, color: 'accent.secondary' },
          _dark: { color: 'brand.primary' }
        },
        attribution: {
          fontFamily: 'footer',
          fontSize: { base: 'xs', md: 'sm' },
          _light: { fontWeight: 300, color: 'accent.secondary' },
          _dark: { color: 'brand.primary' }
        },
        bold: { fontWeight: 'bold' },
        footerBold: { fontWeight: 500 },
        co: { mx: '.2em', fontFamily: 'heading', fontWeight: 'normal' },
        footerCo: { mx: '.1em', fontFamily: 'heading', fontWeight: 'normal' },
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
        _hover: { textDecoration: 'none' },
        _light: { color: 'accent.secondary', _hover: { color: 'brand.secondary' } },
        _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
      },
      variants: {
        ghost: { display: 'inline-block', color: 'inherit', _hover: { color: 'inherit' } },
        nav: {
          fontFamily: 'heading',
          fontWeight: 'normal',
          _light: { color: 'brand.primary', _hover: { color: 'brand.secondary' } },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
        },
        doc: {
          position: 'absolute',
          right: '1.25rem',
          bottom: '1rem',
          _light: { fontWeight: 'normal', color: 'chakra-body-text' },
          _dark: { fontWeight: 500, color: 'chakra-body-text' }
        },
        team: {
          display: 'inline-block',
          borderBottomWidth: '2px',
          p: 0,
          h: '24px',
          fontWeight: 500,
          _light: {
            borderBottomColor: 'accent.secondary',
            _hover: { borderColor: 'brand.secondary' },
            _focus: { boxShadow: `${ui.outlineStyle} var(--chakra-colors-accent-secondary)` }
          },
          _dark: {
            borderBottomColor: 'brand.primary',
            _hover: { borderColor: 'accent.primary' },
            _focus: { boxShadow: `${ui.outlineStyle} var(--chakra-colors-brand-primary)` }
          }
        },
        social: {
          display: 'inline-block',
          p: 0,
          _light: {
            _focus: { boxShadow: `${ui.outlineStyle} var(--chakra-colors-accent-secondary)` }
          },
          _dark: { _focus: { boxShadow: `${ui.outlineStyle} var(--chakra-colors-brand-primary)` } }
        }
      }
    },
    Textarea: {
      defaultProps: { focusBorderColor: 'brand.primary' },
      baseStyle: {
        p: ui.promptPadding,
        lineHeight: 'base',
        fontFamily: 'tagline',
        fontSize: ui.promptFontSize,
        _placeholder: { color: 'chakra-placeholder-color' },
        _light: { fontWeight: 300 }
      },
      variants: { outline: { borderWidth: '2px', bg: 'chakra-subtle-bg' } }
    },
    Button: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: 'bold',
        _hover: { borderColor: 'transparent' },
        _focus: { outline: 'none', shadow: ui.shadowStyle },
        _disabled: {
          _light: { _hover: { background: 'accent.secondary !important' } },
          _dark: { _hover: { background: 'brand.primary !important' } }
        }
      },
      variants: {
        solid: {
          fontSize: { base: 'md', md: 'lg' },
          _active: { bg: 'brand.secondary' },
          _light: {
            bg: 'accent.secondary',
            color: 'white',
            _hover: { bg: 'brand.secondary' },
            _focus: { boxShadow: `${ui.outlineStyle} ${ui.blackAlpha}` }
          },
          _dark: {
            bg: 'brand.primary',
            color: 'whiteAlpha.800',
            _hover: { bg: 'accent.primary' },
            _focus: { boxShadow: `${ui.outlineStyle} var(--chakra-colors-whiteAlpha-800)` }
          }
        },
        monochrome: {
          bg: 'chakra-button-color',
          _hover: { bg: 'chakra-accent-bg' },
          _light: { color: 'brand.primary', _hover: { color: 'brand.secondary' } },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
        }
      }
    },
    Menu: {
      baseStyle: {
        item: {
          fontFamily: 'heading',
          fontSize: '2xl',
          _light: { color: 'brand.secondary' },
          _dark: { color: 'whiteAlpha.800' }
        }
      }
    },
    Badge: {
      baseStyle: {
        borderWidth: '1px',
        bg: 'chakra-accent-bg',
        pt: '2px',
        fontFamily: 'body',
        _light: { borderColor: 'accent.secondary', color: 'accent.secondary' },
        _dark: { borderColor: 'whiteAlpha.600', color: 'whiteAlpha.600' }
      }
    }
  },
  styles: {
    global: {
      '*': {
        transition:
          'top, right, bottom, left, border-color, background-color, background-image, background-position, width, height, font-size, color, stroke, fill, opacity, box-shadow var(--chakra-transition-duration-normal)'
      },
      '.hljs': { bg: 'none !important' }
    }
  }
});
