import { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';

import * as supabase from './config/supabase';
import * as ui from './config/ui';
import Home from './pages/Home';
// import AltHome from './pages/AltHome';
import Changelog from './pages/Changelog';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Privacy from './pages/Privacy';
import LoginDropdown from './components/LoginDropdown';
import LoginModal from './components/LoginModal';
// import Sidebar from './components/Sidebar';
import './App.css';

const cdpId = crypto.randomUUID();
const loadId = crypto.randomUUID();
const unknownId = crypto.randomUUID();

export default function App() {
  const navbar = useRef();
  const logotype = useRef();
  const githubIcon = useRef();
  const linkedinIcon = useRef();
  const xIcon = useRef();
  const logoFrames = useRef();
  const githubFrames = useRef();
  const linkedinFrames = useRef();
  const xFrames = useRef();
  const frameIndex = useRef();
  const hasCachedFrames = useRef(false);
  const [logoPath, setLogoPath] = useState(null);
  const [githubPath, setGithubPath] = useState(null);
  const [linkedinPath, setLinkedinPath] = useState(null);
  const [xPath, setXPath] = useState(null);
  const [session, setSession] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();
  const iconDimension = useBreakpointValue({ base: ui.smIconDimension, sm: ui.iconDimension });
  const isInMdView = useBreakpointValue({ base: false, md: true });
  const { colorMode, toggleColorMode } = useColorMode();
  const blueprintStroke = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const blueprintFill = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();
  const { isOpen: isSidebarOpen, onOpen: openSidebar, onToggle: toggleSidebar } = useDisclosure();
  const toast = useToast();
  const modeId = 'mode';
  const isLightMode = colorMode == 'light';
  const modeLabel = `Switch to ${isLightMode ? 'dark' : 'light'} mode`;
  const generateFrame = (canvas, path, roughParams) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    rough.canvas(tempCanvas).path(path, roughParams);

    return tempCanvas;
  };
  const handleKeyPress = (event, commitAction, cancelAction) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      commitAction(event);
    } else if (cancelAction && event.key == 'Escape') {
      event.preventDefault();
      cancelAction(event);
    }
  };
  const handleMenuOpen = () => {
    setShouldShowLogin(false);
    openMenu();
  };
  const handleError = () => {
    if (!toast.isActive(loadId)) {
      toast({
        id: loadId,
        position: 'top',
        status: 'error',
        description: ui.loadMessage,
        duration: null,
        isClosable: true
      });
    }
  };
  useEffect(() => {
    import('./paths/logotype.txt?raw').then((module) => {
      setLogoPath(module.default);
    });
    import('./paths/github.txt?raw').then((module) => {
      setGithubPath(module.default);
    });
    import('./paths/linkedin.txt?raw').then((module) => {
      setLinkedinPath(module.default);
    });
    import('./paths/x.txt?raw').then((module) => {
      setXPath(module.default);
    });

    let sessionTries = 0;
    const shouldRetrySession = (error) => {
      return (
        (error?.name == 'AuthRetryableFetchError' || error?.name == 'AbortError') &&
        sessionTries < ui.maxSessionTries
      );
    };
    const getSession = () => {
      sessionTries++;
      supabase.client.auth
        .getSession()
        .then(({ data: { session } }) => {
          setSession(session);
          setIsSessionLoading(false);
        })
        .catch((error) => {
          if (shouldRetrySession(error)) {
            setTimeout(getSession, ui.sessionRetryDelayMs);
          } else {
            setIsSessionLoading(false);
            handleError();
          }
        });
    };
    const { data } = supabase.client.auth.onAuthStateChange(async (event, session) => {
      try {
        const service = localStorage.getItem(ui.pendingWaitlistKey);

        if (event == 'SIGNED_IN' && service) {
          localStorage.removeItem(ui.pendingWaitlistKey);

          const { error } = await supabase.client.rpc('confirm_email', {
            waitlist_service: service
          });

          if (error) {
            if (!toast.isActive(unknownId)) {
              toast({
                id: unknownId,
                position: 'top',
                status: 'error',
                description: ui.errorMessage,
                duration: null,
                isClosable: true
              });
            }
          } else {
            if (!toast.isActive(cdpId)) {
              toast({
                id: cdpId,
                position: 'top',
                status: 'success',
                description: ui.cdpMessage,
                duration: null,
                isClosable: true
              });
            }
          }

          try {
            await supabase.client.auth.signOut();
          } finally {
            setSession(null);
          }
        } else {
          setSession(session);

          if (event == 'SIGNED_IN') {
            const pendingAmount = localStorage.getItem(ui.pendingPurchaseKey);

            if (pendingAmount != null) {
              localStorage.removeItem(ui.pendingPurchaseKey);
              navigate(`${ui.checkoutPath}?${ui.purchaseParam}=${pendingAmount}`);
            }
          }
        }
      } catch (error) {
        if (shouldRetrySession(error)) {
          getSession();
        } else {
          handleError();
        }
      }
    });
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    getSession();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      data.subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navbar.current) {
      const observer = new ResizeObserver(([entry]) => {
        document.documentElement.style.scrollPaddingTop = `${entry.contentRect.height}px`;
      });

      observer.observe(navbar.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [hash, pathname]);

  useEffect(() => {
    let link = document.getElementById(modeId);

    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = modeId;

      document.head.appendChild(link);
    }

    link.href = `atom-one-${colorMode}${import.meta.env.PROD ? '.min' : ''}.css`;
    document.body.style.colorScheme = colorMode;

    ui.removeCal();
  }, [colorMode]);

  useEffect(() => {
    if (logoPath && blueprintStroke && blueprintFill) {
      logoFrames.current = [];
      githubFrames.current = [];
      linkedinFrames.current = [];
      xFrames.current = [];
      frameIndex.current = 0;
      const renderFrames = () => {
        const logoCanvas = logotype.current;
        const logoContext = logoCanvas.getContext('2d');
        let frame;

        if (logoFrames.current[frameIndex.current]) {
          frame = logoFrames.current[frameIndex.current];
        } else {
          frame = generateFrame(logoCanvas, logoPath, {
            stroke: blueprintStroke,
            strokeWidth: ui.blueprintStrokeWidth,
            fill: blueprintFill,
            fillStyle: ui.logoFillStyle,
            hachureAngle: ui.blueprintAngle,
            roughness: ui.logoRoughness
          });

          logoFrames.current.push(frame);
        }

        logoContext.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
        logoContext.drawImage(frame, 0, 0);

        if (githubPath && linkedinPath && xPath && hasCachedFrames.current) {
          const limitedIndex =
            frameIndex.current % Math.round(ui.frameCount / ui.frameCountLimiter);
          const githubCanvas = githubIcon.current;
          const githubContext = githubCanvas.getContext('2d');
          const linkedinCanvas = linkedinIcon.current;
          const linkedinContext = linkedinCanvas.getContext('2d');
          const xCanvas = xIcon.current;
          const xContext = xCanvas.getContext('2d');

          if (githubFrames.current[limitedIndex]) {
            frame = githubFrames.current[limitedIndex];
          } else {
            frame = generateFrame(githubCanvas, githubPath, {
              stroke: ui.iconStroke,
              strokeWidth: ui.iconStrokeWidth,
              fill: blueprintFill,
              fillStyle: ui.iconFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.iconRoughness
            });

            githubFrames.current.push(frame);
          }

          githubContext.clearRect(0, 0, githubCanvas.width, githubCanvas.height);
          githubContext.drawImage(frame, 0, 0);

          if (!githubIcon.current.classList.contains('loaded')) {
            githubIcon.current.classList.add('loaded');
          }

          if (linkedinFrames.current[limitedIndex]) {
            frame = linkedinFrames.current[limitedIndex];
          } else {
            frame = generateFrame(linkedinCanvas, linkedinPath, {
              stroke: ui.iconStroke,
              strokeWidth: ui.iconStrokeWidth,
              fill: blueprintFill,
              fillStyle: ui.iconFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.iconRoughness
            });

            linkedinFrames.current.push(frame);
          }

          linkedinContext.clearRect(0, 0, linkedinCanvas.width, linkedinCanvas.height);
          linkedinContext.drawImage(frame, 0, 0);

          if (!linkedinIcon.current.classList.contains('loaded')) {
            linkedinIcon.current.classList.add('loaded');
          }

          if (xFrames.current[limitedIndex]) {
            frame = xFrames.current[limitedIndex];
          } else {
            frame = generateFrame(xCanvas, xPath, {
              stroke: ui.iconStroke,
              strokeWidth: ui.iconStrokeWidth,
              fill: blueprintFill,
              fillStyle: ui.iconFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.iconRoughness
            });

            xFrames.current.push(frame);
          }

          xContext.clearRect(0, 0, xCanvas.width, xCanvas.height);
          xContext.drawImage(frame, 0, 0);
          if (!xIcon.current.classList.contains('loaded')) xIcon.current.classList.add('loaded');
        }

        frameIndex.current++;

        if (!hasCachedFrames.current && frameIndex.current == ui.frameCount) {
          hasCachedFrames.current = true;
        }

        frameIndex.current = frameIndex.current % ui.frameCount;
      };
      const id = setInterval(renderFrames, ui.blueprintRefreshMs);

      renderFrames();

      return () => {
        clearInterval(id);
      };
    }
  }, [logoPath, githubPath, linkedinPath, xPath, blueprintStroke, blueprintFill]);

  return (
    <Flex w='100%' minH='100vh' direction='column'>
      <Box
        ref={navbar}
        position='sticky'
        top={0}
        zIndex='sticky'
        borderBottom='1px'
        borderColor={isScrolled ? 'fg-grid' : 'transparent'}
        bg='chakra-body-bg'
        p={2}
        shadow={isScrolled ? 'sm' : 'none'}
        transition='border-color 2s, box-shadow 2s'
      >
        <Box
          as='a'
          display='block'
          rounded='sm'
          w={ui.logoNewWidth}
          minW={ui.logoMinWidth}
          href='/'
          {...(pathname == '/' && {
            onClick: (event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          })}
          _focus={{
            outline: 'none',
            shadow: `${ui.outlineStyle} var(--chakra-colors-brand-primary)`
          }}
        >
          <canvas
            ref={logotype}
            width={ui.logoOldWidth}
            height={ui.logoOldHeight}
            style={{ width: '100%' }}
            role='img'
            aria-label={ui.logoLabel}
          />
        </Box>
        <Flex pos='absolute' right={ui.itemMargin} top={0} bottom={0} align='center'>
          <Flex display={{ base: 'none', lg: 'flex' }} align='center'>
            <Link variant='nav' ml={ui.itemMargin} href={ui.servicesPath}>
              {ui.servicesLabel}
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href={ui.pricingPath}>
              {ui.pricingLabel}
            </Link>
            {/* <Link variant='nav' ml={ui.itemMargin} href={ui.demoUrl} isExternal>
              {ui.demoLabel}
            </Link> */}
            <Link variant='nav' ml={ui.itemMargin} href={ui.docUrl}>
              {ui.docLabel}
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href={ui.changelogPath}>
              {ui.changelogLabel}
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href={ui.aboutPath}>
              {ui.aboutLabel}
            </Link>
            {/* <Link variant='nav' ml={ui.itemMargin} href={ui.llmsTxtPath}>
              {ui.llmsTxtLabel}
            </Link> */}
          </Flex>
          <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={modeLabel} hasArrow>
            <IconButton
              variant='monochrome'
              display={{ base: 'none', sm: 'inline-flex' }}
              ml={ui.itemMargin}
              icon={
                isLightMode ? <MoonIcon /> : <SunIcon sx={{ g: { strokeWidth: ui.sunStroke } }} />
              }
              fontSize='sm'
              aria-label={modeLabel}
              onClick={toggleColorMode}
            />
          </Tooltip>
          {!session && (
            <Menu
              variant='dropdown'
              strategy='fixed'
              isOpen={isMenuOpen}
              onOpen={handleMenuOpen}
              onClose={closeMenu}
            >
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={ui.menuLabel}
                isDisabled={isMenuOpen}
                hasArrow
              >
                <MenuButton
                  as={IconButton}
                  display={{ base: 'inline-flex', lg: 'none' }}
                  ml={ui.itemMargin}
                  rounded='50%'
                  bg='bg-button'
                  w={ui.controlDimension}
                  h={ui.controlDimension}
                  fontSize='xl'
                  icon={<HamburgerIcon />}
                  aria-label={ui.menuLabel}
                  _light={{ color: 'white' }}
                  _dark={{ color: 'whiteAlpha.800' }}
                  _hover={{
                    bg: 'bg-inverted',
                    _focus: { shadow: ui.outlineInset('chakra-body-bg', 'bg-inverted') }
                  }}
                />
              </Tooltip>
              <MenuList overflow='hidden'>
                <MenuItem
                  onClick={() => {
                    setShouldShowLogin(true);
                  }}
                  onKeyDown={(event) => {
                    handleKeyPress(event, () => {
                      setShouldShowLogin(true);
                    });
                  }}
                >
                  {ui.dashboardLabel}
                </MenuItem>
                <MenuItem as='a' href={ui.servicesPath}>
                  {ui.servicesLabel}
                </MenuItem>
                <MenuItem as='a' href={ui.pricingPath}>
                  {ui.pricingLabel}
                </MenuItem>
                {/* <MenuItem as='a' href={ui.demoUrl} target='_blank' rel='noopener'>
                  {ui.demoLabel}
                </MenuItem> */}
                <MenuItem as='a' href={ui.docUrl}>
                  {ui.docLabel}
                </MenuItem>
                <MenuItem as='a' href={ui.changelogPath}>
                  {ui.changelogLabel}
                </MenuItem>
                <MenuItem as='a' href={ui.aboutPath}>
                  {ui.aboutLabel}
                </MenuItem>
                {/* <MenuItem as='a' href={ui.llmsTxtPath}>
                  {ui.llmsTxtLabel}
                </MenuItem> */}
              </MenuList>
            </Menu>
          )}
          <LoginDropdown
            supabaseClient={supabase.client}
            session={session}
            setSession={setSession}
            isSessionLoading={isSessionLoading}
            shouldShowLogin={shouldShowLogin && isInMdView}
            setShouldShowLogin={setShouldShowLogin}
            toggleSidebar={toggleSidebar}
            handleKeyPress={handleKeyPress}
          />
        </Flex>
      </Box>
      <Flex direction='column' flex={1}>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                supabaseClient={supabase.client}
                session={session}
                blueprintStroke={blueprintStroke}
                blueprintFill={blueprintFill}
                generateFrame={generateFrame}
                handleKeyPress={handleKeyPress}
              />
            }
          />
          {/* <Route
            path={ui.altPath}
            element={
              <AltHome
                supabaseClient={supabase.client}
                session={session}
                blueprintStroke={blueprintStroke}
                blueprintFill={blueprintFill}
                generateFrame={generateFrame}
                handleKeyPress={handleKeyPress}
              />
            }
          /> */}
          <Route path={ui.changelogPath} element={<Changelog />} />
          <Route
            path={ui.dashboardPath}
            element={
              <Dashboard
                supabaseClient={supabase.client}
                session={session}
                isSessionLoading={isSessionLoading}
                isSidebarOpen={isSidebarOpen}
                openSidebar={openSidebar}
                toggleSidebar={toggleSidebar}
              />
            }
          />
          <Route
            path={ui.profilePath}
            element={
              <Profile
                supabaseClient={supabase.client}
                session={session}
                isSessionLoading={isSessionLoading}
              />
            }
          />
          <Route
            path={ui.checkoutPath}
            element={
              <Checkout
                supabaseClient={supabase.client}
                session={session}
                isSessionLoading={isSessionLoading}
              />
            }
          />
          <Route path={ui.privacyPath} element={<Privacy />} />
        </Routes>
      </Flex>
      <Box id='contact' mx={{ base: ui.xsMargin, lg: ui.xxlMargin }} mb={ui.iconVerticalMargin}>
        <Divider />
        <Flex mt={ui.iconVerticalMargin} direction='row' justify='space-between' align='center'>
          <Box lineHeight={0}>
            <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.githubLabel} hasArrow>
              <Link variant='social' href='https://github.com/agentfirstdev' isExternal>
                <canvas
                  ref={githubIcon}
                  className='lazy'
                  width={ui.githubOldDimension}
                  height={ui.githubOldDimension}
                  style={{ width: iconDimension, minWidth: iconDimension }}
                  role='img'
                  aria-label={ui.githubLabel}
                />
              </Link>
            </Tooltip>
            <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.linkedinLabel} hasArrow>
              <Link
                variant='social'
                ml={ui.iconHorizontalMargin}
                href='https://www.linkedin.com/company/agentfirstdev/'
                isExternal
              >
                <canvas
                  ref={linkedinIcon}
                  className='lazy'
                  width={ui.linkedinOldDimension}
                  height={ui.linkedinOldDimension}
                  style={{ width: iconDimension, minWidth: iconDimension }}
                  role='img'
                  aria-label={ui.linkedinLabel}
                />
              </Link>
            </Tooltip>
            <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.xLabel} hasArrow>
              <Link
                variant='social'
                ml={ui.iconHorizontalMargin}
                href='https://x.com/agentfirstdev'
                isExternal
              >
                <canvas
                  ref={xIcon}
                  className='lazy'
                  width={ui.xOldDimension}
                  height={ui.xOldDimension}
                  style={{ width: iconDimension, minWidth: iconDimension }}
                  role='img'
                  aria-label={ui.xLabel}
                />
              </Link>
            </Tooltip>
          </Box>
          <Text variant='attribution' display={{ base: 'none', sm: 'block' }}>
            {ui.attributionLabel}
          </Text>
          <Text variant='attribution' display={{ base: 'block', sm: 'none' }}>
            {ui.shortAttributionLabel}
          </Text>
          <Link variant='footer' display={{ base: 'none', sm: 'block' }} href={ui.privacyPath}>
            {ui.privacyLabel}
          </Link>
          <Link variant='footer' display={{ base: 'block', sm: 'none' }} href={ui.privacyPath}>
            {ui.shortPrivacyLabel}
          </Link>
        </Flex>
      </Box>
      {shouldShowLogin && !isInMdView && (
        <LoginModal
          supabaseClient={supabase.client}
          redirectUrl={ui.dashboardUrl}
          isOpen
          close={() => {
            setShouldShowLogin(false);
          }}
        />
      )}
      {/* {session && (
        <Sidebar supabaseClient={supabase.client} isOpen={isSidebarOpen} toggle={toggleSidebar} />
      )} */}
    </Flex>
  );
}
