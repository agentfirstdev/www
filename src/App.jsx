import { useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  IconButton,
  Badge,
  Tooltip,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';

import * as ui from './config/ui';
import AgentFirst from './assets/AgentFirst';
import './App.css';

export default function App() {
  const logotype = useRef();
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
    const canvas = logotype.current;
    const context = canvas.getContext('2d');
    const roughCanvas = rough.canvas(canvas);
    const id = setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      roughCanvas.path(AgentFirst(), {
        stroke: strokeColor,
        fill: fillColor,
        strokeWidth: ui.logoStroke,
        roughness: ui.logoRoughness,
        hachureAngle: ui.logoAngle
      });
    }, ui.logoRefreshMs);

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
      <Flex mt={ui.sectionMargin} px={ui.sectionPadding} w='100%' h='50vh'>
        <Flex w='50%' justifyContent='center' alignItems='center'>
          <Flex
            border={`1px solid ${ui.postItColors[postItColorIndex].border}`}
            bgGradient={
              `linear(${ui.gradientAngle}deg, ` +
              `${ui.postItColors[postItColorIndex].background.from}, ` +
              `${ui.postItColors[postItColorIndex].background.to})`
            }
            px={ui.postItPadding}
            w={ui.postItDimension}
            h={ui.postItDimension}
            direction='column'
            alignItems='center'
            justifyContent='center'
            boxShadow={ui.postItShadow}
            transform={`rotate(${ui.postItRotation})`}
          >
            <Heading as='h1' variant='post-it'>
              <ui.Tagline />
            </Heading>
            <Text variant='post-it'>
              Enhance your agent with world-class research & browsing abilities in minutes …
            </Text>
          </Flex>
        </Flex>
        <Flex w='50%' />
      </Flex>
      <Box
        m={ui.sectionMargin}
        border='1px solid var(--chakra-colors-chakra-border-color)'
        borderRadius='3xl'
        bg='chakra-subtle-bg'
        px={ui.sectionPadding}
        py={ui.sectionMargin}
      >
        <Heading as='h1' id='services' color='accent.primary'>
          Services
        </Heading>
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
      </Box>
    </Flex>
  );
}
