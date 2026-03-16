// eslint-disable-next-line no-unused-vars
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  OrderedList,
  UnorderedList,
  ListItem,
  ListIcon,
  Heading,
  Text,
  Link,
  // Textarea,
  Button,
  // IconButton,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons'; // eslint-disable-line no-unused-vars
import rough from 'roughjs/bin/rough';
import { createTimeline } from 'animejs';

import * as ui from '../config/ui';
import * as uix from '../config/uix';
import Code from '../components/Code';
import Pricing from '../components/Pricing';
import WaitlistDropdown from '../components/WaitlistDropdown';
import WaitlistModal from '../components/WaitlistModal';
import LoginModal from '../components/LoginModal';
import searchSh from '../markdown/search-sh.md?raw';
import searchPy from '../markdown/search-py.md?raw';
import searchJs from '../markdown/search-js.md?raw';
import browsingSh from '../markdown/browsing-sh.md?raw';
import browsingPy from '../markdown/browsing-py.md?raw';
import browsingJs from '../markdown/browsing-js.md?raw';
import geotargetedSearchSh from '../markdown/search-geotargeted-sh.md?raw';
import geotargetedSearchPy from '../markdown/search-geotargeted-py.md?raw';
import geotargetedSearchJs from '../markdown/search-geotargeted-js.md?raw';
import geotargetedBrowsingSh from '../markdown/browsing-geotargeted-sh.md?raw';
import geotargetedBrowsingPy from '../markdown/browsing-geotargeted-py.md?raw';
import geotargetedBrowsingJs from '../markdown/browsing-geotargeted-js.md?raw';

