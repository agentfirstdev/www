import markdown from 'markdown-it';
import highlights from 'markdown-it-highlightjs';

// Strings
export const logoLabel = 'Agent First';
export const menuLabel = 'View site contents';
export const servicesLabel = 'Services';
export const hedLabel = 'Brian hedcut';
export const agentLabel = 'Brain agent';
export const githubLabel = 'Go to our GitHub';
export const linkedinLabel = 'Go to our LinkedIn';
export const xLabel = 'Go to our X';
export const siteLabel = 'Go to Brian’s site';
export const brianGithubLabel = 'Go to Brian’s GitHub';
export const brianLinkedinLabel = 'Go to Brian’s LinkedIn';
export const brianXLabel = 'Go to Brian’s X';
export const docUrl = 'https://doc.agentfirst.dev/';
export const demoUrl = 'https://dev.llamapile.com/';
export const llmsTxtUrl = 'llms.txt';

// Colors
export const blackAlpha = 'rgba(0, 0, 0, .56)';
export const cornflowerBlue = '#7999f7';
export const royalBlue = '#4a6de5';
export const creativeBlue = '#3057e1';
export const resolutionBlue = '#002082';
export const pastelYellow = '#fcea8b';
export const naplesYellow = '#fbe364';
export const vegasGold = '#bcaa4b';
export const asagiYellow = '#ffc876';
export const yellowOrange = '#ff9d48';
export const burntSienna = '#bf6436';
export const prettyPink = '#eaabb0';
export const ruddyPink = '#e38f95';
export const turkishRose = '#aa6b70';
export const postItColors = [
  { background: { from: pastelYellow, to: naplesYellow }, border: vegasGold },
  { background: { from: asagiYellow, to: yellowOrange }, border: burntSienna },
  { background: { from: prettyPink, to: ruddyPink }, border: turkishRose }
];

// Controls
export const controlDimension = '48px';
export const iconDimension = '32px';
export const socialDimension = '24px';
export const menuTopBorder = '5px 5px 0 0';
export const menuBottomBorder = '0 0 5px 5px';
export const tooltipPadding = '6px 10px';
export const itemMargin = 6;
export const iconHorizontalMargin = 3;
export const iconVerticalMargin = 1;
export const socialMargin = 2;
export const tooltipMargin = 1;
export const hamburgerTopMargin = -1;
export const hamburgerLeftMargin = 4;
export const sunStroke = 3;
export const buttonWidth = { base: '160px', md: '176px' };
export const buttonHeight = { base: controlDimension, md: '56px' };
export const navTopPosition = { base: 4, lg: 6 };
export const navRightPosition = { base: 4, lg: 6 };

// Animation
export const logoFillStyle = 'hachure';
export const servicesFillStyle = 'solid';
export const hedStroke = 'transparent';
export const hedFillStyle = 'solid';
export const agentStroke = 'transparent';
export const agentFillStyle = 'solid';
export const iconStroke = 'transparent';
export const iconFillStyle = 'dots';
export const frameCount = 12;
export const blueprintStrokeWidth = 4;
export const blueprintAngle = -40;
export const blueprintRefreshMs = 250;
export const logoRoughness = 2;
export const servicesRoughness = 3;
export const hedRoughness = 2;
export const agentRoughness = 3;
export const iconStrokeWidth = 3;
export const iconRoughness = 5;

// Other shared styles
export const linkPadding = '2px';
export const outlineStyle = 'none';
export const outlineRadius = '2px';
export const shadowStyle = 'outline';
export const xsMargin = 4;
export const smMargin = 8;
export const mdMargin = 14;
export const lgMargin = 20;
export const xlMargin = 24;
export const gradientAngle = 140;

// Hero
export const logoMargin = '8px';
export const logoNewWidth = '25%';
export const logoMinWidth = '256px';
export const postItMaxWidth = '4in';
export const postItShadow = '5px 5px 15px var(--chakra-colors-chakra-shadow-color)';
export const postItRotation = '-1.5deg';
export const logoOldWidth = 1760;
export const logoOldHeight = 352;
export const postItPadding = 4;
export const postItWidth = { base: '100%', md: postItMaxWidth };
export const postItMinWidth = { base: '3.5in', md: postItMaxWidth };
export const postItFont = { base: '22px', md: '28px' };

// Services
export const servicesBorder = '1px solid var(--chakra-colors-chakra-border-color)';
export const servicesNewWidth = '20%';
export const servicesMinWidth = '204px';
export const servicesOldWidth = 1376;
export const servicesOldHeight = 320;

// Team
export const hedMaxWidth = '240px';
export const agentMaxWidth = '216px';
export const hedOldWidth = 608;
export const hedOldHeight = 912;
export const agentOldWidth = 1024;
export const agentOldHeight = 1536;
export const siteOldDimension = 640;
export const githubOldDimension = 640;
export const linkedinOldDimension = 640;
export const xOldDimension = 640;
export const cardWidth = { base: '100%', lg: '400px' };
export const nameFont = { base: '2xl', md: '3xl' };
export const hedMargin = { base: '-5.5%', lg: '-16px' };
export const hedNewWidth = { base: '55%', lg: '160px' };
export const hedTransform = { base: 'translateX(-11%)', lg: 'translateX(-16px)' };
export const agentNewWidth = { base: '50%', lg: '144px' };

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
