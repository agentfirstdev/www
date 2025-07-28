import { useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  IconButton,
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
  const postItColors = ui.postItColors[Math.floor(ui.postItColors.length * Math.random())];
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
          style={{ marginTop: '8px', width: '25%', minWidth: '256px' }}
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
            border={`1px solid ${postItColors.border}`}
            bg={postItColors.background}
            px={ui.postItPadding}
            w={ui.postItDimension}
            h={ui.postItDimension}
            direction='column'
            alignItems='center'
            justifyContent='center'
            boxShadow={ui.postItShadow}
            transform={`rotate(${ui.postItRotation})`}
          >
            <Heading
              as='h1'
              fontFamily='"Permanent Marker", cursive'
              fontSize={{ base: '28px', md: '22px', lg: '28px' }}
            >
              <ui.Tagline />
            </Heading>
            <Text
              my='5'
              textAlign='left'
              fontFamily='"Indie Flower", cursive'
              fontSize={{ base: '28px', md: '22px', lg: '28px' }}
            >
              Enhance your agent w/ world-class research & interaction abilities in minutes …
            </Text>
          </Flex>
        </Flex>
        <Flex w='50%' />
      </Flex>
      <Box
        m={ui.sectionMargin}
        borderRadius='3xl'
        bgGradient={`linear(45deg, ${ui.wildSand}, ${ui.cararra})`}
        px={ui.sectionPadding}
        py={ui.sectionMargin}
      >
        <Heading
          as='h1'
          id='services'
          fontFamily='"Permanent Marker", cursive'
          color='accent.primary'
        >
          Services
        </Heading>
        <Heading
          as='h2'
          textAlign='left'
          fontFamily='"Indie Flower", cursive'
          color='accent.primary'
        >
          1. Google-like search
        </Heading>
        <Text
          mt='2'
          textAlign='left'
          fontSize={{ base: 'xl', md: 'lg', lg: 'xl' }}
          fontWeight='300'
        >
          <Text as='strong' fontFamily='"Indie Flower", cursive'>
            Agent First
          </Text>
          {' lets you reliably integrate live Google results, including '}
          <Text as='strong' fontWeight='500'>
            organic & paid result types
          </Text>
          {', as structured data or raw HTML:'}
        </Text>
        <Heading
          as='h2'
          mt={ui.sectionMargin}
          textAlign='left'
          fontFamily='"Indie Flower", cursive'
          color='accent.primary'
        >
          2. Uncaptcha’d browsing
        </Heading>
        <Text
          mt='2'
          textAlign='left'
          fontSize={{ base: 'xl', md: 'lg', lg: 'xl' }}
          fontWeight='300'
        >
          <Text as='strong' fontFamily='"Indie Flower", cursive'>
            Agent First
          </Text>
          {'’s supercluster of '}
          <Text as='strong' fontWeight='500'>
            real, well-behaved browsers
          </Text>
          {' bypasses or solves reCAPTCHA, Cloudflare Turnstile, & other captchas for you:'}
        </Text>
        <Heading
          as='h2'
          mt={ui.sectionMargin}
          textAlign='left'
          fontFamily='"Indie Flower", cursive'
          color='accent.primary'
        >
          … From anywhere
        </Heading>
        <Text
          mt='2'
          textAlign='left'
          fontSize={{ base: 'xl', md: 'lg', lg: 'xl' }}
          fontWeight='300'
        >
          {'All '}
          <Text as='strong' fontFamily='"Indie Flower", cursive'>
            Agent First
          </Text>
          {' requests can be geotargeted to among '}
          <Text as='strong' fontWeight='500'>
            190+ countries & their regions
          </Text>
          {' within our proxy network for local results & content:'}
        </Text>
      </Box>
    </Flex>
  );
}
