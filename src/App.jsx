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
import Services from './assets/Services';
import Hedcut from './assets/Hedcut';
import Agent from './assets/Agent';
import search from './markdown/SEARCH.md?raw';
import browsing from './markdown/BROWSING.md?raw';
import searchGeotargeting from './markdown/GEOTARGETING-SEARCH.md?raw';
import browsingGeotargeting from './markdown/GEOTARGETING-BROWSING.md?raw';
import './App.css';

export default function App() {
  const logotype = useRef();
  const services = useRef();
  const hedcut = useRef();
  const agent = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const blueprintStroke = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const blueprintFill = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const servicesStroke = useColorModeValue(ui.blackLightAlpha, ui.creativeBlue);
  const servicesFill = useColorModeValue(ui.blackLightAlpha, ui.creativeBlue);
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
    const servicesCanvas = services.current;
    const servicesContext = servicesCanvas.getContext('2d');
    const servicesRough = rough.canvas(servicesCanvas);
    const hedCanvas = hedcut.current;
    const hedContext = hedCanvas.getContext('2d');
    const hedRough = rough.canvas(hedCanvas);
    const agentCanvas = agent.current;
    const agentContext = agentCanvas.getContext('2d');
    const agentRough = rough.canvas(agentCanvas);
    const id = setInterval(() => {
      logoContext.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
      logoRough.path(Logotype(), {
        stroke: blueprintStroke,
        strokeWidth: ui.blueprintStroke,
        fill: blueprintFill,
        fillStyle: ui.logoFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.logoRoughness
      });
      servicesContext.clearRect(0, 0, servicesCanvas.width, servicesCanvas.height);
      servicesRough.path(Services(), {
        stroke: servicesStroke,
        strokeWidth: ui.blueprintStroke,
        fill: servicesFill,
        fillStyle: ui.servicesFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.servicesRoughness
      });
      hedContext.clearRect(0, 0, hedCanvas.width, hedCanvas.height);
      hedRough.path(Hedcut(), {
        stroke: ui.hedStroke,
        strokeWidth: ui.blueprintStroke,
        fill: blueprintFill,
        fillStyle: ui.hedFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.hedRoughness
      });
      agentContext.clearRect(0, 0, agentCanvas.width, agentCanvas.height);
      agentRough.path(Agent(), {
        stroke: ui.agentStroke,
        strokeWidth: ui.blueprintStroke,
        fill: blueprintFill,
        fillStyle: ui.agentFill,
        hachureAngle: ui.blueprintAngle,
        roughness: ui.agentRoughness
      });
    }, ui.blueprintRefreshMs);

    return () => {
      clearInterval(id);
    };
  }, [blueprintFill, blueprintStroke, servicesStroke, servicesFill]);

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
        mb={ui.mdMargin}
        px={{ base: ui.smMargin, md: ui.xlMargin }}
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
        border='1px solid var(--chakra-colors-chakra-border-color)'
        bg='chakra-subtle-bg'
        px={ui.xlMargin}
        pt={ui.mdMargin}
        pb={ui.lgMargin}
        textAlign='left'
      >
        <canvas
          ref={services}
          width='1024'
          height='264'
          style={{ marginRight: 'auto', marginLeft: 'auto', width: '15%', minWidth: '160px' }}
          role='img'
          aria-label={ui.servicesLabel}
        />
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
              {' (Chrome DevTools Protocol–compatible code) to complete advanced tasks on behalf '}
              of users.
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
      <Box id='team' py={ui.mdMargin}>
        <Heading as='h1' variant='section'>
          Our team
        </Heading>
        <Flex
          mx={ui.smMargin}
          mt={ui.smMargin}
          px={ui.xlMargin}
          direction={{ base: 'column', md: 'row' }}
        >
          <Card mx={ui.mdMargin} px={ui.smMargin} w={{ base: '100%', md: '50%' }} boxShadow='none'>
            <CardBody textAlign='left'>
              <canvas
                ref={hedcut}
                width='608'
                height='912'
                style={{ marginTop: '-16px', marginLeft: '-16px', width: '160px' }}
                role='img'
                aria-label={ui.hedcutLabel}
              />
              <Heading variant='name'>Brian Kennish</Heading>
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
                {' computing resources and was named Proxyway’s 2025 “Newcomer of the Year”. '}
                <Text as='strong' variant='co'>
                  Agent First
                </Text>
                {' is a spinoff of '}
                <Text as='strong' variant='bold'>
                  Massive
                </Text>
                {' that’s focused on serving AI agents.'}
              </Text>
            </CardBody>
            <CardFooter display='none'>{/* TODO: Add social icons. */}</CardFooter>
          </Card>
          <Card mx={ui.mdMargin} px={ui.smMargin} w={{ base: '100%', md: '50%' }} boxShadow='none'>
            <CardBody textAlign='left'>
              <canvas
                ref={agent}
                width='1024'
                height='1536'
                style={{ width: '144px' }}
                role='img'
                aria-label={ui.agentLabel}
              />
              <Heading variant='name'>Brain</Heading>
              <Text variant='teammate'>
                <Text as='strong' variant='name'>
                  Brain
                </Text>
                {' is a cofounder agent we’re creating to run the boring parts of '}
                <Text as='strong' variant='co'>
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
            <CardFooter display='none'>{/* TODO: Add social icons. */}</CardFooter>
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
}
