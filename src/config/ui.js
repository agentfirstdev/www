import markdown from 'markdown-it';
import highlights from 'markdown-it-highlightjs';

// Strings
export const logoLabel = 'Agent First';
export const servicesLabel = 'Services';
export const hedLabel = 'Brian Kennish hedcut';
export const agentLabel = 'Brain agent';
export const demoUrl = 'https://dev.llamapile.com/';

// Colors
export const blackLightAlpha = 'rgba(0, 0, 0, .24)';
export const blackDarkAlpha = 'rgba(0, 0, 0, .64)';
export const cornflowerBlue = '#7999f7';
export const royalBlue = '#4a6de5';
export const creativeBlue = '#3057e1';
export const resolutionBlue = '#002082';
export const pastelYellow = '#fcea8b';
export const naplesYellow = '#fbe364';
export const vegasGold = '#bcaa4b';
export const prettyPink = '#eaabb0';
export const ruddyPink = '#e38f95';
export const turkishRose = '#aa6b70';
export const royalOrange = '#f99245';
export const postItColors = [
  { background: { from: pastelYellow, to: naplesYellow }, border: vegasGold },
  { background: { from: prettyPink, to: ruddyPink }, border: turkishRose }
];

// Controls
export const tooltipPadding = '6px 10px';
export const controlHeight = { base: '48px', md: '56px' };
export const buttonWidth = { base: '160px', md: '176px' };

// Animation
export const logoFill = 'hachure';
export const servicesFill = 'solid';
export const hedStroke = 'transparent';
export const hedFill = 'solid';
export const agentStroke = 'transparent';
export const agentFill = 'solid';
export const blueprintStroke = 4;
export const blueprintAngle = -40;
export const blueprintRefreshMs = 250;
export const logoRoughness = 2;
export const servicesRoughness = 3;
export const hedRoughness = 2;
export const agentRoughness = 3;

// Other shared styles
export const linkPadding = '2px';
export const outlineStyle = 'none';
export const outlineRadius = '2px';
export const shadowStyle = 'outline';
export const smMargin = 8;
export const mdMargin = 14;
export const lgMargin = 20;
export const xlMargin = 24;
export const gradientAngle = 140;

// Header
export const menuTopBorder = '5px 5px 0 0';
export const menuBottomBorder = '0 0 5px 5px';
export const navPosition = 6;
export const itemMargin = 6;

// Hero
export const postItDimension = '4in';
export const postItFont = '28px';
export const postItShadow = '5px 5px 15px var(--chakra-colors-chakra-shadow-color)';
export const postItRotation = '-1.5deg';
export const postItPadding = 4;

// Team
export const hedMaxWidth = '240px';
export const agentMaxWidth = '216px';
export const cardWidth = { base: '100%', lg: '410px' };
export const nameFont = { base: '2xl', md: '3xl' };
export const hedMargin = { base: '-4.5%', lg: '-16px' };
export const hedWidth = { base: '45%', lg: '160px' };
export const agentWidth = { base: '40%', lg: '144px' };

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
