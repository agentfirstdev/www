// import markdown from 'markdown-it';
// import highlights from 'markdown-it-highlightjs';

// Strings
export const logoLabel = 'Agent First';
export const servicesLabel = 'Services';
export const pricingLabel = 'Pricing';
export const docLabel = 'Documentation';
export const demoLabel = 'Live demo';
export const aboutLabel = 'About us';
export const llmsTxtLabel = 'llms.txt';
export const menuLabel = 'View site contents';
export const dashboardLabel = 'Dashboard';
export const loginLabel = 'Log in or sign up';
export const magicLabel = 'Email login link';
export const closeLabel = 'Close';
export const homeLabel = 'Home';
export const profileLabel = 'Settings';
export const supportLabel = 'Help';
export const logoutLabel = 'Logout';
export const codeLabel = 'Copy code';
export const moreLabel = 'See more';
export const startLabel = 'Get started';
export const waitLabel = 'Join waitlist';
export const waitingLabel = 'Waitlist joined';
export const firstLabel = 'Get notified first';
export const notificationLabel = 'Get notified';
export const confirmationLabel = 'Email confirmation link';
export const trialLabel = 'Free trial';
export const tryLabel = 'Start free trial';
export const tryingLabel = 'Free trial started';
export const paygLabel = 'Pay as you go';
export const enterpriseLabel = 'High volume';
export const contactLabel = 'Contact to discuss';
export const hedLabel = 'Brian hedcut';
export const agentLabel = 'Brain agent';
export const githubLabel = 'Go to our GitHub';
export const linkedinLabel = 'Go to our LinkedIn';
export const xLabel = 'Go to our X';
export const siteLabel = 'Go to Brian’s site';
export const brianGithubLabel = 'Go to Brian’s GitHub';
export const brianLinkedinLabel = 'Go to Brian’s LinkedIn';
export const brianXLabel = 'Go to Brian’s X';
export const attributionLabel = '© Agent First Dev, LLC.';
export const dailyLabel = 'By day';
export const hourlyLabel = 'By hour';
export const emailLabel = 'Email address';
export const tokenLabel = 'API token';
export const creditsLabel = 'Credit balance';
export const updateLabel = 'Coming soon ...';
export const showLabel = 'Show token';
export const hideLabel = 'Hide token';
export const copyLabel = 'Copy token';
export const checkoutLabel = 'Add credits';
export const purchaseLabel = 'Purchase API credits';
export const loadingPlaceholder = 'Loading ...';
// export const generatingPlaceholder = 'Generating an answer';
// export const updatePlaceholder = 'Your reply to the answer above ...';
export const emailPlaceholder = 'Your email address';
export const resetHint = 'Start a new conversation';
export const codeMessage = 'Code copied to clipboard';
export const copiedMessage = 'Token copied to clipboard';
// export const checkoutMessage = 'Credits added to your account';
export const confirmationMessage = 'Check your email for a confirmation link';
export const cdpMessage = 'We’ll let you know as soon as webpage interaction is available';
export const errorMessage = 'Oops, something went wrong; please try again later';
export const servicesId = 'services';
export const pricingId = 'pricing';
export const aboutId = 'about';
export const teamId = 'team';
export const servicesPath = `/#${servicesId}`;
export const pricingPath = `/#${pricingId}`;
export const aboutPath = `/#${aboutId}`;
export const teamPath = `/#${teamId}`;
export const llmsTxtPath = '/llms.txt';
export const dashboardPath = '/dashboard';
export const profilePath = '/settings';
export const checkoutPath = '/checkout';
export const homeUrl = location.origin + '/';
export const docUrl = 'https://doc.agentfirst.dev/';
export const demoUrl = 'https://dev.llamapile.com/';
export const dashboardUrl = location.origin + dashboardPath;
export const profileUrl = location.origin + profilePath;
export const checkoutUrl = location.origin + checkoutPath;
export const supportUrl = 'mailto:brain@agentfirst.dev';
export const searchUrl = 'https://doc.agentfirst.dev/endpoints/search';
export const browsingUrl = 'https://doc.agentfirst.dev/endpoints/browser';
export const geotargetingUrl = 'https://doc.agentfirst.dev/endpoints/geotargeting';
export const rateUrl = 'https://doc.agentfirst.dev/endpoints/pricing';
export const purchaseParam = 'amount';
export const pendingPurchaseKey = 'pendingAmount';
export const checkoutParam = 'session';
export const waitlistKey = 'waitlistServices';
export const pendingWaitlistKey = 'pendingWaitlistService';
export const profileKey = 'wasProfilePresented';
export const waitlistService = 'cdp';
export const completion = [
  { delay: 0, token: 'R' },
  { delay: 13, token: 'e' },
  { delay: 31, token: 'l' },
  { delay: 54, token: 'i' },
  { delay: 66, token: 'a' },
  { delay: 85, token: 'b' },
  { delay: 102, token: 'l' },
  { delay: 129, token: 'e' },
  { delay: 145, token: ' ' },
  { delay: 167, token: 'a' },
  { delay: 180, token: 'c' },
  { delay: 193, token: 'c' },
  { delay: 203, token: 'e' },
  { delay: 211, token: 's' },
  { delay: 218, token: 's' }
];
/* export const initialPlaceholders = [
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
]; */
export const timelineLabels = [
  { year: 1984, paradigm: 'Desktop first', log: 1.2 },
  { year: 2000, paradigm: 'Web first', log: 0.9 },
  { year: 2008, paradigm: 'Mobile first', log: 0.6 },
  { year: 2012, paradigm: 'Cloud first', log: 1 },
  { year: 2022, paradigm: 'AI first', log: 0.6 },
  { year: 2026, paradigm: 'Agent first', log: 0.9 }
];
export const codeLabels = { sh: 'cURL', py: 'Python', js: 'Node.js' };

