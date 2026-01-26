import { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Divider,
  Text,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';

import * as supabase from './config/supabase';
import * as ui from './config/ui';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import './App.css';

export default function App() {
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
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const blueprintStroke = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const blueprintFill = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();
  const { isOpen: isSidebarOpen, onToggle: toggleSidebar } = useDisclosure();
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

    const { data } = supabase.client.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    supabase.client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let link = document.getElementById(modeId);

    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = modeId;

      document.head.appendChild(link);
    }

    link.href = `atom-one-${colorMode}${import.meta.env.PROD ? '.min' : ''}.css`;
  }, [colorMode]);

  useEffect(() => {
    if (logoPath && blueprintStroke && blueprintFill) {
      logoFrames.current = [];
      githubFrames.current = [];
      linkedinFrames.current = [];
      xFrames.current = [];
      frameIndex.current = 0;
      const logoCanvas = logotype.current;
      const logoContext = logoCanvas.getContext('2d');
      const renderFrames = () => {
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
      <Box>
        <Box {...(location.pathname != '/' ? { as: 'a', href: '/' } : {})}>
          <canvas
            ref={logotype}
            width={ui.logoOldWidth}
            height={ui.logoOldHeight}
            style={{ marginTop: ui.logoMargin, width: ui.logoNewWidth, minWidth: ui.logoMinWidth }}
            role='img'
            aria-label={ui.logoLabel}
          />
        </Box>
        <Flex pos='absolute' top={ui.navTopPosition} right={ui.navRightPosition} align='center'>
          <Flex display={{ base: 'none', lg: 'flex' }} align='center'>
            <Link variant='nav' ml={ui.itemMargin} href='/#services'>
              Services
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href='/#pricing'>
              Pricing
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href={ui.docUrl}>
              Documentation
            </Link>
            {/* <Link variant='nav' ml={ui.itemMargin} href={ui.demoUrl} isExternal>
              Live demo
            </Link> */}
            <Link variant='nav' ml={ui.itemMargin} href='/#about'>
              About us
            </Link>
            {/* <Link variant='nav' ml={ui.itemMargin} href={ui.llmsTxtUrl}>
              llms.txt
            </Link> */}
          </Flex>
          <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={modeLabel} hasArrow>
            <IconButton
              variant='monochrome'
              ml={ui.itemMargin}
              icon={
                isLightMode ? <MoonIcon /> : <SunIcon sx={{ g: { strokeWidth: ui.sunStroke } }} />
              }
              fontSize='sm'
              aria-label={modeLabel}
              onClick={toggleColorMode}
            />
          </Tooltip>
          <Login
            supabaseClient={supabase.client}
            session={session}
            setSession={setSession}
            shouldShowLogin={shouldShowLogin}
            setShouldShowLogin={setShouldShowLogin}
            handleKeyPress={handleKeyPress}
          />
          <Menu strategy='fixed' isOpen={isMenuOpen} onOpen={handleMenuOpen} onClose={closeMenu}>
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
                mt={ui.hamburgerTopMargin}
                ml={ui.hamburgerLeftMargin}
                borderRadius='50%'
                bg='brand.secondary'
                w={ui.controlDimension}
                h={ui.controlDimension}
                fontSize='xl'
                icon={<HamburgerIcon />}
                aria-label={ui.menuLabel}
                _hover={{ bg: 'accent.secondary' }}
                _dark={{ bg: 'brand.primary', color: 'whiteAlpha.800' }}
              />
            </Tooltip>
            <MenuList p='0'>
              <MenuItem
                borderRadius={ui.menuBottomBorder}
                onClick={() => {
                  setShouldShowLogin(true);
                }}
                onKeyDown={(event) => {
                  handleKeyPress(event, () => {
                    setShouldShowLogin(true);
                  });
                }}
              >
                Dashboard
              </MenuItem>
              <MenuItem as='a' borderRadius={ui.menuTopBorder} href='#services'>
                Services
              </MenuItem>
              <MenuItem as='a' borderRadius='0' href='#pricing'>
                Pricing
              </MenuItem>
              <MenuItem as='a' borderRadius='0' href={ui.docUrl}>
                Documentation
              </MenuItem>
              {/* <MenuItem
                as='a'
                borderRadius='0'
                href={ui.demoUrl}
                target='_blank'
                rel='noopener'
              >
                Live demo
              </MenuItem> */}
              <MenuItem as='a' borderRadius='0' href='#about'>
                About us
              </MenuItem>
              {/* <MenuItem as='a' borderRadius='0' href={ui.llmsTxtUrl}>
                llms.txt
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              blueprintStroke={blueprintStroke}
              blueprintFill={blueprintFill}
              generateFrame={generateFrame}
              handleKeyPress={handleKeyPress}
            />
          }
        />
        <Route path={ui.profilePath} element={<Profile supabaseClient={supabase.client} />} />
      </Routes>
      <Box
        id='contact'
        mx={{ base: ui.smMargin, lg: ui.xlMargin }}
        mt={ui.smMargin}
        mb={ui.xsMargin}
      >
        <Divider />
        <Flex mt={ui.iconVerticalMargin} direction='row' justify='space-between' align='center'>
          <Box lineHeight='0'>
            <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.githubLabel} hasArrow>
              <Link variant='social' href='https://github.com/agentfirstdev' isExternal>
                <canvas
                  ref={githubIcon}
                  className='lazy'
                  width={ui.githubOldDimension}
                  height={ui.githubOldDimension}
                  style={{ width: ui.iconDimension, minWidth: ui.iconDimension }}
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
                  style={{ width: ui.iconDimension, minWidth: ui.iconDimension }}
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
                  style={{ width: ui.iconDimension, minWidth: ui.iconDimension }}
                  role='img'
                  aria-label={ui.xLabel}
                />
              </Link>
            </Tooltip>
          </Box>
          <Text variant='attribution'>© Agent First Dev, LLC.</Text>
        </Flex>
      </Box>
      {session && (
        <Sidebar
          supabaseClient={supabase.client}
          isOpen={isSidebarOpen}
          toggle={toggleSidebar}
          handleKeyPress={handleKeyPress}
          handleMenuOpen={handleMenuOpen}
        />
      )}
    </Flex>
  );
}
