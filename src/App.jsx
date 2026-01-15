// eslint-disable-next-line no-unused-vars
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import {
  Box,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Text,
  Code,
  Link,
  Textarea, // eslint-disable-line no-unused-vars
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
// eslint-disable-next-line no-unused-vars
import { SunIcon, MoonIcon, HamburgerIcon, AddIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';
import { createTimeline } from 'animejs';

import * as supabase from './config/supabase';
import * as ui from './config/ui';
import * as uix from './config/uix';
import search from './markdown/search.md?raw';
import browsing from './markdown/browsing.md?raw';
import searchGeotargeting from './markdown/geotargeting-search.md?raw';
import browsingGeotargeting from './markdown/geotargeting-browsing.md?raw';
import Login from './components/Login';
import './App.css';

export default function App() {
  const logotype = useRef();
  const completion = useRef();
  // const promptBox = useRef();
  const services = useRef();
  const timeline = useRef();
  const timelineParts = useRef();
  const team = useRef();
  const hedcut = useRef();
  const agent = useRef();
  const githubIcon = useRef();
  const linkedinIcon = useRef();
  const xIcon = useRef();
  const siteIcon = useRef();
  const brianGithubIcon = useRef();
  const brianLinkedinIcon = useRef();
  const brianXIcon = useRef();
  const logoFrames = useRef();
  // const promptBoxHeight = useRef();
  const servicesFrames = useRef();
  const timelineAnimation = useRef();
  const hedFrames = useRef();
  const agentFrames = useRef();
  const githubFrames = useRef();
  const linkedinFrames = useRef();
  const xFrames = useRef();
  const siteFrames = useRef();
  const frameIndex = useRef();
  // const promptInterval = useRef();
  // const promptTimeouts = useRef();
  // const candidatePrompt = useRef();
  const hasCachedFrames = useRef(false);
  const hasAnimatedCompletion = useRef(false);
  const hasAnimatedTimeline = useRef(false);
  // const hasScrolledToTeam = useRef(false);
  const [session, setSession] = useState(null);
  const [logoPath, setLogoPath] = useState(null);
  const [servicesPath, setServicesPath] = useState(null);
  const [hedPath, setHedPath] = useState(null);
  const [agentPath, setAgentPath] = useState(null);
  const [githubPath, setGithubPath] = useState(null);
  const [linkedinPath, setLinkedinPath] = useState(null);
  const [xPath, setXPath] = useState(null);
  const [sitePath, setSitePath] = useState(null);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const blueprintStroke = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const blueprintFill = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const servicesStroke = useColorModeValue(ui.resolutionBlue, ui.creativeBlue);
  const servicesFill = useColorModeValue(ui.creativeBlue, ui.resolutionBlue);
  const timelineColor = useColorModeValue(ui.blackAlpha, ui.whiteAlpha);
  // const postItColorIndex = useColorModeValue(0, 1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLightMode = colorMode == 'light';
  const modeId = 'mode';
  const modeLabel = `Switch to ${isLightMode ? 'dark' : 'light'} mode`;
  // const postItColors = ui.postItColors[Math.floor(ui.postItColors.length * Math.random())];
  const generateFrame = (canvas, path, roughParams) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    rough.canvas(tempCanvas).path(path, roughParams);

    return tempCanvas;
  };
  /* const animatePrompt = (index) => {
    promptTimeouts.current?.forEach(clearTimeout);

    promptBox.current.placeholder = '';
    promptTimeouts.current = [];

    ui.initialPlaceholders[index].forEach(({ delay, token }) => {
      promptTimeouts.current.push(
        setTimeout(() => {
          promptBox.current.placeholder += token;
        }, delay + ui.promptDelayMs)
      );
    });
  };
  const animatePromptBox = useCallback(() => {
    if (!promptInterval.current) {
      const divisor = ui.initialPlaceholders.length + 1;
      let index = 0;

      animatePrompt(index);

      promptInterval.current = setInterval(() => {
        index = (index + 1) % divisor;

        if (index < ui.initialPlaceholders.length) animatePrompt(index);
      }, ui.promptRefreshMs);
    }
  }, []); */
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
    onOpen();
  };
  /* const handlePromptKeyPress = (event) => {
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // handlePromptSubmit();
    }
  };
  const handlePromptChange = (event) => {
    promptBox.current.style.height = 0;
    promptBox.current.style.height = `${promptBox.current.scrollHeight + 2}px`;
    candidatePrompt.current = event.target.value;
  };
  const handleResetPress = () => {
    clearInterval(promptInterval.current);

    candidatePrompt.current = '';
    promptBox.current.value = '';
    promptBox.current.style.height = promptBoxHeight.current;
    promptInterval.current = null;

    setIsLoading(false);
    animatePromptBox();
    promptBox.current.focus();

    // completionsController.current?.abort();
    // replayTimeouts.current?.forEach(clearTimeout);

    // conversationBuffer.current = {};
    // completionsController.current = null;
    // replayTimeouts.current = [];

    // setConversation(conversationBuffer.current);
    // setError('');
  }; */

  useEffect(() => {
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
    const timeouts = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio >= ui.minVisibility;

          if (
            entry.target == timeline.current &&
            !hasAnimatedTimeline.current &&
            timelineAnimation.current
          ) {
            if (isVisible) {
              timelineAnimation.current.play();
            } else {
              timelineAnimation.current.pause();
              timelineAnimation.current.seek(0);
              timeline.current?.classList.remove('animated');
            }
          }

          /* if (entry.target == team.current && !hasScrolledToTeam.current && isVisible) {
            hasScrolledToTeam.current = true;
          } */
        });
      },
      { root: null, threshold: [0, ui.minVisibility, 1] }
    );
    let shouldResetState = false;

    if (completion.current && !hasAnimatedCompletion.current) {
      hasAnimatedCompletion.current = true;
      shouldResetState = true;
      const dutyCount = ui.blinkCount * 2;
      const blinkDelay = dutyCount * ui.blinkIntervalMs;

      for (let i = 0; i < dutyCount; i++) {
        timeouts.push(
          setTimeout(() => {
            if (completion.current) completion.current.textContent = !(i % 2) ? '|' : '';
          }, i * ui.blinkIntervalMs)
        );
      }

      ui.completion.forEach(({ delay, token }) => {
        timeouts.push(
          setTimeout(() => {
            if (completion.current) completion.current.textContent += token;
          }, delay + blinkDelay)
        );
      });
    }

    if (timeline.current) observer.observe(timeline.current);
    // if (team.current) observer.observe(team.current);

    return () => {
      if (shouldResetState) hasAnimatedCompletion.current = false;

      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    import('./paths/logotype.txt?raw').then((module) => {
      setLogoPath(module.default);
    });
    import('./paths/services.txt?raw').then((module) => {
      setServicesPath(module.default);
    });
    import('./paths/hedcut.txt?raw').then((module) => {
      setHedPath(module.default);
    });
    import('./paths/agent.txt?raw').then((module) => {
      setAgentPath(module.default);
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
    import('./paths/globe.txt?raw').then((module) => {
      setSitePath(module.default);
    });

    if (timelineColor) {
      timelineAnimation.current = createTimeline({
        autoplay: false,
        onComplete: () => {
          hasAnimatedTimeline.current = true;

          timeline.current.classList.add('animated');
        }
      });
      const roughTimeline = rough.svg(timeline.current);
      const logLength = ui.timelineLabels.reduce((length, label) => {
        return length + label.log;
      }, 0);
      const timelineDestination = 2 * ui.tickOffset + logLength * ui.tickDistanceUnit;
      const timelineVerticalAxis = ui.timelineFontSize + ui.timelineClearance;
      const pointDiameter = 0.75 * ui.tickLength;
      const arrowLength = ui.tickLength / Math.sqrt(2);
      const arrowOrigin = timelineDestination - arrowLength;
      const tickSubsegment = ui.tickLength / 2;
      const tickOrigin = timelineVerticalAxis - tickSubsegment;
      const tickDestination = timelineVerticalAxis + tickSubsegment;
      const paradigmOrigin = timelineVerticalAxis + 1.75 * ui.timelineClearance;
      let currentDistance = 2 * ui.tickOffset;

      timeline.current.setAttribute('height', `${paradigmOrigin}px`);
      timelineParts.current.replaceChildren();
      timelineParts.current.appendChild(
        roughTimeline.line(
          ui.tickOffset,
          timelineVerticalAxis,
          timelineDestination,
          timelineVerticalAxis,
          { stroke: timelineColor, strokeWidth: ui.timelineStrokeWidth, disableMultiStroke: true }
        )
      );
      timelineParts.current.appendChild(
        roughTimeline.circle(ui.tickOffset, timelineVerticalAxis, pointDiameter, {
          stroke: timelineColor,
          strokeWidth: ui.timelineStrokeWidth,
          fill: timelineColor,
          fillStyle: 'solid',
          disableMultiStroke: true
        })
      );
      timelineParts.current.appendChild(
        roughTimeline.line(
          arrowOrigin,
          timelineVerticalAxis - arrowLength,
          timelineDestination,
          timelineVerticalAxis,
          { stroke: timelineColor, strokeWidth: ui.timelineStrokeWidth, disableMultiStroke: true }
        )
      );
      timelineParts.current.appendChild(
        roughTimeline.line(
          arrowOrigin,
          timelineVerticalAxis + arrowLength,
          timelineDestination,
          timelineVerticalAxis,
          { stroke: timelineColor, strokeWidth: ui.timelineStrokeWidth, disableMultiStroke: true }
        )
      );

      ui.timelineLabels.forEach((label, i) => {
        const tickDistance = label.log * ui.tickDistanceUnit;
        const year = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        timelineParts.current.appendChild(
          roughTimeline.line(currentDistance, tickOrigin, currentDistance, tickDestination, {
            stroke: timelineColor,
            strokeWidth: ui.timelineStrokeWidth,
            disableMultiStroke: true
          })
        );
        year.setAttribute('text-anchor', 'middle');
        year.setAttribute(
          'style',
          `font-family: ${ui.headingFont};` +
            ` font-size: ${ui.timelineFontSize};` +
            ` fill: ${timelineColor};`
        );

        const paradigm = year.cloneNode(true);
        year.textContent = label.year;

        year.setAttribute('x', currentDistance);
        year.setAttribute('y', ui.timelineFontSize);
        timelineParts.current.appendChild(year);

        paradigm.textContent = label.paradigm;

        paradigm.setAttribute('x', currentDistance + tickDistance / 2);
        paradigm.setAttribute('y', paradigmOrigin);
        timelineParts.current.appendChild(paradigm);

        currentDistance += tickDistance;

        if (i < ui.timelineLabels.length - 1) {
          timelineAnimation.current.add({ duration: ui.timelineDelayMs });
          timelineAnimation.current.add(timelineParts.current, {
            x: ui.tickOffset - currentDistance,
            duration: ui.timelineTransitionMs,
            ease: 'outBack'
          });
        }
      });

      return () => {
        timelineAnimation.current.cancel();
      };
    }
  }, [timelineColor]);

  useEffect(() => {
    if (
      logoPath &&
      servicesPath &&
      blueprintStroke &&
      blueprintFill &&
      servicesStroke &&
      servicesFill
    ) {
      logoFrames.current = [];
      servicesFrames.current = [];
      hedFrames.current = [];
      agentFrames.current = [];
      githubFrames.current = [];
      linkedinFrames.current = [];
      xFrames.current = [];
      siteFrames.current = [];
      frameIndex.current = 0;
      const logoCanvas = logotype.current;
      const logoContext = logoCanvas.getContext('2d');
      const servicesCanvas = services.current;
      const servicesContext = servicesCanvas.getContext('2d');
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

        if (servicesFrames.current[frameIndex.current]) {
          frame = servicesFrames.current[frameIndex.current];
        } else {
          frame = generateFrame(servicesCanvas, servicesPath, {
            stroke: servicesStroke,
            strokeWidth: ui.blueprintStrokeWidth,
            fill: servicesFill,
            fillStyle: ui.servicesFillStyle,
            hachureAngle: ui.blueprintAngle,
            roughness: ui.servicesRoughness
          });

          servicesFrames.current.push(frame);
        }

        servicesContext.clearRect(0, 0, servicesCanvas.width, servicesCanvas.height);
        servicesContext.drawImage(frame, 0, 0);

        if (
          hedPath &&
          agentPath &&
          githubPath &&
          linkedinPath &&
          xPath &&
          sitePath &&
          hasCachedFrames.current
        ) {
          const limitedIndex =
            frameIndex.current % Math.round(ui.frameCount / ui.frameCountLimiter);
          const hedCanvas = hedcut.current;
          const hedContext = hedCanvas.getContext('2d');
          const agentCanvas = agent.current;
          const agentContext = agentCanvas.getContext('2d');
          const githubCanvas = githubIcon.current;
          const githubContext = githubCanvas.getContext('2d');
          const linkedinCanvas = linkedinIcon.current;
          const linkedinContext = linkedinCanvas.getContext('2d');
          const xCanvas = xIcon.current;
          const xContext = xCanvas.getContext('2d');
          const siteCanvas = siteIcon.current;
          const siteContext = siteCanvas.getContext('2d');
          const brianGithubCanvas = brianGithubIcon.current;
          const brianGithubContext = brianGithubCanvas.getContext('2d');
          const brianLinkedinCanvas = brianLinkedinIcon.current;
          const brianLinkedinContext = brianLinkedinCanvas.getContext('2d');
          const brianXCanvas = brianXIcon.current;
          const brianXContext = brianXCanvas.getContext('2d');

          if (hedFrames.current[limitedIndex]) {
            frame = hedFrames.current[limitedIndex];
          } else {
            frame = generateFrame(hedCanvas, hedPath, {
              stroke: ui.hedStroke,
              strokeWidth: ui.blueprintStrokeWidth,
              fill: blueprintFill,
              fillStyle: ui.hedFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.hedRoughness
            });

            hedFrames.current.push(frame);
          }

          hedContext.clearRect(0, 0, hedCanvas.width, hedCanvas.height);
          hedContext.drawImage(frame, 0, 0);
          if (!hedcut.current.classList.contains('loaded')) hedcut.current.classList.add('loaded');

          if (agentFrames.current[limitedIndex]) {
            frame = agentFrames.current[limitedIndex];
          } else {
            frame = generateFrame(agentCanvas, agentPath, {
              stroke: ui.agentStroke,
              strokeWidth: ui.blueprintStrokeWidth,
              fill: blueprintFill,
              fillStyle: ui.agentFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.agentRoughness
            });

            agentFrames.current.push(frame);
          }

          agentContext.clearRect(0, 0, agentCanvas.width, agentCanvas.height);
          agentContext.drawImage(frame, 0, 0);
          if (!agent.current.classList.contains('loaded')) agent.current.classList.add('loaded');

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
          brianGithubContext.clearRect(0, 0, brianGithubCanvas.width, brianGithubCanvas.height);
          brianGithubContext.drawImage(frame, 0, 0);

          if (!githubIcon.current.classList.contains('loaded')) {
            githubIcon.current.classList.add('loaded');
          }

          if (!brianGithubIcon.current.classList.contains('loaded')) {
            brianGithubIcon.current.classList.add('loaded');
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
          brianLinkedinContext.clearRect(
            0,
            0,
            brianLinkedinCanvas.width,
            brianLinkedinCanvas.height
          );
          brianLinkedinContext.drawImage(frame, 0, 0);

          if (!linkedinIcon.current.classList.contains('loaded')) {
            linkedinIcon.current.classList.add('loaded');
          }

          if (!brianLinkedinIcon.current.classList.contains('loaded')) {
            brianLinkedinIcon.current.classList.add('loaded');
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
          brianXContext.clearRect(0, 0, brianXCanvas.width, brianXCanvas.height);
          brianXContext.drawImage(frame, 0, 0);
          if (!xIcon.current.classList.contains('loaded')) xIcon.current.classList.add('loaded');

          if (!brianXIcon.current.classList.contains('loaded')) {
            brianXIcon.current.classList.add('loaded');
          }

          if (siteFrames.current[limitedIndex]) {
            frame = siteFrames.current[limitedIndex];
          } else {
            frame = generateFrame(siteCanvas, sitePath, {
              stroke: ui.iconStroke,
              strokeWidth: ui.iconStrokeWidth,
              fill: blueprintFill,
              fillStyle: ui.iconFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.iconRoughness
            });

            siteFrames.current.push(frame);
          }

          siteContext.clearRect(0, 0, siteCanvas.width, siteCanvas.height);
          siteContext.drawImage(frame, 0, 0);

          if (!siteIcon.current.classList.contains('loaded')) {
            siteIcon.current.classList.add('loaded');
          }
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
  }, [
    logoPath,
    servicesPath,
    hedPath,
    agentPath,
    githubPath,
    linkedinPath,
    xPath,
    sitePath,
    blueprintStroke,
    blueprintFill,
    servicesStroke,
    servicesFill
  ]);

  /* useEffect(() => {
    if (!isLoading && promptBox.current) {
      promptBox.current.focus();
      animatePromptBox();
    }
  }, [isLoading, animatePromptBox]); */

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

  /* useLayoutEffect(() => {
    if (!promptBoxHeight.current && promptBox.current) {
      promptBoxHeight.current = `${promptBox.current.offsetHeight}px`;
    }

    promptBox.current.focus();
  }, []); */

  return (
    <Flex w='100%' minH='100vh' direction='column'>
      <Box>
        <Box>
          <canvas
            ref={logotype}
            width={ui.logoOldWidth}
            height={ui.logoOldHeight}
            style={{ marginTop: ui.logoMargin, width: ui.logoNewWidth, minWidth: ui.logoMinWidth }}
            role='img'
            aria-label={ui.logoLabel}
          />
        </Box>
        <Flex pos='absolute' top={ui.navTopPosition} right={ui.navRightPosition}>
          <Flex display={{ base: 'none', lg: 'flex' }} align='center'>
            <Link variant='nav' ml={ui.itemMargin} href='#services'>
              Services
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href='#pricing'>
              Pricing
            </Link>
            <Link variant='nav' ml={ui.itemMargin} href={ui.docUrl}>
              Documentation
            </Link>
            {/* <Link variant='nav' ml={ui.itemMargin} href={ui.demoUrl} isExternal>
              Live demo
            </Link> */}
            <Link variant='nav' ml={ui.itemMargin} href='#about'>
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
          <Menu strategy='fixed' isOpen={isOpen} onOpen={handleMenuOpen} onClose={onClose}>
            <Tooltip
              mx={ui.tooltipMargin}
              p={ui.tooltipPadding}
              label={ui.menuLabel}
              isDisabled={isOpen}
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
      <Flex
        id='hero'
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        w='100%'
        h={ui.heroHeight}
        direction={ui.heroDirection}
        justify='center'
        align='center'
        gap='8'
      >
        <Flex
          w={ui.taglineWidth}
          maxW={ui.taglineMaxWidth}
          direction='column'
          justify='center'
          align='center'
        >
          <uix.Tagline ref={completion} />
        </Flex>
        {/* <Flex w={{ base: '100%', md: '50%' }} justify='center' align='center'>
          <Textarea
            ref={promptBox}
            rows='1'
            minH={ui.promptMinHeight}
            maxH={ui.promptMaxHeight}
            isDisabled={isLoading}
            onKeyDown={handlePromptKeyPress}
            onChange={handlePromptChange}
          />
          <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.resetHint} hasArrow>
            <IconButton
              ml='4'
              borderRadius='full'
              size='lg'
              icon={<AddIcon boxSize='4' />}
              boxShadow='lg'
              aria-label={ui.resetHint}
              onClick={handleResetPress}
              onKeyDown={(event) => {
                handleKeyPress(event, handleResetPress);
              }}
            />
          </Tooltip>
        </Flex> */}
      </Flex>
      <Box
        id='services'
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        pt={ui.xsMargin}
        pb={ui.smMargin}
        textAlign='left'
      >
        <canvas
          ref={services}
          width={ui.servicesOldWidth}
          height={ui.servicesOldHeight}
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: ui.servicesNewWidth,
            minWidth: ui.servicesMinWidth
          }}
          role='img'
          aria-label={ui.servicesLabel}
        />
        <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='md'>
          <CardBody>
            <Heading as='h2' variant='service'>
              1. Live search results
            </Heading>
            <Text variant='service'>
              <Text as='strong' variant='co'>
                Agent First
              </Text>
              {' lets you integrate popular search engines reliably via structured or raw data'}
              {' that includes '}
              <Text as='strong' variant='bold'>
                all organic & paid result types
              </Text>
              :
            </Text>
            <Box position='relative'>
              <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(search) }} />
              <Link variant='doc' href={ui.searchUrl}>
                More …
              </Link>
            </Box>
          </CardBody>
          <CardFooter>
            <Button as='a' w={ui.buttonWidth} h={ui.buttonHeight} href='#pricing'>
              Get started
            </Button>
          </CardFooter>
        </Card>
        <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='md'>
          <CardBody>
            <Heading as='h2' variant='service'>
              2. Uncaptcha’d browsing
            </Heading>
            <Text variant='service'>
              <Text as='strong' variant='co'>
                Agent First
              </Text>
              {'’s supercluster of '}
              <Text as='strong' variant='bold'>
                real, well-behaved browsers
              </Text>
              {' bypasses or solves reCAPTCHA, Cloudflare Turnstile, & other captchas for you:'}
            </Text>
            <Box position='relative'>
              <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(browsing) }} />
              <Link variant='doc' href={ui.browsingUrl}>
                More …
              </Link>
            </Box>
          </CardBody>
          <CardFooter>
            <Button as='a' w={ui.buttonWidth} h={ui.buttonHeight} href='#pricing'>
              Get started
            </Button>
          </CardFooter>
        </Card>
        <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='md'>
          <CardBody>
            <Heading as='h2' variant='service'>
              {'3. Webpage interaction '}
              <Badge>Coming soon</Badge>
            </Heading>
            <Text variant='service'>
              <Text as='strong' variant='co'>
                Agent First
              </Text>
              {' will soon accept '}
              <Text as='strong' variant='bold'>
                CDP commands
              </Text>
              {' (Chrome DevTools Protocol–compatible code) to complete advanced tasks on behalf '}
              of users.
            </Text>
          </CardBody>
          <CardFooter>
            <Button w={ui.buttonWidth} h={ui.buttonHeight} isDisabled>
              Join waitlist
            </Button>
          </CardFooter>
        </Card>
        <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='md'>
          <CardBody>
            <Heading as='h2' variant='service'>
              … From anywhere
            </Heading>
            <Text variant='service'>
              {'Every '}
              <Text as='strong' variant='co'>
                Agent First
              </Text>
              {' request can be geotargeted to one of '}
              <Text as='strong' variant='bold'>
                190+ countries & their regions
              </Text>
              {' within our proxy network for local results or content:'}
            </Text>
            <Box position='relative'>
              <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(searchGeotargeting) }} />
              <Box clear='both' />
              <Code
                dangerouslySetInnerHTML={{ __html: ui.renderer.render(browsingGeotargeting) }}
              />
              <Link variant='doc' href={ui.geotargetingUrl}>
                More …
              </Link>
            </Box>
          </CardBody>
          <CardFooter>
            <Button as='a' w={ui.buttonWidth} h={ui.buttonHeight} href='#pricing'>
              Get started
            </Button>
          </CardFooter>
        </Card>
      </Box>
      <Box id='about' px={{ base: ui.smMargin, md: ui.xlMargin }} pt={ui.smMargin} align='center'>
        <Box position='relative' pt='1' w={ui.timelineWidth} minW={ui.timelineMinWidth}>
          <svg ref={timeline} width='100%'>
            <g ref={timelineParts} />
          </svg>
          <Box
            position='absolute'
            top='0'
            left='0'
            bgGradient='linear(to-r, chakra-body-bg, transparent)'
            w={ui.gradientWidth}
            h='100%'
          />
          <Box
            position='absolute'
            top='0'
            right='0'
            bgGradient='linear(to-l, chakra-body-bg, transparent)'
            w={ui.gradientWidth}
            h='100%'
          />
        </Box>
        <Text
          variant='about'
          mx={{ base: ui.xsMargin, lg: ui.lgMargin }}
          mt={ui.mdMargin}
          textAlign='left'
        >
          Many of the most successful technology companies were founded by developers who leveraged
          new features of emerging platforms, from desktop computing to AI. We’re betting
          agent-first development is the next big opportunity and are providing the tools you need
          to focus on building unique, native agents.
        </Text>
      </Box>
      <Box ref={team} id='team' pt={ui.mdMargin}>
        <Heading as='h1' variant='team' fontSize={ui.teamFontSize}>
          Our team
        </Heading>
        <Flex
          mx={ui.smMargin}
          mt={ui.smMargin}
          direction={{ base: 'column', lg: 'row' }}
          justify='space-evenly'
        >
          <Card bg='transparent' w={ui.cardWidth} boxShadow='none'>
            <CardBody textAlign='left'>
              <Box
                mt={ui.hedMargin}
                w={ui.hedNewWidth}
                maxW={ui.hedMaxWidth}
                transform={ui.hedTransform}
              >
                <canvas
                  ref={hedcut}
                  className='lazy'
                  width={ui.hedOldWidth}
                  height={ui.hedOldHeight}
                  style={{ width: '100%' }}
                  role='img'
                  aria-label={ui.hedLabel}
                />
              </Box>
              <Heading variant='name' fontSize={ui.nameFont}>
                Brian
              </Heading>
              <Text variant='teammate'>
                <Text as='strong' variant='name'>
                  Brian
                </Text>
                {' cofounded '}
                <Link variant='team' href='https://disconnect.me/' isExternal>
                  Disconnect
                </Link>
                , which makes privacy software that ships with most modern browsers and has helped
                {' protect the data of 100,000,000+ users, and '}
                <Link variant='team' href='https://joinmassive.com/' isExternal>
                  Massive
                </Link>
                , which is developing an alternative to ads and paywalls for monetizing spare
                computing resources and was named Proxyway’s 2025 “Newcomer of the Year” for its
                {' bandwidth monetization. '}
                <Text as='strong' variant='footerCo'>
                  Agent First
                </Text>
                {' is a spinoff of '}
                <Text as='strong' variant='footerBold'>
                  Massive
                </Text>
                {' that’s focused on serving AI agents.'}
              </Text>
            </CardBody>
            <CardFooter pt='0'>
              <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.siteLabel} hasArrow>
                <Link variant='social' href='https://oldestlivingboy.com/' isExternal>
                  <canvas
                    ref={siteIcon}
                    className='lazy'
                    width={ui.siteOldDimension}
                    height={ui.siteOldDimension}
                    style={{ width: ui.socialDimension, height: ui.socialDimension }}
                    role='img'
                    aria-label={ui.siteLabel}
                  />
                </Link>
              </Tooltip>
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={ui.brianGithubLabel}
                hasArrow
              >
                <Link
                  variant='social'
                  ml={ui.socialMargin}
                  href='https://github.com/oldestlivingboy'
                  isExternal
                >
                  <canvas
                    ref={brianGithubIcon}
                    className='lazy'
                    width={ui.githubOldDimension}
                    height={ui.githubOldDimension}
                    style={{ width: ui.socialDimension, minWidth: ui.socialDimension }}
                    role='img'
                    aria-label={ui.brianGithubLabel}
                  />
                </Link>
              </Tooltip>
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={ui.brianLinkedinLabel}
                hasArrow
              >
                <Link
                  variant='social'
                  ml={ui.socialMargin}
                  href='https://www.linkedin.com/in/oldestlivingboy/'
                  isExternal
                >
                  <canvas
                    ref={brianLinkedinIcon}
                    className='lazy'
                    width={ui.linkedinOldDimension}
                    height={ui.linkedinOldDimension}
                    style={{ width: ui.socialDimension, minWidth: ui.socialDimension }}
                    role='img'
                    aria-label={ui.brianLinkedinLabel}
                  />
                </Link>
              </Tooltip>
              <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.brianXLabel} hasArrow>
                <Link
                  variant='social'
                  ml={ui.socialMargin}
                  href='https://x.com/oldestlivingboy'
                  isExternal
                >
                  <canvas
                    ref={brianXIcon}
                    className='lazy'
                    width={ui.xOldDimension}
                    height={ui.xOldDimension}
                    style={{ width: ui.socialDimension, minWidth: ui.socialDimension }}
                    role='img'
                    aria-label={ui.brianXLabel}
                  />
                </Link>
              </Tooltip>
            </CardFooter>
          </Card>
          <Card bg='transparent' w={ui.cardWidth} boxShadow='none'>
            <CardBody textAlign='left'>
              <Box w={ui.agentNewWidth} maxW={ui.agentMaxWidth}>
                <canvas
                  ref={agent}
                  className='lazy'
                  width={ui.agentOldWidth}
                  height={ui.agentOldHeight}
                  style={{ width: '100%' }}
                  role='img'
                  aria-label={ui.agentLabel}
                />
              </Box>
              <Heading variant='name' fontSize={ui.nameFont}>
                Brain
              </Heading>
              <Text variant='teammate'>
                <Text as='strong' variant='name'>
                  Brain
                </Text>
                {' is a cofounder agent we’re collaborating on with '}
                <Link variant='team' href='https://www.linkedin.com/in/francknouyrigat/' isExternal>
                  Franck
                </Link>
                {', who cofounded the startup community '}
                <Text as='strong' variant='footerBold'>
                  Startup Weekend
                </Text>
                {' and AI investor '}
                <Text as='strong' variant='footerBold'>
                  No Cap
                </Text>
                {', to run the boring parts of '}
                <Text as='strong' variant='footerCo'>
                  Agent First
                </Text>
                {' and to dogfood our services. Although '}
                <Text as='strong' variant='name'>
                  Brain
                </Text>
                {' isn’t publicly available yet, you can try another agent we’re '}
                <Text as='span' textDecoration='line-through'>
                  dog
                </Text>
                llamafooding that is, a “meta-LLM” that evaluates and combines responses from
                {' popular large language models, called '}
                <Link variant='team' href={ui.demoUrl} isExternal>
                  Llamapile
                </Link>
                .
              </Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>
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
    </Flex>
  );
}