// Numbers
export const cpm = 1;
export const discountedCpm = 0.9;
export const discountedPurchaseThreshold = 100;
export const minPurchaseAmount = 10;
export const accountAgeThreshold = 24 * 60 * 60 * 1000;

// Colors
export const cornflowerBlue = '#7999f7';
export const royalBlue = '#4a6de5';
export const creativeBlue = '#3057e1';
export const resolutionBlue = '#002082';
export const charcoalBlue = '#1a202c';
export const roseRed = '#e54a6d';
/* export const pastelYellow = '#fcea8b';
export const naplesYellow = '#fbe364';
export const moderateYellow = '#bcaa4b';
export const coralOrange = '#ffc876';
export const yellowOrange = '#ff9d48';
export const burntOrange = '#bf6436';
export const prettyPink = '#eaabb0';
export const ruddyPink = '#e38f95';
export const retroPink = '#aa6b70'; */
export const blackAlpha = 'rgba(26, 32, 44, 0.48)';
export const whiteAlpha = 'rgba(255, 255, 255, 0.48)';
// export const blueAlpha = 'rgba(74, 109, 229, 0.48)';
export const lightBackground = '#f9fafc';
export const darkBackground = '#1a202c';
export const lightTickColor = '#666';
export const darkTickColor = '#999';
export const lightGridColor = 'rgba(0, 0, 0, 0.1)';
export const darkGridColor = 'rgba(255, 255, 255, 0.1)';
/* export const postItColors = [
  { background: { from: pastelYellow, to: naplesYellow }, border: moderateYellow },
  { background: { from: coralOrange, to: yellowOrange }, border: burntOrange },
  { background: { from: prettyPink, to: ruddyPink }, border: retroPink }
]; */

// Typography
export const headingFont = '"Permanent Marker", cursive';
export const subheadingFont = '"Indie Flower", cursive';
export const displayFont = '"Outfit", sans-serif';
export const bodyFont = '"Outfit", sans-serif';
export const codeFont = '"JetBrains Mono", monospace';
export const footerFont = '"Outfit", sans-serif';

// Controls
export const controlDimension = '48px';
export const buttonBorder = '1px solid transparent';
export const iconDimension = '32px';
export const textboxWidth = '36ch';
export const ciphertextSpacing = '0.2rem';
export const socialDimension = '24px';
export const tooltipPadding = '6px 10px';
export const iconHorizontalMargin = 3;
export const iconVerticalMargin = 1;
export const profileHorizontalMargin = 3;
export const profileVerticalMargin = 4;
export const socialMargin = 2;
export const tooltipMargin = 1;
export const closePosition = 1.5;
export const buttonResetMs = 3000;
export const toastTimeoutMs = 3000;
export const buttonWidth = { base: '160px', md: '176px' };
export const buttonHeight = { base: controlDimension, md: '56px' };

// Animation
export const logoFillStyle = 'hachure';
export const headingFillStyle = 'solid';
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
export const headingRoughness = 2;
export const timelineStrokeWidth = 4;
export const timelineTransitionMs = 400;
export const timelineDelayMs = 600;
export const minVisibility = 0.5;
export const hedRoughness = 2;
export const agentRoughness = 3;
export const iconStrokeWidth = 3;
export const iconRoughness = 5;
export const iconRotationMs = 400;
export const hoverScale = 1.02;
export const openRotation = 45;
export const expandRotation = 180;

