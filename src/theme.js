import { extendTheme } from '@chakra-ui/react';

import * as ui from './config/ui';

export default extendTheme({
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#f9fafc', _dark: 'gray.800' },
      'chakra-subtle-bg': { _light: 'gray.100', _dark: 'whiteAlpha.50' },
      'bg-emphasized': { _light: 'gray.300', _dark: 'whiteAlpha.300' },
      'bg-muted': { _light: 'white', _dark: 'whiteAlpha.50' },
      'bg-inverted': { _light: ui.resolutionBlue, _dark: ui.cornflowerBlue },
      'bg-panel': { _light: 'white', _dark: 'gray.700' },
      'editor-bg': { _light: 'white', _dark: '#2a2e37' },
      'chrome-bg': { _light: 'gray.50', _dark: '#343944' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.100' },
      'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' },
      'fg-muted': { _light: 'gray.500', _dark: 'whiteAlpha.500' },
      'shadow-color': { _light: 'gray.300', _dark: 'whiteAlpha.400' },
      'button-color': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'gutter-color': { _light: 'gray.400', _dark: 'whiteAlpha.300' },
      'tab-color': { _light: 'gray.700', _dark: 'whiteAlpha.700' },
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.800' }
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
        tagline: { fontFamily: 'tagline', color: 'chakra-body-text !important' },
        'post-it': { color: 'gray.800' },
        service: { fontFamily: 'subheading' },
        team: { textAlign: 'center', fontWeight: 'normal' },
        name: { fontFamily: 'subheading' },
        secondary: {
          mt: ui.mdMargin,
          mb: ui.smMargin,
          fontFamily: 'body',
          _light: { color: 'gray.600' },
          _dark: { color: 'whiteAlpha.600' }
        }
      }
    },
    Text: {
      baseStyle: { fontSize: { base: 'md', md: 'lg' } },
      variants: {
        cta: { my: 4, fontFamily: 'tagline', fontSize: ui.ctaFontSize, color: 'fg-muted' },
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
          right: ui.editorHorizontalMargin,
          bottom: ui.editorVerticalMargin,
          fontSize: ui.editorFontSize,
          color: 'chakra-body-text',
          _light: { fontWeight: 'normal' },
          _dark: { fontWeight: 500 }
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
          _focus: { boxShadow: `${ui.outlineStyle} var(--chakra-colors-brand-primary)` }
        }
      }
    },
    FormLabel: { baseStyle: { mr: 0, mb: 0, fontWeight: 'bold', whiteSpace: 'nowrap' } },
    Input: {
      baseStyle: { field: { _light: { bg: 'white' }, _dark: { bg: 'whiteAlpha.50' } } },
      variants: {
        sidebar: { field: { _light: { bg: 'whiteAlpha.700' }, _dark: { bg: 'gray.700' } } }
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
          _light: { _hover: { bg: 'accent.secondary !important' } },
          _dark: { _hover: { bg: 'brand.primary !important' } }
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
          bg: 'button-color',
          _hover: { bg: 'bg-emphasized' },
          _light: { color: 'brand.primary', _hover: { color: 'brand.secondary' } },
          _dark: { color: 'brand.primary', _hover: { color: 'accent.primary' } }
        },
        toggle: {
          _light: { bg: '#e2e8f0', _hover: { bg: '#cbd5e0' } },
          _dark: { bg: '#343944', _hover: { bg: '#464b55' } }
        },
        dropdown: {
          borderWidth: '1px',
          borderColor: '#dbdbdb',
          bg: 'white',
          w: '150px',
          h: '50px',
          fontWeight: 'normal',
          color: '#484848',
          _hover: { borderColor: '#dbdbdb' }
        }
      }
    },
    Menu: {
      baseStyle: {
        list: { p: 0, shadow: 'md' },
        item: {
          fontFamily: 'heading',
          fontSize: '2xl',
          _light: { color: 'brand.secondary' },
          _dark: { color: 'whiteAlpha.800' }
        }
      },
      variants: {
        dropdown: {
          list: { borderColor: '#dbdbdb' },
          item: {
            bg: 'white',
            h: '50px',
            fontFamily: 'body',
            fontSize: 'lg',
            color: '#484848 !important',
            _hover: { bg: 'brand.primary', color: 'white !important' },
            _focus: { bg: 'brand.primary', color: 'white !important' }
          }
        }
      }
    },
    Badge: {
      baseStyle: {
        borderWidth: '1px',
        bg: 'bg-emphasized',
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
          'top var(--chakra-transition-duration-normal), ' +
          'right var(--chakra-transition-duration-normal), ' +
          'bottom var(--chakra-transition-duration-normal), ' +
          'left var(--chakra-transition-duration-normal), ' +
          'border-color var(--chakra-transition-duration-normal), ' +
          'background-color var(--chakra-transition-duration-normal), ' +
          'background-image var(--chakra-transition-duration-normal), ' +
          'background-position var(--chakra-transition-duration-normal), ' +
          'width var(--chakra-transition-duration-normal), ' +
          'height var(--chakra-transition-duration-normal), ' +
          'font-size var(--chakra-transition-duration-normal), ' +
          'color var(--chakra-transition-duration-normal), ' +
          'stroke var(--chakra-transition-duration-normal), ' +
          'fill var(--chakra-transition-duration-normal), ' +
          'opacity var(--chakra-transition-duration-normal), ' +
          'box-shadow var(--chakra-transition-duration-normal)'
      },
      '.hljs': { bg: 'none !important' }
    }
  }
});
