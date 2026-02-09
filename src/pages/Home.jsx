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
  UnorderedList,
  ListItem,
  Heading,
  Text,
  Link,
  // Textarea,
  Button,
  // IconButton,
  Badge,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';
import { createTimeline } from 'animejs';

import * as ui from '../config/ui';
import * as uix from '../config/uix';
import Code from '../components/Code';
import Pricing from '../components/Pricing';
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
  generateFrame /* ,
  handleKeyPress */
}) {
  const completion = useRef();
  // const promptBox = useRef();
  const services = useRef();
  const pricing = useRef();
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
  const [servicesPath, setServicesPath] = useState(null);
  const [pricingPath, setPricingPath] = useState(null);
  const [hedPath, setHedPath] = useState(null);
  const [agentPath, setAgentPath] = useState(null);
  const [githubPath, setGithubPath] = useState(null);
  const [linkedinPath, setLinkedinPath] = useState(null);
  const [xPath, setXPath] = useState(null);
  const [sitePath, setSitePath] = useState(null);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const horizontalDividerOverflow = useBreakpointValue({
    base: ui.dividerBaseOverflow,
    md: ui.horizontalDividerOverflow
  });
  const headingColor = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const invertedColor = useColorModeValue(ui.resolutionBlue, ui.cornflowerBlue);
  const textColor = useColorModeValue(ui.charcoalBlue, ui.whiteAlpha);
  const timelineColor = useColorModeValue(ui.blackAlpha, ui.whiteAlpha);
  // const postItColorIndex = useColorModeValue(0, 1);
  const { isOpen: isLoginOpen, onOpen: openLogin, onClose: closeLogin } = useDisclosure();
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
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        w='100%'
        h={ui.heroHeight}
        justify='center'
        align='center'
        gap={0}
      >
        <VStack w={ui.taglineWidth} maxW={ui.taglineMaxWidth} justify='center' align='center'>
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
              ml={4}
              borderRadius='full'
              size='lg'
              icon={<AddIcon boxSize={4} />}
              boxShadow='lg'
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
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        pt={ui.smMargin}
        pb={12}
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
        <Box
          position='relative'
          mt={ui.smMargin}
          _before={{
            position: 'absolute',
            left: 0,
            top: ui.verticalDividerOverflow,
            bottom: ui.verticalDividerOverflow,
            bg: 'fg-grid',
            w: '1px',
            content: '""'
          }}
          _after={{
            position: 'absolute',
            right: 0,
            top: ui.verticalDividerOverflow,
            bottom: ui.verticalDividerOverflow,
            bg: 'fg-grid',
            w: '1px',
            content: '""'
          }}
        >
          <Box
            position='relative'
            px={{ base: ui.xsMargin, md: ui.smMargin }}
            py={ui.smMargin}
            _before={{
              position: 'absolute',
              top: 0,
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '28px', md: '4xl' }}>
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
            <Code markdown={{ sh: searchSh, py: searchPy, js: searchJs }} moreUrl={ui.searchUrl} />
            <Button as='a' mt={4} w={ui.buttonWidth} h={ui.buttonHeight} href={ui.pricingPath}>
              Get started
            </Button>
          </Box>
          <Box
            position='relative'
            px={{ base: ui.xsMargin, md: ui.smMargin }}
            py={ui.smMargin}
            _before={{
              position: 'absolute',
              top: 0,
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '28px', md: '4xl' }}>
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
              moreUrl={ui.browsingUrl}
            />
            <Button as='a' mt={4} w={ui.buttonWidth} h={ui.buttonHeight} href={ui.pricingPath}>
              Get started
            </Button>
          </Box>
          <Box
            position='relative'
            px={{ base: ui.xsMargin, md: ui.smMargin }}
            py={ui.smMargin}
            _before={{
              position: 'absolute',
              top: 0,
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '28px', md: '4xl' }}>
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
            <Button mt={4} w={ui.buttonWidth} h={ui.buttonHeight} isDisabled>
              Join waitlist
            </Button>
          </Box>
          <Box
            position='relative'
            px={{ base: ui.xsMargin, md: ui.smMargin }}
            py={ui.smMargin}
            _before={{
              position: 'absolute',
              top: 0,
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
            _after={{
              position: 'absolute',
              bottom: 0,
              left: horizontalDividerOverflow,
              right: horizontalDividerOverflow,
              bg: 'fg-grid',
              h: '1px',
              content: '""'
            }}
          >
            <Heading as='h2' variant='service' fontSize={{ base: '28px', md: '4xl' }}>
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
            />
            <Code
              markdown={{
                sh: geotargetedBrowsingSh,
                py: geotargetedBrowsingPy,
                js: geotargetedBrowsingJs
              }}
              moreUrl={ui.geotargetingUrl}
            />
            <Button as='a' mt={4} w={ui.buttonWidth} h={ui.buttonHeight} href={ui.pricingPath}>
              Get started
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        id={ui.pricingId}
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        pt={ui.smMargin}
        pb={12}
        align='center'
      >
        <canvas
          ref={pricing}
          className='lazy'
          width={ui.pricingOldWidth}
          height={ui.pricingOldHeight}
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: ui.pricingNewWidth,
            minWidth: ui.pricingMinWidth
          }}
          role='img'
          aria-label={ui.pricingLabel}
        />
        <Text
          variant='description'
          mx={{ base: ui.xsMargin, lg: ui.lgMargin }}
          mt={ui.mdMargin}
          textAlign='left'
        >
          <Text as='strong' variant='co'>
            Agent First
          </Text>
          {' API use is based on credits that cost '}
          <Text as='strong' variant='bold'>
            $1 / 1,000 credits
          </Text>
          {' or '}
          <Text as='strong' variant='bold'>
            $0.90 / 1,000 credits over $100
          </Text>
          {', which lets you make about '}
          <Text as='strong' variant='bold'>
            1,000 successful page requests
          </Text>
          {' (see '}
          <Link variant='pricing' href={ui.rateUrl}>
            our rate card
          </Link>
          {' for details).'}
        </Text>
        <Text
          variant='description'
          mx={{ base: ui.xsMargin, lg: ui.lgMargin }}
          mt='1lh'
          textAlign='left'
        >
          {'Get '}
          <Text as='strong' variant='bold'>
            1,000 free credits
          </Text>
          {' to try the API when you sign up and contact us for volume pricing if you plan to '}
          spend over $1,000 monthly.
        </Text>
        <SimpleGrid
          mx={{ base: ui.smMargin, md: ui.lgMargin }}
          mt={ui.smMargin}
          columns={{ base: 1, md: 3 }}
          spacing={ui.mdMargin}
        >
          <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='xs'>
            <CardHeader>Free trial</CardHeader>
            <CardBody>
              <UnorderedList>
                <ListItem>1,000 free credits</ListItem>
                <ListItem>Bar</ListItem>
                <ListItem>Baz</ListItem>
              </UnorderedList>
            </CardBody>
            <CardFooter>
              <Button w='100%' h={ui.controlDimension}>
                Start free trial
              </Button>
            </CardFooter>
          </Card>
          <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='xs'>
            <CardHeader>À la carte</CardHeader>
            <CardBody>
              <UnorderedList>
                <ListItem>1,000 free credits</ListItem>
                <ListItem>Bar</ListItem>
                <ListItem>Baz</ListItem>
              </UnorderedList>
            </CardBody>
            <CardFooter>
              <Pricing
                addToCart={(dollarAmount) => {
                  const path = `${ui.checkoutPath}?${ui.purchaseKey}=${dollarAmount}`;

                  if (session) {
                    navigate(path);
                  } else {
                    setPendingCheckoutUrl(location.origin + path);
                    openLogin();
                  }
                }}
                textboxBackground='bg-muted'
              />
            </CardFooter>
          </Card>
          <Card mt={ui.smMargin} bg='chakra-subtle-bg' boxShadow='xs'>
            <CardHeader>High volume</CardHeader>
            <CardBody>
              <UnorderedList>
                <ListItem>1,000 free credits</ListItem>
                <ListItem>Bar</ListItem>
                <ListItem>Baz</ListItem>
              </UnorderedList>
            </CardBody>
            <CardFooter>
              <Button as='a' w='100%' h={ui.controlDimension} href={ui.supportUrl}>
                Contact to discuss
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>
      <Box
        id={ui.aboutId}
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        pt={ui.smMargin}
        align='center'
      >
        <Box position='relative' pt={1} w={ui.timelineWidth} minW={ui.timelineMinWidth}>
          <svg ref={timeline} width='100%'>
            <g ref={timelineParts} />
          </svg>
          <Box
            position='absolute'
            top={0}
            left={0}
            bgGradient='linear(to-r, chakra-body-bg, transparent)'
            w={ui.gradientWidth}
            h='100%'
          />
          <Box
            position='absolute'
            top={0}
            right={0}
            bgGradient='linear(to-l, chakra-body-bg, transparent)'
            w={ui.gradientWidth}
            h='100%'
          />
        </Box>
        <Text
          variant='description'
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
      <Box ref={team} id={ui.teamId} pt={ui.smMargin}>
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
            <CardFooter pt={0}>
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
      <LoginModal
        supabaseClient={supabaseClient}
        redirectUrl={pendingCheckoutUrl}
        isOpen={isLoginOpen}
        open={openLogin}
        close={closeLogin}
      />
    </>
  );
}
