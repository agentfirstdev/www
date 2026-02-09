import { extendTheme } from '@chakra-ui/react';

import * as ui from './config/ui';

export default extendTheme({
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#f9fafc', _dark: 'gray.800' },
      'chakra-subtle-bg': { _light: 'gray.100', _dark: 'whiteAlpha.50' },
      'bg-emphasized': { _light: 'gray.300', _dark: 'whiteAlpha.300' },
      'bg-muted': { _light: 'white', _dark: 'whiteAlpha.50' },
      'bg-inverted': { _light: 'brand.secondary', _dark: 'accent.primary' },
      'bg-panel': { _light: 'white', _dark: 'gray.700' },
      'bg-button': { _light: 'accent.secondary', _dark: 'brand.primary' },
      'bg-editor': { _light: 'white', _dark: '#2a2e37' },
      'bg-chrome': { _light: 'gray.50', _dark: '#343944' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.100' },
      'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' },
      'shadow-color': { _light: 'gray.300', _dark: 'whiteAlpha.400' },
      'fg-muted': { _light: 'gray.500', _dark: 'whiteAlpha.500' },
      'fg-grid': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'fg-gutter': { _light: 'gray.400', _dark: 'whiteAlpha.300' },
      'fg-tab': { _light: 'gray.700', _dark: 'whiteAlpha.700' },
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
    Card: {
      baseStyle: {
        header: {
          fontFamily: 'subheading',
          fontSize: { base: '2xl', md: '3xl' },
          fontWeight: 'bold',
          color: 'bg-button'
        },
        body: { pt: 0, textAlign: 'left' }
      }
    },
    List: {
      baseStyle: {
        item: {
          fontSize: { base: 'md', md: 'lg' },
          _light: { fontWeight: 300 },
          _dark: { color: 'whiteAlpha.700' }
        }
      }
    },
    Divider: {
      baseStyle: {
        _light: { borderColor: 'accent.secondary' },
        _dark: { borderColor: 'brand.primary' }
      }
    },
    Heading: {
      baseStyle: { fontSize: { base: '26px', md: '4xl' }, color: 'bg-button' },
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
        description: { _light: { fontWeight: 300 }, _dark: { color: 'whiteAlpha.700' } },
        highlight: { fontWeight: 'bold', color: 'bg-inverted' },
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
        color: 'bg-button',
        _hover: {
          textDecoration: 'none',
          color: 'bg-inverted',
          _focus: { shadow: ui.outline('bg-inverted') }
        }
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
          _focus: { shadow: ui.outline('chakra-body-text') },
          _light: { fontWeight: 'normal' },
          _dark: { fontWeight: 500 }
        },
        pricing: {
          borderBottomWidth: '2px',
          borderBottomColor: 'chakra-body-text',
          p: 0,
          fontWeight: 'normal',
          color: 'chakra-body-text',
          _hover: { color: 'chakra-body-text', _focus: { shadow: ui.outline('chakra-body-text') } },
          _focus: { shadow: ui.outline('chakra-body-text') }
        },
        team: {
          display: 'inline-block',
          borderBottomWidth: '2px',
          borderBottomColor: 'bg-button',
          p: 0,
          h: '24px',
          fontWeight: 500,
          _hover: { borderColor: 'bg-inverted' }
        },
        social: {
          display: 'inline-block',
          p: 0,
          _hover: { _focus: { shadow: ui.outline('brand-primary') } },
          _focus: { shadow: ui.outline('brand-primary') }
        }
      }
    },
    FormLabel: { baseStyle: { mr: 0, mb: 0, fontWeight: 'bold', whiteSpace: 'nowrap' } },
    Input: {
      baseStyle: {
        field: {
          _light: { borderColor: 'chakra-border-color', bg: 'white' },
          _dark: { borderColor: 'chakra-border-color', bg: 'whiteAlpha.50' }
        }
      },
      variants: {
        sidebar: {
          field: { borderWidth: '1px', _light: { bg: 'whiteAlpha.700' }, _dark: { bg: 'gray.700' } }
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
        _focus: { shadow: ui.shadowStyle },
        _disabled: {
          _light: { _hover: { bg: 'accent.secondary !important' } },
          _dark: { _hover: { bg: 'brand.primary !important' } }
        }
      },
      variants: {
        solid: {
          bg: 'bg-button',
          fontSize: { base: 'md', md: 'lg' },
          _hover: { bg: 'bg-inverted', _focus: { shadow: ui.outlineInset('bg-inverted') } },
          _focus: { shadow: ui.outlineInset('bg-button') },
          _active: { bg: 'bg-inverted' },
          _light: { color: 'white' },
          _dark: { color: 'whiteAlpha.800' }
        },
        monochrome: {
          color: 'brand.primary',
          _hover: {
            bg: 'bg-emphasized',
            color: 'bg-inverted',
            _focus: { shadow: ui.outline('bg-inverted') }
          },
          _light: { bg: 'gray.200' },
          _dark: { bg: 'whiteAlpha.200' }
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
      '::selection': { bg: 'bg-button' },
      '.chakra-ui-light ::selection': { color: 'white' },
      '.chakra-ui-dark ::selection': { color: 'whiteAlpha.800' },
      '.hljs': { bg: 'none !important' }
    }
  }
});
