import { useRef, useEffect } from 'react';
import { Box, Flex, IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import rough from 'roughjs/bin/rough';

import * as ui from './config/ui';
import AgentFirst from './assets/AgentFirst';
import './App.css';

export default function App() {
  const logotype = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLightMode = colorMode == 'light';
  const modeId = 'mode';
  const modeLabel = `Switch to ${isLightMode ? 'dark' : 'light'} mode`;
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
    const canvas = logotype.current;
    const context = canvas.getContext('2d');
    const roughCanvas = rough.canvas(canvas);
    const id = setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      roughCanvas.path(AgentFirst(), {
        stroke: '#3057e1',
        fill: '#4a6de5',
        strokeWidth: ui.logoStroke,
        roughness: ui.logoRoughness,
        hachureAngle: ui.logoAngle
      });
    }, ui.logoRefreshMs);

    return () => {
      clearInterval(id);
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

  return (
    <Flex w='100%' minH='100vh'>
      <Box mt='2'>
        <canvas
          ref={logotype}
          width='1760'
          height='352'
          style={{ width: '25%', minWidth: '256px' }}
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
          <Tooltip mr='1' p={ui.tooltipPadding} label={modeLabel} hasArrow>
            <IconButton
              variant='monochrome'
              icon={isLightMode ? <MoonIcon /> : <SunIcon sx={{ g: { strokeWidth: 3 } }} />}
              fontSize='sm'
              aria-label={modeLabel}
              onClick={toggleColorMode}
            />
          </Tooltip>
        </Flex>
      </Box>
    </Flex>
  );
}
