import markdown from 'markdown-it';
import highlights from 'markdown-it-highlightjs';

// Typography
export const controlFontWeight = 'semibold';

// Animation
export const logoRefreshMs = 250;

// Other shared styles
export const scrollingWidth = '96vw';
export const linkPadding = '2px';
export const outlineStyle = 'none';
export const outlineRadius = '2px';
export const shadowStyle = 'outline';
export const transition = 'all var(--chakra-transition-duration-normal)';

// Controls
export const tooltipPadding = '6px 10px';

// Header
export const navPosition = 6;

// Secondary pages
export const secondaryStyle = {
  h3: { mt: '1.5rem', fontWeight: 'bold', color: 'brand.secondary' },
  a: {
    mx: '-1px',
    borderRadius: '2px',
    padding: '1px',
    color: 'accent.secondary',
    ':hover': { color: 'brand.secondary' },
    ':focus': { outline: outlineStyle, shadow: shadowStyle }
  }
};

// Utils
export const renderer = markdown({ html: true, linkify: true, typographer: true }).use(highlights);
