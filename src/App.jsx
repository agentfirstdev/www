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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Tooltip,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
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
  const logoFrames = useRef();
  const servicesFrames = useRef();
  const hedFrames = useRef();
  const agentFrames = useRef();
  const frameIndex = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const blueprintStroke = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const blueprintFill = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const servicesStroke = useColorModeValue(ui.blackLightAlpha, ui.creativeBlue);
  const servicesFill = useColorModeValue(ui.blackLightAlpha, ui.creativeBlue);
  const postItColorIndex = useColorModeValue(0, 1);
  // const postItColors = ui.postItColors[Math.floor(ui.postItColors.length * Math.random())];
  const isLightMode = colorMode == 'light';
  const modeId = 'mode';
  const modeLabel = `Switch to ${isLightMode ? 'dark' : 'light'} mode`;
  const generateFrame = (canvas, path, roughParams) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempContext = tempCanvas.getContext('2d');
    const tempRough = rough.canvas(tempCanvas);

    tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempRough.path(path, roughParams);

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
    logoFrames.current = [];
    servicesFrames.current = [];
    hedFrames.current = [];
    agentFrames.current = [];
    frameIndex.current = 0;
    const logoCanvas = logotype.current;
    const logoContext = logoCanvas.getContext('2d');
    const servicesCanvas = services.current;
    const servicesContext = servicesCanvas.getContext('2d');
    const hedCanvas = hedcut.current;
    const hedContext = hedCanvas.getContext('2d');
    const agentCanvas = agent.current;
    const agentContext = agentCanvas.getContext('2d');
    const id = setInterval(() => {
      let frame;

      if (logoFrames.current[frameIndex.current]) {
        frame = logoFrames.current[frameIndex.current];
      } else {
        frame = generateFrame(logoCanvas, Logotype(), {
          stroke: blueprintStroke,
          strokeWidth: ui.blueprintStroke,
          fill: blueprintFill,
          fillStyle: ui.logoFill,
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
        frame = generateFrame(servicesCanvas, Services(), {
          stroke: servicesStroke,
          strokeWidth: ui.blueprintStroke,
          fill: servicesFill,
          fillStyle: ui.servicesFill,
          hachureAngle: ui.blueprintAngle,
          roughness: ui.servicesRoughness
        });

        servicesFrames.current.push(frame);
      }

      servicesContext.clearRect(0, 0, servicesCanvas.width, servicesCanvas.height);
      servicesContext.drawImage(frame, 0, 0);

      if (hedFrames.current[frameIndex.current]) {
        frame = hedFrames.current[frameIndex.current];
      } else {
        frame = generateFrame(hedCanvas, Hedcut(), {
          stroke: ui.hedStroke,
          strokeWidth: ui.blueprintStroke,
          fill: blueprintFill,
          fillStyle: ui.hedFill,
          hachureAngle: ui.blueprintAngle,
          roughness: ui.hedRoughness
        });

        hedFrames.current.push(frame);
      }

      hedContext.clearRect(0, 0, hedCanvas.width, hedCanvas.height);
      hedContext.drawImage(frame, 0, 0);

      if (agentFrames.current[frameIndex.current]) {
        frame = agentFrames.current[frameIndex.current];
      } else {
        frame = generateFrame(agentCanvas, Agent(), {
          stroke: ui.agentStroke,
          strokeWidth: ui.blueprintStroke,
          fill: blueprintFill,
          fillStyle: ui.agentFill,
          hachureAngle: ui.blueprintAngle,
          roughness: ui.agentRoughness
        });

        agentFrames.current.push(frame);
      }

      agentContext.clearRect(0, 0, agentCanvas.width, agentCanvas.height);
      agentContext.drawImage(frame, 0, 0);

      frameIndex.current = ++frameIndex.current % ui.frameCount;
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
        <Flex pos='absolute' top={ui.navPosition} right={ui.navPosition}>
          <Flex display={{ base: 'none', lg: 'flex' }} align='center'>
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
          </Flex>
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
          <Menu>
            <MenuButton
              as={IconButton}
              display={{ base: 'inline-flex', lg: 'none' }}
              mt={ui.hamburgerYMargin}
              ml={ui.hamburgerXMargin}
              borderRadius='50%'
              w={ui.controlDimension}
              h={ui.controlDimension}
              fontSize='xl'
              icon={<HamburgerIcon />}
              aria-label={ui.menuLabel}
            />
            <MenuList p='0'>
              <MenuItem as='a' borderRadius={ui.menuTopBorder} href='#services'>
                Services
              </MenuItem>
              <MenuItem as='a' borderRadius='0' href='#pricing'>
                Pricing
              </MenuItem>
              <MenuItem as='a' borderRadius='0' href={ui.demoUrl} target='_blank' rel='noopener'>
                Live demo
              </MenuItem>
              <MenuItem as='a' borderRadius='0' href='#team'>
                Our team
              </MenuItem>
              <MenuItem as='a' borderRadius={ui.menuBottomBorder} href='#contact'>
                Contact info
              </MenuItem>
            </MenuList>
          </Menu>
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
              Enhance your agent instantly with world-class research & browsing abilities …
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
        px={{ base: ui.smMargin, md: ui.xlMargin }}
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
            <Button w={ui.buttonWidth} h={ui.buttonHeight}>
              Get started
            </Button>
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
            <Button w={ui.buttonWidth} h={ui.buttonHeight}>
              Get started
            </Button>
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
            <Button w={ui.buttonWidth} h={ui.buttonHeight}>
              Join waitlist
            </Button>
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
            <Button w={ui.buttonWidth} h={ui.buttonHeight}>
              Get started
            </Button>
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
          direction={{ base: 'column', lg: 'row' }}
          justify='space-evenly'
        >
          <Card bg='transparent' w={ui.cardWidth} boxShadow='none'>
            <CardBody textAlign='left'>
              <Box
                mt={ui.hedMargin}
                w={ui.hedWidth}
                maxW={ui.hedMaxWidth}
                transform={ui.hedTransform}
              >
                <canvas
                  ref={hedcut}
                  width='608'
                  height='912'
                  style={{ width: '100%' }}
                  role='img'
                  aria-label={ui.hedLabel}
                />
              </Box>
              <Heading variant='name' fontSize={ui.nameFont}>
                Brian Kennish
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
          <Card bg='transparent' w={ui.cardWidth} boxShadow='none'>
            <CardBody textAlign='left'>
              <Box w={ui.agentWidth} maxW={ui.agentMaxWidth}>
                <canvas
                  ref={agent}
                  width='1024'
                  height='1536'
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
