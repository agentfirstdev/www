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
export const generatingPlaceholder = 'Generating an answer';
export const updatePlaceholder = 'Your reply to the answer above ...';
export const resetHint = 'Start a new conversation';
export const docUrl = 'https://doc.agentfirst.dev/';
export const demoUrl = 'https://dev.llamapile.com/';
export const llmsTxtUrl = 'llms.txt';
export const searchUrl = 'https://doc.agentfirst.dev/endpoints/search';
export const browsingUrl = 'https://doc.agentfirst.dev/endpoints/browser';
export const geotargetingUrl = 'https://doc.agentfirst.dev/endpoints/geotargeting';
export const completion = [
  { delay: 0, token: '(' },
  { delay: 13, token: 'w' },
  { delay: 31, token: 'e' },
  { delay: 54, token: 'b' },
  { delay: 66, token: ')' }
];
export const initialPlaceholders = [
  [
    { delay: 0, token: 'Ask' },
    { delay: 55, token: ' me' },
    { delay: 55, token: ' how' },
    { delay: 83, token: ' to' },
    { delay: 112, token: ' add' },
    { delay: 139, token: ' Agent' },
    { delay: 208, token: ' First' },
    { delay: 209, token: ' to' },
    { delay: 225, token: ' your' },
    { delay: 264, token: ' agent' },
    { delay: 292, token: ' ...' }
  ],
  [
    { delay: 0, token: 'Or' },
    { delay: 26, token: ' ask' },
    { delay: 61, token: ' me' },
    { delay: 108, token: ' what' },
    { delay: 131, token: ' I' },
    { delay: 169, token: ' can' },
    { delay: 203, token: ' do' },
    { delay: 258, token: ' for' },
    { delay: 290, token: ' you' },
    { delay: 334, token: ' ...' }
  ],
  [
    { delay: 0, token: 'Or' },
    { delay: 32, token: ' let' },
    { delay: 45, token: ' me' },
    { delay: 102, token: ' show' },
    { delay: 102, token: ' you' },
    { delay: 149, token: ' by' },
    { delay: 149, token: ' researching' },
    { delay: 172, token: ' a' },
    { delay: 198, token: ' question' },
    { delay: 221, token: ' ...' }
  ]
];
export const timelineLabels = [
  { year: 1984, paradigm: 'Desktop first', log: 1.2 },
  { year: 2000, paradigm: 'Web first', log: 0.9 },
  { year: 2008, paradigm: 'Mobile first', log: 0.6 },
  { year: 2012, paradigm: 'Cloud first', log: 1 },
  { year: 2022, paradigm: 'AI first', log: 0.6 },
  { year: 2026, paradigm: 'Agent first', log: 0.9 }
];

// Colors
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
export const blackAlpha = 'rgba(26, 32, 44, .48)';
export const whiteAlpha = 'rgba(255, 255, 255, .48)';
export const blueAlpha = 'rgba(74, 109, 229, .48)';
export const postItColors = [
  { background: { from: pastelYellow, to: naplesYellow }, border: vegasGold },
  { background: { from: asagiYellow, to: yellowOrange }, border: burntSienna },
  { background: { from: prettyPink, to: ruddyPink }, border: turkishRose }
];

// Typography
export const taglineFont = '"Fira Sans", sans-serif';
export const headingFont = '"Permanent Marker", cursive';
export const subheadingFont = '"Indie Flower", cursive';
export const bodyFont = '"Fira Sans", sans-serif';
export const footerFont = '"Fira Sans Condensed", sans-serif';

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
export const timelineWidth = { base: '100%', md: '40%' };
export const timelineMinWidth = { base: 'auto', md: '480px' };
export const hedStroke = 'transparent';
export const hedFillStyle = 'solid';
export const agentStroke = 'transparent';
export const agentFillStyle = 'solid';
export const iconStroke = 'transparent';
export const iconFillStyle = 'dots';
export const frameCount = 12;
export const frameCountLimiter = 2;
export const blueprintStrokeWidth = 4;
export const blueprintAngle = -40;
export const blueprintRefreshMs = 250;
export const logoRoughness = 2;
export const blinkCount = 2;
export const blinkIntervalMs = 600;
export const promptRefreshMs = 4000;
export const promptDelayMs = 1000;
export const servicesRoughness = 2;
export const timelineStrokeWidth = 4;
export const timelineTransitionMs = 400;
export const timelineDelayMs = 600;
export const minVisibility = 0.5;
export const hedRoughness = 2;
export const agentRoughness = 3;
export const iconStrokeWidth = 3;
export const iconRoughness = 5;

// Other shared styles
export const linkPadding = '2px';
export const outlineStyle = '0 0 0 3px';
export const outlineRadius = '2px';
export const shadowStyle = 'outline';
export const xsMargin = 4;
export const smMargin = 8;
export const mdMargin = 14;
export const lgMargin = 20;
export const xlMargin = 24;
export const gradientAngle = 140;

// Hero
export const heroHeight = '60vh';
export const heroDirection = 'column';
export const logoMargin = '8px';
export const logoNewWidth = '25%';
export const logoMinWidth = '256px';
export const taglineWidth = '100%';
export const taglineMaxWidth = '760px';
export const postItMaxWidth = '4in';
export const postItShadow = '5px 5px 15px var(--chakra-colors-chakra-shadow-color)';
export const postItRotation = '-1.5deg';
export const promptMinHeight = '108px';
export const promptMaxHeight = '180px';
export const gradientWidth = '12.5%';
export const logoOldWidth = 1760;
export const logoOldHeight = 352;
export const postItPadding = 4;
export const promptPadding = 3;
export const timelineFontSize = 28;
export const timelineClearance = 20;
export const tickLength = 16;
export const tickDistanceUnit = 420;
export const tickOffset = 48;
// export const heroDirection = { base: 'column', md: 'row' };
// export const taglineWidth = { base: '100%', md: '50%' };
export const taglineFontSize = { base: '28px', md: '66px' };
// export const taglineFontSize = { base: '28px', md: '54px' };
export const ctaFontSize = { base: '20px', md: '24px' };
// export const ctaFontSize = { base: '20px', md: '20px' };
export const postItWidth = { base: '100%', md: postItMaxWidth };
export const postItMinWidth = { base: '3.5in', md: postItMaxWidth };
export const postItFontSize = { base: '22px', md: '28px' };
export const promptFontSize = '18px';
export const teamFontSize = { base: '32px', md: '32px' };

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
export const cardWidth = { base: '100%', lg: '420px' };
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
    ':focus': { outline: 'none', shadow: shadowStyle }
  }
};

// Utils
export const renderer = markdown({ html: true, linkify: true, typographer: true }).use(highlights);
