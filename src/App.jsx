import { useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Code,
  Link,
  Button,
  IconButton,
  Badge,
  Tooltip,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';

import * as ui from './config/ui';
import * as uix from './config/uix';
import Logotype from './assets/Logotype';
import Hedcut from './assets/Hedcut';
import Agent from './assets/Agent';
import search from './markdown/SEARCH.md?raw';
import browsing from './markdown/BROWSING.md?raw';
import searchGeotargeting from './markdown/GEOTARGETING-SEARCH.md?raw';
import browsingGeotargeting from './markdown/GEOTARGETING-BROWSING.md?raw';
import './App.css';

export default function App() {
  const logotype = useRef();
  const hedcut = useRef();
  const agent = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const strokeColor = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const fillColor = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const isLightMode = colorMode == 'light';
  const modeId = 'mode';
  const modeLabel = `Switch to ${isLightMode ? 'dark' : 'light'} mode`;
  // const postItColors = ui.postItColors[Math.floor(ui.postItColors.length * Math.random())];
  const postItColorIndex = useColorModeValue(0, 1);
  const handleKeyPress = (event, commitAction, cancelAction) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      commitAction(event);
    } else if (cancelAction && event.key == 'Escape') {
      event.preventDefault();
      cancelAction(event);
    }
  };

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
    const logoCanvas = logotype.current;
    const logoContext = logoCanvas.getContext('2d');
    const logoRough = rough.canvas(logoCanvas);
    const hedCanvas = hedcut.current;
    const hedContext = hedCanvas.getContext('2d');
    const hedRough = rough.canvas(hedCanvas);
    const agentCanvas = agent.current;
    const agentContext = agentCanvas.getContext('2d');
    const agentRough = rough.canvas(agentCanvas);
    const id = setInterval(() => {
      logoContext.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
      logoRough.path(Logotype(), {
        stroke: strokeColor,
        strokeWidth: ui.blueprintStroke,
        fill: fillColor,
        fillStyle: ui.logoFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.blueprintRoughness
      });
      hedContext.clearRect(0, 0, hedCanvas.width, hedCanvas.height);
      hedRough.path(Hedcut(), {
        stroke: ui.hedStroke,
        strokeWidth: ui.blueprintStroke,
        fill: fillColor,
        fillStyle: ui.hedFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.blueprintRoughness
      });
      agentContext.clearRect(0, 0, agentCanvas.width, agentCanvas.height);
      agentRough.path(Agent(), {
        stroke: ui.agentStroke,
        strokeWidth: ui.blueprintStroke,
        fill: fillColor,
        fillStyle: ui.agentFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.blueprintRoughness
      });
    }, ui.blueprintRefreshMs);

    return () => {
      clearInterval(id);
    };
  }, [fillColor, strokeColor]);

  return (
    <Flex w='100%' minH='100vh' direction='column'>
      <Box>
        <canvas
          ref={logotype}
          width='1760'
          height='352'
          style={{ marginTop: '8px', marginLeft: '4px', width: '25%', minWidth: '256px' }}
          role='img'
          aria-label={ui.logoLabel}
        />
        <Flex
          pos='absolute'
          top={ui.navPosition}
          right={ui.navPosition}
          align='center'
          fontWeight={ui.controlFontWeight}
        >
          <Link variant='nav' ml={ui.itemMargin} href='#services'>
            Services
          </Link>
          <Link variant='nav' ml={ui.itemMargin} href='#pricing'>
            Pricing
          </Link>
          <Link variant='nav' ml={ui.itemMargin} href={ui.demoUrl} isExternal>
            Live demo
          </Link>
          <Link variant='nav' ml={ui.itemMargin} href='#team'>
            Our team
          </Link>
          <Link variant='nav' ml={ui.itemMargin} href='#contact'>
            Contact info
          </Link>
          <Tooltip mr='1' p={ui.tooltipPadding} label={modeLabel} hasArrow>
            <IconButton
              variant='monochrome'
              ml={ui.itemMargin}
              icon={isLightMode ? <MoonIcon /> : <SunIcon sx={{ g: { strokeWidth: 3 } }} />}
              fontSize='sm'
              aria-label={modeLabel}
              onClick={toggleColorMode}
            />
          </Tooltip>
        </Flex>
      </Box>
      <Flex
        id='hero'
        mt={ui.smMargin}
        px={{ base: ui.smMargin, md: ui.lgMargin }}
        w='100%'
        h={{ base: 'auto', md: '50vh' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex w={{ base: '100%', md: '50%' }} justify='center' align='center'>
          <Flex
            border={`1px solid ${ui.postItColors[postItColorIndex].border}`}
            bgGradient={
              `linear(${ui.gradientAngle}deg, ` +
              `${ui.postItColors[postItColorIndex].background.from}, ` +
              `${ui.postItColors[postItColorIndex].background.to})`
            }
            px={ui.postItPadding}
            w={ui.postItDimension}
            minW={ui.postItDimension}
            minH={ui.postItDimension}
            direction='column'
            justify='center'
            align='center'
            boxShadow={ui.postItShadow}
            transform={`rotate(${ui.postItRotation})`}
          >
            <Heading as='h1' variant='post-it'>
              <uix.Tagline />
            </Heading>
            <Text variant='post-it'>
              Enhance your agent with world-class research & browsing abilities in minutes …
            </Text>
          </Flex>
        </Flex>
        <Flex w={{ base: '100%', md: '50%' }} justify='center' align='center'>
          {/* TODO: Add timeline. */}
        </Flex>
      </Flex>
      <Box
        id='services'
        mt={ui.smMargin}
        border='1px solid var(--chakra-colors-chakra-border-color)'
        bg='chakra-subtle-bg'
        px={ui.lgMargin}
        py={ui.mdMargin}
        textAlign='left'
      >
        <Heading as='h1' variant='section'>
          Services
        </Heading>
        <Card mt={ui.smMargin} boxShadow='md'>
          <CardBody>
            <Heading as='h2' variant='service'>
              1. Google-like search
            </Heading>
            <Text variant='service'>
              <Text as='strong' variant='co'>
                Agent First
              </Text>
              {' lets you reliably integrate live Google results, including '}
              <Text as='strong' variant='bold'>
                all organic & paid result types
              </Text>
              {', as structured data or raw HTML:'}
            </Text>
            <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(search) }} />
          </CardBody>
          <CardFooter>
            <Button>Get started</Button>
          </CardFooter>
        </Card>
        <Card mt={ui.smMargin} boxShadow='md'>
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
            <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(browsing) }} />
          </CardBody>
          <CardFooter>
            <Button>Get started</Button>
          </CardFooter>
        </Card>
        <Card mt={ui.smMargin} boxShadow='md'>
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
              {' (Chrome DevTools Protocol–compatible code) to complete advanced tasks on behalf of '}
              users.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Join waitlist</Button>
          </CardFooter>
        </Card>
        <Card mt={ui.smMargin} boxShadow='md'>
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
              {' within our proxy network for local results & content:'}
            </Text>
            <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(searchGeotargeting) }} />
            <Box clear='both' />
            <Code dangerouslySetInnerHTML={{ __html: ui.renderer.render(browsingGeotargeting) }} />
          </CardBody>
          <CardFooter>
            <Button>Get started</Button>
          </CardFooter>
        </Card>
      </Box>
    </Flex>
  );
}
