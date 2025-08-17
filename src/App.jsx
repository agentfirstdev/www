import { useRef, useState, useEffect } from 'react';
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
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';

import * as ui from './config/ui';
import * as uix from './config/uix';
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
  const siteIcon = useRef();
  const githubIcon = useRef();
  const linkedinIcon = useRef();
  const xIcon = useRef();
  const [logoPath, setLogoPath] = useState(null);
  const [servicesPath, setServicesPath] = useState(null);
  const [hedPath, setHedPath] = useState(null);
  const [agentPath, setAgentPath] = useState(null);
  const [sitePath, setSitePath] = useState(null);
  const [githubPath, setGithubPath] = useState(null);
  const [linkedinPath, setLinkedinPath] = useState(null);
  const [xPath, setXPath] = useState(null);
  const logoFrames = useRef();
  const servicesFrames = useRef();
  const hedFrames = useRef();
  const agentFrames = useRef();
  const siteFrames = useRef();
  const githubFrames = useRef();
  const linkedinFrames = useRef();
  const xFrames = useRef();
  const frameIndex = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const blueprintStroke = useColorModeValue(ui.creativeBlue, ui.royalBlue);
  const blueprintFill = useColorModeValue(ui.royalBlue, ui.creativeBlue);
  const servicesStroke = useColorModeValue(ui.blackAlpha, ui.creativeBlue);
  const servicesFill = useColorModeValue(ui.blackAlpha, ui.creativeBlue);
  const postItColorIndex = useColorModeValue(0, 1);
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
  /* const handleKeyPress = (event, commitAction, cancelAction) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      commitAction(event);
    } else if (cancelAction && event.key == 'Escape') {
      event.preventDefault();
      cancelAction(event);
    }
  }; */

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
    import('./paths/globe.txt?raw').then((module) => {
      setSitePath(module.default);
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
    if (
      logoPath &&
      servicesPath &&
      hedPath &&
      agentPath &&
      sitePath &&
      githubPath &&
      linkedinPath &&
      xPath &&
      blueprintStroke &&
      blueprintFill &&
      servicesStroke &&
      servicesFill
    ) {
      logoFrames.current = [];
      servicesFrames.current = [];
      hedFrames.current = [];
      agentFrames.current = [];
      siteFrames.current = [];
      githubFrames.current = [];
      linkedinFrames.current = [];
      xFrames.current = [];
      frameIndex.current = 0;
      const logoCanvas = logotype.current;
      const logoContext = logoCanvas.getContext('2d');
      const servicesCanvas = services.current;
      const servicesContext = servicesCanvas.getContext('2d');
      const hedCanvas = hedcut.current;
      const hedContext = hedCanvas.getContext('2d');
      const agentCanvas = agent.current;
      const agentContext = agentCanvas.getContext('2d');
      const siteCanvas = siteIcon.current;
      const siteContext = siteCanvas.getContext('2d');
      const githubCanvas = githubIcon.current;
      const githubContext = githubCanvas.getContext('2d');
      const linkedinCanvas = linkedinIcon.current;
      const linkedinContext = linkedinCanvas.getContext('2d');
      const xCanvas = xIcon.current;
      const xContext = xCanvas.getContext('2d');
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

        if (hedFrames.current[frameIndex.current]) {
          frame = hedFrames.current[frameIndex.current];
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

        if (agentFrames.current[frameIndex.current]) {
          frame = agentFrames.current[frameIndex.current];
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

        if (siteFrames.current[frameIndex.current]) {
          frame = siteFrames.current[frameIndex.current];
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

        if (githubFrames.current[frameIndex.current]) {
          frame = githubFrames.current[frameIndex.current];
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

        if (linkedinFrames.current[frameIndex.current]) {
          frame = linkedinFrames.current[frameIndex.current];
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

        if (xFrames.current[frameIndex.current]) {
          frame = xFrames.current[frameIndex.current];
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

        frameIndex.current = ++frameIndex.current % ui.frameCount;
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
    sitePath,
    githubPath,
    linkedinPath,
    xPath,
    blueprintStroke,
    blueprintFill,
    servicesStroke,
    servicesFill
  ]);

  return (
    <Flex w='100%' minH='100vh' direction='column'>
      <Box>
        <canvas
          ref={logotype}
          width={ui.logoOldWidth}
          height={ui.logoOldHeight}
          style={{ marginTop: ui.logoMargin, width: ui.logoNewWidth, minWidth: ui.logoMinWidth }}
          role='img'
          aria-label={ui.logoLabel}
        />
        <Flex pos='absolute' top={ui.navTopPosition} right={ui.navRightPosition}>
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
          <Tooltip mr={ui.tooltipMargin} p={ui.tooltipPadding} label={modeLabel} hasArrow>
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
          <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <Tooltip
              mr={ui.tooltipMargin}
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
        mt={ui.mdMargin}
        mb={ui.lgMargin}
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        w='100%'
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex w={{ base: '100%', md: '50%' }} justify='center' align='center'>
          <Box
            position='relative'
            w={ui.postItWidth}
            minW={ui.postItMinWidth}
            maxW={ui.postItMaxWidth}
            _before={{ display: 'block', pt: '100%', content: '""' }}
          >
            <Flex
              position='absolute'
              top='0'
              left='0'
              border={`1px solid ${ui.postItColors[postItColorIndex].border}`}
              bgGradient={
                `linear(${ui.gradientAngle}deg, ` +
                `${ui.postItColors[postItColorIndex].background.from}, ` +
                `${ui.postItColors[postItColorIndex].background.to})`
              }
              px={ui.postItPadding}
              w='100%'
              h='100%'
              direction='column'
              justify='center'
              align='center'
              boxShadow={ui.postItShadow}
              transform={`rotate(${ui.postItRotation})`}
            >
              <Heading as='h1' variant='post-it' fontSize={ui.postItFont}>
                <uix.Tagline />
              </Heading>
              <Text variant='post-it' textAlign='center'>
                Enhance your agent instantly with world-class research & browsing abilities …
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex w={{ base: '100%', md: '50%' }} justify='center' align='center'>
          {/* TODO: Add timeline. */}
        </Flex>
      </Flex>
      <Box
        id='services'
        border={ui.servicesBorder}
        bg='chakra-subtle-bg'
        px={{ base: ui.smMargin, md: ui.xlMargin }}
        pt={ui.mdMargin}
        pb={ui.lgMargin}
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
                w={ui.hedNewWidth}
                maxW={ui.hedMaxWidth}
                transform={ui.hedTransform}
              >
                <canvas
                  ref={hedcut}
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
                <Text as='strong' variant='co'>
                  Agent First
                </Text>
                {' is a spinoff of '}
                <Text as='strong' variant='bold'>
                  Massive
                </Text>
                {' that’s focused on serving AI agents and their developers.'}
              </Text>
            </CardBody>
            <CardFooter pt='0'>
              <Link p='0' href='https://oldestlivingboy.com/' isExternal>
                <canvas
                  ref={siteIcon}
                  width={ui.siteOldDimension}
                  height={ui.siteOldDimension}
                  style={{ width: ui.iconDimension, height: ui.iconDimension }}
                  role='img'
                  aria-label={ui.siteLabel}
                />
              </Link>
              <Link ml={ui.iconMargin} p='0' href='https://github.com/oldestlivingboy' isExternal>
                <canvas
                  ref={githubIcon}
                  width={ui.githubOldDimension}
                  height={ui.githubOldDimension}
                  style={{ width: ui.iconDimension, minWidth: ui.iconDimension }}
                  role='img'
                  aria-label={ui.githubLabel}
                />
              </Link>
              <Link
                ml={ui.iconMargin}
                p='0'
                href='https://www.linkedin.com/in/oldestlivingboy/'
                isExternal
              >
                <canvas
                  ref={linkedinIcon}
                  width={ui.linkedinOldDimension}
                  height={ui.linkedinOldDimension}
                  style={{ width: ui.iconDimension, minWidth: ui.iconDimension }}
                  role='img'
                  aria-label={ui.linkedinLabel}
                />
              </Link>
              <Link ml={ui.iconMargin} p='0' href='https://x.com/oldestlivingboy' isExternal>
                <canvas
                  ref={xIcon}
                  width={ui.xOldDimension}
                  height={ui.xOldDimension}
                  style={{ width: ui.iconDimension, minWidth: ui.iconDimension }}
                  role='img'
                  aria-label={ui.xLabel}
                />
              </Link>
            </CardFooter>
          </Card>
          <Card bg='transparent' w={ui.cardWidth} boxShadow='none'>
            <CardBody textAlign='left'>
              <Box w={ui.agentNewWidth} maxW={ui.agentMaxWidth}>
                <canvas
                  ref={agent}
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
                {' is a cofounder agent we’re creating in collaboration with '}
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