// Other shared styles
export const outlineStyle = '0 0 0 3px';
export const outlineRadius = '2px';
export const shadowStyle = 'outline';
export const transition = 'all var(--chakra-transition-duration-normal)';
export const horizontalDividerOverflow = '-48px';
export const verticalDividerOverflow = '-24px';
export const dividerBaseOverflow = '-16px';
export const linkPadding = '2px';
export const xsMargin = 4;
export const smMargin = 8;
export const mdMargin = 14;
export const lgMargin = 20;
export const xlMargin = 24;
export const gradientAngle = 140;
export const descriptionMargin = { base: 0, lg: smMargin };
export const cardMargin = { base: 2, lg: smMargin };
export const outline = (color) => {
  return `${outlineStyle} var(--chakra-colors-${color})`;
};
export const outlineInset = (background, foreground) => {
  return (
    '0 0 0 1px var(--chakra-colors-' +
    background +
    '), ' +
    outlineStyle +
    ' var(--chakra-colors-' +
    foreground +
    ')'
  );
};

// Header
export const badgeSize = '1.5rem';
export const loginMargin = '0 0.5rem';
export const loginWidth = '420px';
export const loginTextboxMargin = '1em';
export const loginButtonMargin = '1em 0 0.5em auto';
export const loginMessageMargin = '0.5em';
export const loginMessagePadding = '11px 15px';
export const itemMargin = { base: 5, lg: 6 };
export const sunStroke = 3;

// Hero
export const heroHeight = '50vh';
// export const logoMargin = '8px';
export const logoNewWidth = '25%';
export const logoMinWidth = '256px';
export const taglineWidth = '100%';
export const taglineMaxWidth = '660px';
/* export const postItMaxWidth = '4in';
export const postItShadow = '5px 5px 15px var(--chakra-colors-shadow-color)';
export const postItRotation = '-1.5deg'; */
export const promptMinHeight = '108px';
export const promptMaxHeight = '180px';
export const gradientWidth = '12.5%';
export const logoOldWidth = 1760;
export const logoOldHeight = 352;
// export const postItPadding = 4;
export const promptPadding = 3;
export const timelineFontSize = 28;
export const timelineClearance = 20;
export const tickLength = 16;
export const tickDistanceUnit = 420;
export const tickOffset = 48;
// export const taglineWidth = { base: '100%', md: '50%' };
export const taglineFontSize = { base: '26px', lg: '60px' };
export const ctaFontSize = { base: '20px', lg: '24px' };
/* export const postItWidth = { base: '100%', md: postItMaxWidth };
export const postItMinWidth = { base: '3.5in', md: postItMaxWidth }; */
export const postItFontSize = { base: '22px', md: '28px' };
export const promptFontSize = '18px';
export const teamFontSize = { base: '32px', md: '32px' };

// Services
export const servicesNewWidth = '20%';
export const servicesMinWidth = '204px';
export const servicesOldWidth = 1376;
export const servicesOldHeight = 320;

// Code
export const chromeButtonMargin = '0.5em';
export const chromeButtonPadding = '0.75em';
export const chromeIconDimension = '16px';
export const chromeButtonDimension = 9;
export const editorHorizontalMargin = { base: '1.5em', md: '2em' };
export const editorVerticalMargin = { base: '0.75em', md: '1em' };
export const editorFontSize = { base: 'sm', md: 'md' };
export const chromePadding = { base: '0.75em', md: '1em' };

// Pricing
export const pricingNewWidth = '20%';
export const pricingMinWidth = '190px';
export const pricingOldWidth = 1284;
export const pricingOldHeight = 320;
export const pricingOpacity = 0.75;

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

// Sidebar
export const sidebarWidth = '560px';
// export const sidebarMargin = `calc(100% - ${sidebarWidth} - ${sidebarWidth} + 4vw)`;
export const sidebarCollapsedWidth = '40px';
/* export const sidebarCollapsedMargin =
  'calc(100% - ' + sidebarCollapsedWidth + ' - ' + sidebarCollapsedWidth + ' + 4vw)'; */
export const sidebarTravel = `calc(-${sidebarWidth} + ${sidebarCollapsedWidth})`;
export const sidebarEasing = 'backOut';
export const sidebarPadding = 6;
// export const sidebarCollapsedPadding = 20;
export const sidebarCollapseSecs = 0.2;

// Secondary pages
export const secondaryTextboxWidth = '40ch';
export const secondaryWidth = { base: '100%', lg: '80%' };

// Chart
export const dateFormat = 'YYYY-MM-DD';
export const timeFormat = 'HH:00:00';
export const spinnerWidth = '4px';
export const chartRoughness = 2;
export const labelRotation = 30;
export const horizontalLabelSize = 12;
export const maxHorizontalTicks = 15;
export const verticalLabelSize = 14;
export const maxVerticalTicks = 10;
export const lineWidth = 3;
export const lineTension = 0.25;
export const pointRadius = 4;
export const pointHoverRadius = 5;
export const legendFontSize = 16;
export const tooltipFontSize = 12;
export const defaultDayCount = 7;

// Checkout
export const checkoutWidth = '380px';
export const purchaseAmountPadding = 7;
export const purchaseDecimalPlaces = 0;

// Utils
/* export const renderer = markdown({ html: true, linkify: true, typographer: true }).use(
  highlights
); */
