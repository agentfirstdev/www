import markdown from 'markdown-it';
import highlights from 'markdown-it-highlightjs';

// Strings
export const logoLabel = 'Agent First';
export const Tagline = () => {
  return (
    <>
      Tools & services for
      <br />
      agent-first development
    </>
  );
};

// Colors
export const eggWhite = '#fef4c1';
export const indianKhaki = '#bfb791';
export const royalBlue = '#4a6de5';
export const creativeBlue = '#3057e1';
export const resolutionBlue = '#002082';

// Typography
export const controlFontWeight = 'semibold';

// Animation
export const logoStroke = 4;
export const logoRoughness = 2;
export const logoAngle = -40;
export const logoRefreshMs = 250;

// Other shared styles
export const linkPadding = '2px';
export const outlineStyle = 'none';
export const outlineRadius = '2px';
export const shadowStyle = 'outline';
export const transition = 'all var(--chakra-transition-duration-normal)';

// Controls
export const tooltipPadding = '6px 10px';

// Header
export const navPosition = 6;

// Hero
export const postItPadding = 4;
export const postItDimension = '380px';
export const postItShadow = '5px 5px 15px rgba(0, 0, 0, .3)';
export const postItRotation = '-3deg';

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
