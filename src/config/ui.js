import markdown from 'markdown-it';
import highlights from 'markdown-it-highlightjs';

// Strings
export const logoLabel = 'Agent First';
export const demoUrl = 'https://llamapile.com/';

// Colors
export const royalBlue = '#4a6de5';
export const creativeBlue = '#3057e1';
export const resolutionBlue = '#002082';
export const sweetCorn = '#fcea8b';
export const portica = '#fbe364';
export const roti = '#bcaa4b';
export const shilo = '#eaabb0';
export const ruddyPink = '#e38f95';
export const coralTree = '#aa6b70';
export const jaffa = '#ff8840';
export const postItColors = [
  { background: { from: sweetCorn, to: portica }, border: roti },
  { background: { from: shilo, to: ruddyPink }, border: coralTree }
];

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
export const sectionMargin = 8;
export const sectionPadding = 24;
export const gradientAngle = 140;

// Controls
export const tooltipPadding = '6px 10px';

// Header
export const navPosition = 6;
export const itemMargin = 6;

// Hero
export const postItPadding = 4;
export const postItDimension = '4in';
export const postItShadow = '5px 5px 15px var(--chakra-colors-chakra-shadow-color)';
export const postItRotation = '-1.5deg';

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
