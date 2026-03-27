import { extendTheme } from '@chakra-ui/react';

import * as ui from './config/ui';

export default extendTheme({
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: ui.lightBackground, _dark: ui.darkBackground },
      'chakra-subtle-bg': { _light: 'gray.100', _dark: 'whiteAlpha.50' },
      'bg-emphasized': { _light: 'gray.300', _dark: 'whiteAlpha.300' },
      'bg-muted': { _light: 'white', _dark: 'whiteAlpha.50' },
      'bg-inverted': { _light: 'brand.secondary', _dark: 'accent.primary' },
      'bg-panel': { _light: 'white', _dark: 'gray.700' },
      'bg-button': { _light: 'accent.secondary', _dark: 'brand.primary' },
      'bg-editor': { _light: 'white', _dark: '#2a2e37' },
      'bg-chrome': { _light: 'gray.50', _dark: '#343944' },
      'bg-success': { _light: 'green.100', _dark: 'rgba(154, 230, 180, 0.16)' },
      'bg-failure': { _light: 'red.100', _dark: 'rgba(254, 178, 178, 0.16)' },
      'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.100' },
      'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.500' },
      'shadow-color': { _light: 'gray.300', _dark: 'whiteAlpha.400' },
      'fg-muted': { _light: 'gray.600', _dark: 'whiteAlpha.600' },
      'fg-grid': { _light: 'gray.200', _dark: 'whiteAlpha.200' },
      'fg-button': { _light: 'white', _dark: 'whiteAlpha.800' },
      'fg-gutter': { _light: 'gray.400', _dark: 'whiteAlpha.400' },
      'fg-tab': { _light: 'gray.700', _dark: 'whiteAlpha.700' },
      'fg-success': { _light: 'green.600', _dark: 'green.200' },
      'fg-failure': { _light: 'red.600', _dark: 'red.200' },
      'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.800' }
    }
  },
  colors: {
    brand: { primary: ui.royalBlue, secondary: ui.resolutionBlue },
    accent: { primary: ui.cornflowerBlue, secondary: ui.creativeBlue },
    outline: ui.royalBlue
  },
  shadows: { outline: ui.outline('outline') },
  fonts: {
    heading: ui.headingFont,
    subheading: ui.subheadingFont,
    display: ui.displayFont,
    body: ui.bodyFont,
    code: ui.codeFont
  },
  components: {
    Table: {
      sizes: {
        md: {
          thead: { bg: ui.lightGrayAlpha },
          th: { py: 4, fontSize: { base: '2xs', lg: '13px' }, color: 'fg-muted' },
          tbody: {
            bg: 'bg-muted',
            lineHeight: 4,
            fontFamily: 'code',
            fontSize: { base: '2xs', lg: '13px' }
          }
        }
      }
    },
    Card: {
      baseStyle: {
        container: { shadow: 'none' },
        header: {
          textAlign: { base: 'left', sm: 'center' },
          fontSize: 'xl',
          fontWeight: 'bold',
          color: 'bg-button'
        },
        body: { pt: 0, textAlign: 'left' },
        footer: { pt: 0 }
      },
      variants: {
        pricing: {
          container: {
            borderWidth: '1px',
            borderColor: 'chakra-border-color',
            bg: 'bg-muted',
            w: '100%',
            maxW: ui.cardWidth,
            cursor: 'pointer',
            '--card-padding': 'sizes.6'
          }
        },
        teammate: { body: { px: 0 }, footer: { px: 0 } }
      }
    },
    List: {
      baseStyle: {
        item: {
          fontSize: { base: 'md', md: 'lg' },
          fontWeight: 'light',
          _dark: { color: 'whiteAlpha.700' },
          '::marker': { fontSize: '1.25em' }
        }
      },
      variants: {
        pricing: {
          item: { listStyleType: 'none', fontSize: 'sm', fontWeight: 'normal' },
          icon: { color: 'bg-button' }
        },
        citations: {
          container: { textAlign: 'left' },
          item: {
            fontSize: { base: '9px', sm: '2xs !important', lg: 'xs !important' },
            fontWeight: 'medium',
            color: 'bg-button',
            '::marker': { fontSize: 'inherit', color: 'bg-button' }
          }
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
        tagline: {
          lineHeight: 1.1,
          fontFamily: 'display',
          fontWeight: 'extrabold',
          color: 'chakra-body-text'
        },
        'post-it': { color: 'gray.800' },
        service: { fontFamily: 'subheading', fontSize: '2xl' },
        team: { textAlign: 'center', fontWeight: 'normal' },
        name: { fontFamily: 'subheading' },
        secondary: { mt: ui.lgMargin, mb: ui.xsMargin, fontFamily: 'body', color: 'fg-muted' },
        dropdown: { fontFamily: 'subheading', fontSize: '1.25rem' }
      }
    },
    Text: {
      baseStyle: { fontSize: { base: 'md', md: 'lg' } },
      variants: {
        pill: {
          verticalAlign: 'middle',
          fontFamily: 'body',
          fontSize: { base: '9px', sm: '2xs !important', lg: 'xs !important' },
          fontWeight: 'medium',
          color: 'bg-button'
        },
        audience: {
          fontFamily: 'code',
          fontSize: { base: '8px', sm: '9px', md: '11px !important' },
          fontWeight: 'semibold',
          textTransform: 'uppercase',
          letterSpacing: '.2em',
          color: 'fg-muted'
        },
        subheading: { fontSize: ui.subheadingFontSize, fontWeight: 'light', color: 'fg-muted' },
        altheading: { fontSize: ui.altSubheadingFontSize, fontWeight: 'light', color: 'fg-muted' },
        'post-it': {
          my: 6,
          textAlign: 'left',
          fontFamily: 'subheading',
          fontSize: ui.postItFontSize,
          color: 'gray.800'
        },
        service: { mt: ui.xxsMargin, fontWeight: 'light', _dark: { color: 'whiteAlpha.700' } },
        pricing: { fontSize: 'sm', fontWeight: 'normal', color: 'chakra-placeholder-color' },
        teammate: { mt: 2, fontSize: 'md', fontWeight: 'light', color: 'bg-button' },
        attribution: {
          pos: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: { base: 'xs', md: 'sm' },
          fontWeight: 'light',
          color: 'bg-button'
        },
        description: { fontWeight: 'light', _dark: { color: 'whiteAlpha.700' } },
        bold: { fontSize: 'inherit' },
        lede: { fontSize: { base: '1.25em', md: '1.5em' }, color: 'chakra-body-text' },
        name: { lineHeight: 1.25, fontFamily: 'subheading', fontSize: 'larger' },
        co: { mx: '.2em', fontFamily: 'heading', fontSize: 'inherit', fontWeight: 'normal' },
        footerCo: { mx: '.1em', fontFamily: 'heading', fontSize: 'inherit', fontWeight: 'normal' },
        amount: { fontSize: '3em', color: 'chakra-body-text' }
      }
    },
    Link: {
      baseStyle: {
        position: 'relative',
        top: '-1px',
        rounded: ui.outlineRadius,
        p: '2px',
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
        marker: {
          fontWeight: 'medium',
          _focus: { shadow: `${ui.smOutlineStyle} var(--chakra-colors-brand-primary)` }
        },
        doc: {
          display: { base: 'none', lg: 'inline' },
          position: 'absolute',
          right: ui.codeHorizontalMargin,
          bottom: ui.codeVerticalMargin,
          fontSize: ui.codeFontSize,
          fontWeight: 'normal',
          color: 'chakra-body-text',
          _focus: { shadow: ui.outline('chakra-body-text') }
        },
        pricing: {
          borderBottomWidth: '1px',
          borderBottomColor: 'chakra-body-text',
          p: 0,
          fontWeight: 'light',
          color: 'chakra-body-text',
          _hover: { color: 'chakra-body-text', _focus: { shadow: ui.outline('chakra-body-text') } },
          _focus: { shadow: ui.outline('chakra-body-text') }
        },
        team: {
          display: 'inline-block',
          borderBottomWidth: '2px',
          borderBottomColor: 'bg-button',
          p: 0,
          h: '22px',
          fontWeight: 'medium',
          _hover: { borderColor: 'bg-inverted' }
        },
        social: {
          display: 'inline-block',
          p: 0,
          _hover: { _focus: { shadow: ui.outline('brand-primary') } },
          _focus: { shadow: ui.outline('brand-primary') }
        },
        citation: {
          fontWeight: 'medium',
          _focus: { shadow: `${ui.smOutlineStyle} var(--chakra-colors-brand-primary)` }
        },
        footer: { fontSize: { base: 'xs', md: 'sm' }, fontWeight: 'light' }
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
        outline: {
          field: { _focus: { borderColor: 'bg-button', boxShadow: ui.outline('bg-button') } }
        },
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
        fontSize: ui.promptFontSize,
        fontWeight: 'light',
        _placeholder: { color: 'chakra-placeholder-color' }
      },
      variants: { outline: { borderWidth: '2px', bg: 'chakra-subtle-bg' } }
    },
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        _disabled: {
          _light: { _hover: { bg: 'accent.secondary !important' } },
          _dark: { _hover: { bg: 'brand.primary !important' } }
        },
        _hover: { borderColor: 'transparent' },
        _focus: { shadow: ui.shadowStyle }
      },
      variants: {
        solid: {
          bg: 'bg-button',
          fontSize: { base: 'md', md: 'lg' },
          color: 'fg-button',
          _hover: {
            bg: 'bg-inverted',
            _focus: { shadow: ui.outlineInset('chakra-body-bg', 'bg-inverted') }
          },
          _focus: { shadow: ui.outlineInset('chakra-body-bg', 'bg-button') },
          _active: { bg: 'bg-inverted' }
        },
        outline: {
          borderWidth: '1px',
          borderColor: 'bg-button',
          w: '100%',
          h: ui.controlDimension,
          fontSize: { base: 'md', md: 'lg' },
          color: 'bg-button',
          _disabled: {
            _light: { _hover: { borderColor: 'bg-button', bg: 'inherit', color: 'bg-button' } },
            _dark: { _hover: { borderColor: 'bg-button', bg: 'inherit', color: 'bg-button' } }
          },
          _hover: {
            borderColor: 'bg-inverted',
            bg: 'transparent',
            color: 'bg-inverted',
            _focus: { shadow: ui.outline('bg-inverted') }
          },
          _focus: { shadow: ui.outline('bg-button') },
          _active: { bg: 'transparent' }
        },
        monochrome: {
          color: 'brand.primary',
          _light: { bg: 'gray.200' },
          _dark: { bg: 'whiteAlpha.200' },
          _hover: {
            bg: 'bg-emphasized',
            color: 'bg-inverted',
            _focus: { shadow: ui.outline('bg-inverted') }
          }
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
        list: { p: 0, shadow: 'sm' },
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
            fontFamily: 'display',
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
          'box-shadow var(--chakra-transition-duration-normal), ' +
          'transform var(--chakra-transition-duration-normal)'
      },
      '::selection': { bg: 'bg-button' },
      '.chakra-ui-light ::selection': { color: 'white' },
      '.chakra-ui-dark ::selection': { color: 'whiteAlpha.800' },
      '.hljs': { bg: 'none !important' },
      '.DateRangePicker, .DateRangePicker *': { fontFamily: 'display' }
    }
  }
});