export default function Home({
  supabaseClient,
  session,
  blueprintStroke,
  blueprintFill,
  generateFrame,
  handleKeyPress
}) {
  const completion = useRef();
  // const promptBox = useRef();
  const services = useRef();
  const pricing = useRef();
  const purchaseTextbox = useRef();
  const timeline = useRef();
  const timelineParts = useRef();
  const team = useRef();
  const hedcut = useRef();
  const agent = useRef();
  const githubIcon = useRef();
  const linkedinIcon = useRef();
  const xIcon = useRef();
  const siteIcon = useRef();
  // const promptBoxHeight = useRef();
  const servicesFrames = useRef();
  const pricingFrames = useRef();
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
  const isPurchaseTextboxFocused = useRef(false);
  const [servicesPath, setServicesPath] = useState(null);
  const [pricingPath, setPricingPath] = useState(null);
  const [hedPath, setHedPath] = useState(null);
  const [agentPath, setAgentPath] = useState(null);
  const [githubPath, setGithubPath] = useState(null);
  const [linkedinPath, setLinkedinPath] = useState(null);
  const [xPath, setXPath] = useState(null);
  const [sitePath, setSitePath] = useState(null);
  const [apiToken, setApiToken] = useState(null);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isWaitlisted, setIsWaitlisted] = useState(() => {
    return (JSON.parse(localStorage.getItem(ui.waitlistKey)) ?? []).includes(ui.waitlistService);
  });
  const navigate = useNavigate();
  const horizontalDividerOverflow = useBreakpointValue({
    base: ui.dividerBaseOverflow,
    md: ui.horizontalDividerOverflow
  });
  const isInMdView = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const invertedColor = useColorModeValue(ui.resolutionBlue, ui.cornflowerBlue);
  const textColor = useColorModeValue(ui.charcoalBlue, ui.whiteAlpha);
  const timelineColor = useColorModeValue(ui.blackAlpha, ui.whiteAlpha);
  // const postItColorIndex = useColorModeValue(0, 1);
  const { isOpen: isLoginOpen, onOpen: openLogin, onClose: closeLogin } = useDisclosure();
  const {
    isOpen: isWaitlistOpen,
    onOpen: openWaitlist,
    onClose: closeWaitlist,
    onToggle: toggleWaitlist
  } = useDisclosure();
  // const postItColors = ui.postItColors[Math.floor(ui.postItColors.length * Math.random())];
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
    import('../paths/services.txt?raw').then((module) => {
      setServicesPath(module.default);
    });
    import('../paths/pricing.txt?raw').then((module) => {
      setPricingPath(module.default);
    });
    import('../paths/hedcut.txt?raw').then((module) => {
      setHedPath(module.default);
    });
    import('../paths/agent.txt?raw').then((module) => {
      setAgentPath(module.default);
    });
    import('../paths/github.txt?raw').then((module) => {
      setGithubPath(module.default);
    });
    import('../paths/linkedin.txt?raw').then((module) => {
      setLinkedinPath(module.default);
    });
    import('../paths/x.txt?raw').then((module) => {
      setXPath(module.default);
    });
    import('../paths/globe.txt?raw').then((module) => {
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
    if (servicesPath && blueprintStroke && blueprintFill && headingColor && invertedColor) {
      servicesFrames.current = [];
      pricingFrames.current = [];
      hedFrames.current = [];
      agentFrames.current = [];
      githubFrames.current = [];
      linkedinFrames.current = [];
      xFrames.current = [];
      siteFrames.current = [];
      frameIndex.current = 0;
      const servicesCanvas = services.current;
      const servicesContext = servicesCanvas.getContext('2d');
      const renderFrames = () => {
        let frame;

        if (servicesFrames.current[frameIndex.current]) {
          frame = servicesFrames.current[frameIndex.current];
        } else {
          frame = generateFrame(servicesCanvas, servicesPath, {
            stroke: invertedColor,
            strokeWidth: ui.blueprintStrokeWidth,
            fill: headingColor,
            fillStyle: ui.headingFillStyle,
            hachureAngle: ui.blueprintAngle,
            roughness: ui.headingRoughness
          });

          servicesFrames.current.push(frame);
        }

        servicesContext.clearRect(0, 0, servicesCanvas.width, servicesCanvas.height);
        servicesContext.drawImage(frame, 0, 0);

        if (
          pricingPath &&
          hedPath &&
          agentPath &&
          githubPath &&
          linkedinPath &&
          xPath &&
          sitePath &&
          textColor &&
          hasCachedFrames.current
        ) {
          const limitedIndex =
            frameIndex.current % Math.round(ui.frameCount / ui.frameCountLimiter);
          const pricingCanvas = pricing.current;
          const pricingContext = pricingCanvas.getContext('2d');
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

          if (pricingFrames.current[limitedIndex]) {
            frame = pricingFrames.current[limitedIndex];
          } else {
            frame = generateFrame(pricingCanvas, pricingPath, {
              stroke: textColor,
              strokeWidth: ui.blueprintStrokeWidth,
              fill: invertedColor,
              fillStyle: ui.headingFillStyle,
              hachureAngle: ui.blueprintAngle,
              roughness: ui.headingRoughness
            });

            pricingFrames.current.push(frame);
          }

          pricingContext.clearRect(0, 0, pricingCanvas.width, pricingCanvas.height);
          pricingContext.drawImage(frame, 0, 0);

          if (!pricing.current.classList.contains('loaded')) {
            pricing.current.classList.add('loaded');
          }

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
    servicesPath,
    pricingPath,
    hedPath,
    agentPath,
    githubPath,
    linkedinPath,
    xPath,
    sitePath,
    blueprintStroke,
    blueprintFill,
    headingColor,
    invertedColor,
    textColor
  ]);

  useEffect(() => {
    if (session) {
      supabaseClient
        .from('accounts')
        .select('api_token')
        .single()
        .then(({ data }) => {
          if (data) setApiToken(data.api_token);
        });
    } else {
      setApiToken(null);
    }
  }, [session]);

  /* useEffect(() => {
    if (!isLoading && promptBox.current) {
      promptBox.current.focus();
      animatePromptBox();
    }
  }, [isLoading, animatePromptBox]);

  useLayoutEffect(() => {
    if (!promptBoxHeight.current && promptBox.current) {
      promptBoxHeight.current = `${promptBox.current.offsetHeight}px`;
    }

    promptBox.current.focus();
  }, []); */

  return (
    <>
      <VStack
        id='hero'
        px={{ base: ui.xsMargin, md: ui.xxlMargin }}
        pt={ui.xsMargin}
        w='100%'
        justify='center'
        align='center'
      >
        <VStack
          gap={0}
          w={ui.taglineWidth}
          maxW={ui.taglineMaxWidth}
          justify='center'
          align='center'
        >
          <uix.Tagline ref={completion} />
        </VStack>
        {/* <Flex w={{ base: '100%', md: '50%' }} justify='center' align='center'>
          <Textarea
            ref={promptBox}
            rows={1}
            minH={ui.promptMinHeight}
            maxH={ui.promptMaxHeight}
            isDisabled={isLoading}
            onKeyDown={handlePromptKeyPress}
            onChange={handlePromptChange}
          />
          <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.resetHint} hasArrow>
            <IconButton
              ml={ui.xxsMargin}
              rounded='full'
              size='lg'
              icon={<AddIcon boxSize={4} />}
              shadow='sm'
              aria-label={ui.resetHint}
              onClick={handleResetPress}
              onKeyDown={(event) => {
                handleKeyPress(event, handleResetPress);
              }}
            />
          </Tooltip>
        </Flex> */}
      </VStack>
      <Box
        id={ui.servicesId}
        mt={ui.smMargin}
        px={{ base: ui.xsMargin, md: ui.xxlMargin }}
        pt={ui.smMargin}
        pb={ui.mdMargin}
        textAlign='left'
      >
        <canvas
          ref={services}
          width={ui.servicesOldWidth}
          height={ui.servicesOldHeight}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: ui.servicesNewWidth,
            minWidth: ui.servicesMinWidth
          }}
          role='img'
          aria-label={ui.servicesLabel}
        />
        <Box
          pos='relative'
          mt={ui.xsMargin}
          _before={{
            pos: 'absolute',
            left: 0,
            top: ui.verticalDividerOverflow,
            bottom: ui.verticalDividerOverflow,
            bg: 'fg-grid',
            w: '1px',
            content: '""'
          }}
          _after={{
            pos: 'absolute',
            right: 0,
            top: ui.verticalDividerOverflow,
            bottom: ui.verticalDividerOverflow,
            bg: 'fg-grid',
            w: '1px',
            content: '""'
          }}
        >
          <Box
            pos='relative'
            px={{ base: ui.xxsMargin, md: ui.xsMargin }}
            py={ui.xsMargin}
            _before={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              top: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Text variant='description' mt={-1} color='chakra-placeholder-color'>
              <Text as='strong' variant='lede'>
                You didn’t create your product to battle web gatekeepers
              </Text>
              <br />
              TODO
            </Text>
            <Heading
              as='h2'
              variant='service'
              mt={ui.lgMargin}
              fontSize={{ base: '22px', md: '3xl' }}
            >
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
            <Code
              markdown={{ sh: searchSh, py: searchPy, js: searchJs }}
              apiUrl='https://api.agentfirst.dev/search?terms=foo+bar+baz&format=json'
              apiToken={apiToken}
              moreUrl={ui.searchUrl}
              openLogin={openLogin}
            />
            <Button
              as='a'
              mt={ui.xxsMargin}
              w={ui.buttonWidth}
              h={ui.buttonHeight}
              href={ui.pricingPath}
            >
              {ui.startLabel}
            </Button>
          </Box>
          <Box
            pos='relative'
            px={{ base: ui.xxsMargin, md: ui.xsMargin }}
            py={ui.xsMargin}
            _before={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              top: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '22px', md: '3xl' }}>
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
            <Code
              markdown={{ sh: browsingSh, py: browsingPy, js: browsingJs }}
              apiUrl='https://api.agentfirst.dev/browser?url=https://example.com/'
              apiToken={apiToken}
              moreUrl={ui.browsingUrl}
              openLogin={openLogin}
            />
            <Button
              as='a'
              mt={ui.xxsMargin}
              w={ui.buttonWidth}
              h={ui.buttonHeight}
              href={ui.pricingPath}
            >
              {ui.startLabel}
            </Button>
          </Box>
          <Box
            pos='relative'
            px={{ base: ui.xxsMargin, md: ui.xsMargin }}
            py={ui.xsMargin}
            _before={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              top: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '22px', md: '3xl' }}>
              {'3. Webpage interaction '}
              <Text
                as='span'
                variant='pill'
                borderWidth='1px'
                rounded='full'
                px={3.5}
                py={1.5}
                textTransform='uppercase'
                _light={{ borderColor: ui.blueAlpha, bg: ui.lightBlueAlpha }}
                _dark={{ borderColor: ui.grayAlpha, bg: ui.lightGrayAlpha }}
              >
                Coming soon
              </Text>
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
            <Box pos='relative'>
              <Button
                mt={ui.xxsMargin}
                w={ui.buttonWidth}
                h={ui.buttonHeight}
                isDisabled={isWaitlisted}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={isInMdView ? toggleWaitlist : openWaitlist}
              >
                {isWaitlisted ? ui.waitingLabel : ui.waitLabel}
              </Button>
              {isInMdView && (
                <WaitlistDropdown
                  supabaseClient={supabaseClient}
                  session={session}
                  isOpen={isWaitlistOpen}
                  join={() => {
                    setIsWaitlisted(true);
                  }}
                  close={closeWaitlist}
                  handleKeyPress={handleKeyPress}
                />
              )}
            </Box>
          </Box>
          <Box
            pos='relative'
            px={{ base: ui.xxsMargin, md: ui.xsMargin }}
            py={ui.xsMargin}
            _before={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              top: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
            _after={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bottom: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '22px', md: '3xl' }}>
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
            <Code
              markdown={{
                sh: geotargetedSearchSh,
                py: geotargetedSearchPy,
                js: geotargetedSearchJs
              }}
              apiUrl={
                'https://api.agentfirst.dev/search' +
                '?terms=foo+bar+baz&country=us&subdivision=tn&format=json'
              }
              apiToken={apiToken}
              openLogin={openLogin}
            />
            <Code
              markdown={{
                sh: geotargetedBrowsingSh,
                py: geotargetedBrowsingPy,
                js: geotargetedBrowsingJs
              }}
              apiUrl={
                'https://api.agentfirst.dev/browser' +
                '?url=https%3A%2F%2Fexample.com%2F&country=us&city=nashville'
              }
              apiToken={apiToken}
              moreUrl={ui.geotargetingUrl}
              openLogin={openLogin}
            />
            <Button
              as='a'
              mt={ui.xxsMargin}
              w={ui.buttonWidth}
              h={ui.buttonHeight}
              href={ui.pricingPath}
            >
              {ui.startLabel}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        id={ui.pricingId}
        px={{ base: ui.xsMargin, md: ui.xxlMargin }}
        pt={ui.smMargin}
        pb={ui.mdMargin}
        align='center'
      >
        <Box opacity={ui.pricingOpacity}>
          <canvas
            ref={pricing}
            className='lazy'
            width={ui.pricingOldWidth}
            height={ui.pricingOldHeight}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: ui.pricingNewWidth,
              minWidth: ui.pricingMinWidth
            }}
            role='img'
            aria-label={ui.pricingLabel}
          />
        </Box>
        <Box
          pos='relative'
          mt={ui.xsMargin}
          _before={{
            pos: 'absolute',
            left: 0,
            top: ui.verticalDividerOverflow,
            bottom: ui.verticalDividerOverflow,
            bg: 'fg-grid',
            w: '1px',
            content: '""'
          }}
          _after={{
            pos: 'absolute',
            right: 0,
            top: ui.verticalDividerOverflow,
            bottom: ui.verticalDividerOverflow,
            bg: 'fg-grid',
            w: '1px',
            content: '""'
          }}
        >
          <Box
            pos='relative'
            px={{ base: ui.xxsMargin, md: ui.xsMargin }}
            py={ui.xsMargin}
            _before={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              top: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
            _after={{
              pos: 'absolute',
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bottom: 0,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Text variant='description' mt={-1}>
              <Text as='strong' variant='lede'>
                Simple credits:
              </Text>
              {' $1 per 1,000 credits, which let you successfully fetch 1,000 standard page '}
              responses (
              <Link variant='pricing' href={ui.rateUrl}>
                see details
              </Link>
              )
            </Text>
            <SimpleGrid mt={{ base: 0, lg: 2 }} columns={{ base: 1, lg: 3 }} spacing={ui.mdMargin}>
              <Card
                variant='pricing'
                cursor={session ? 'not-allowed' : 'pointer'}
                onClick={() => {
                  if (!session) {
                    setPendingCheckoutUrl(ui.dashboardUrl);
                    openLogin();
                  }
                }}
                _hover={
                  session
                    ? null
                    : { borderColor: 'bg-emphasized', transform: `translateY(-${ui.hoverTravel})` }
                }
              >
                <CardHeader>
                  {ui.trialLabel}
                  <Text variant='pricing'>
                    <Text as='strong' variant='amount'>
                      $0
                    </Text>
                    <br />
                    1,000 credits to test your target sites
                  </Text>
                </CardHeader>
                <CardBody>
                  <UnorderedList variant='pricing' ms={0} spacing={2}>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      1,000 free credits
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Credits can be used for 30 days
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Instant access to search, browsing, & reporting
                    </ListItem>
                  </UnorderedList>
                </CardBody>
                <CardFooter>
                  <Button variant='outline' isDisabled={!!session}>
                    {session ? ui.tryingLabel : ui.tryLabel}
                  </Button>
                </CardFooter>
              </Card>
              <Card
                variant='pricing'
                pos='relative'
                borderColor='bg-button'
                onMouseDown={() => {
                  isPurchaseTextboxFocused.current = purchaseTextbox.current?.isFocused();
                }}
                onClick={() => {
                  if (isPurchaseTextboxFocused.current || purchaseTextbox.current?.hasAmount) {
                    purchaseTextbox.current?.submit();
                  } else {
                    purchaseTextbox.current?.focus();
                  }

                  isPurchaseTextboxFocused.current = false;
                }}
                _light={{ boxShadow: ui.lightPopularShadow }}
                _dark={{ boxShadow: ui.darkPopularShadow }}
                _hover={{ borderColor: 'bg-inverted', transform: `translateY(-${ui.hoverTravel})` }}
              >
                <Box
                  pos='absolute'
                  left='50%'
                  top='-11px'
                  rounded='full'
                  bg='bg-button'
                  px={2.5}
                  py={1}
                  lineHeight={1.4}
                  fontSize='2xs'
                  fontWeight='bold'
                  textTransform='uppercase'
                  letterSpacing='1px'
                  color='fg-button'
                  transform='translateX(-50%)'
                >
                  {ui.popularLabel}
                </Box>
                <CardHeader>
                  {ui.paygLabel}
                  <Text variant='pricing'>
                    <Text as='strong' variant='amount'>
                      $1
                    </Text>
                    {' / 1,000 credits'}
                    <br />
                    $0.90 / 1,000 credits for $100+ purchases
                  </Text>
                </CardHeader>
                <CardBody>
                  <UnorderedList variant='pricing' ms={0} spacing={2}>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      1,000 free credits
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Credits can be used for 30 days
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Instant access to search, browsing, & reporting
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Email support
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Best efforts to unblock any site within 48 hours
                    </ListItem>
                  </UnorderedList>
                </CardBody>
                <CardFooter>
                  <Pricing
                    ref={purchaseTextbox}
                    addToCart={(dollarAmount) => {
                      if (session) {
                        navigate(`${ui.checkoutPath}?${ui.purchaseParam}=${dollarAmount}`);
                      } else {
                        localStorage.setItem(ui.pendingPurchaseKey, dollarAmount);
                        setPendingCheckoutUrl(ui.checkoutUrl);
                        openLogin();
                      }
                    }}
                  />
                </CardFooter>
              </Card>
              <Card
                variant='pricing'
                onClick={() => {
                  location.href = ui.supportUrl;
                }}
                _hover={{
                  borderColor: 'bg-emphasized',
                  transform: `translateY(-${ui.hoverTravel})`
                }}
              >
                <CardHeader>
                  {ui.enterpriseLabel}
                  <Text variant='pricing'>
                    <Text as='strong' variant='amount'>
                      Custom
                    </Text>
                    <br />
                    $1,000+ monthly spend
                  </Text>
                </CardHeader>
                <CardBody>
                  <UnorderedList variant='pricing' ms={0} spacing={2}>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      1,000 free credits
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Credits can be used long term
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Access to search, browsing, & reporting
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Email & chat support
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Best efforts to unblock any site within 24 hours
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} />
                      Dedicated browser pool for faster responses
                    </ListItem>
                  </UnorderedList>
                </CardBody>
                <CardFooter>
                  <Button as='a' variant='outline' href={ui.supportUrl}>
                    {ui.contactLabel}
                  </Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Box
        id={ui.aboutId}
        px={{ base: ui.xsMargin, md: ui.xxlMargin }}
        pt={ui.smMargin}
        align='center'
      >
        <Box pos='relative' pt={1} w={ui.timelineWidth} minW={ui.timelineMinWidth}>
          <svg ref={timeline} width='100%'>
            <g ref={timelineParts} />
          </svg>
          <Box
            pos='absolute'
            left={0}
            top={0}
            bgGradient='linear(to-r, chakra-body-bg, transparent)'
            w={ui.gradientWidth}
            h='100%'
          />
          <Box
            pos='absolute'
            right={0}
            top={0}
            bgGradient='linear(to-l, chakra-body-bg, transparent)'
            w={ui.gradientWidth}
            h='100%'
          />
        </Box>
        <Text
          variant='description'
          mt={ui.xsMargin}
          w={ui.teamMargin} align='left' color='bg-button'>
          <Text as='strong' variant='lede' color='bg-button'>
            Made by experts:
          </Text>
          {' Our team knows web infrastructure & [is] agents'}
        </Text>
        <Flex
          mx={ui.xsMargin}
          mt={ui.lgMargin}
          direction={{ base: 'column', lg: 'row' }}
          justify='space-evenly'
        >
          <Card variant='teammate'>
            <CardBody>
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
              <Heading variant='name' fontSize={ui.nameFontSize}>
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
                <Text as='strong' variant='bold'>
                  Massive
                </Text>
                {' that’s focused on serving AI agents.'}
              </Text>
            </CardBody>
            <CardFooter>
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
                    ref={githubIcon}
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
                    ref={linkedinIcon}
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
                    ref={xIcon}
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
          <Card variant='teammate'>
            <CardBody>
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
              <Heading variant='name' fontSize={ui.nameFontSize}>
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
                <Text as='strong' variant='bold'>
                  Startup Weekend
                </Text>
                {' and AI investor '}
                <Text as='strong' variant='bold'>
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
      <OrderedList
        id={ui.citationsId}
        variant='citations'
        px={{ base: ui.xsMargin, md: ui.xxlMargin }}
        mt={ui.smMargin}
        mb={3}
      >
        <ListItem>
          <Link
            variant='citation'
            href='https://medium.com/samsung-internet-dev/introducing-our-new-tracking-blocker-powered-by-disconnect-c00f118c1151'
            isExternal
          >
            “The filter used by the Tracking Blocker is provided by Disconnect, the industry-leading
            privacy protection company”, Samsung
          </Link>
        </ListItem>
        <ListItem>
          <Link
            variant='citation'
            href='https://proxyway.com/research/proxy-service-awards-2025'
            isExternal
          >
            “[Massive] topped our benchmarks multiple times and handled everything we threw at it”,
            Proxyway
          </Link>
        </ListItem>
      </OrderedList>
      {!isInMdView && (
        <WaitlistModal
          supabaseClient={supabaseClient}
          session={session}
          isOpen={isWaitlistOpen}
          join={() => {
            setIsWaitlisted(true);
          }}
          close={closeWaitlist}
        />
      )}
      <LoginModal
        supabaseClient={supabaseClient}
        redirectUrl={pendingCheckoutUrl}
        isOpen={isLoginOpen}
        close={closeLogin}
      />
    </>
  );
}
