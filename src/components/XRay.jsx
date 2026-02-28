import { useRef, useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

import * as ui from '../config/ui';

const maskRadius = ui.xRayDiameterPixels / 2;
const gradients = [];

for (let i = 0; i < ui.xRayRougheningPasses; i++) {
  const offset = i * (!(i % 2) ? 1 : -1);

  gradients.push(
    'radial-gradient(circle ' +
      (maskRadius + offset) +
      'px at ' +
      (50 - offset) +
      '% ' +
      (50 + offset) +
      '%, rgba(0, 0, 0, ' +
      ui.xRayOpacity +
      ') 0%, transparent 100%)'
  );
}

const mask = gradients.join(', ');
const maskSize = `${ui.xRayDiameterPixels}px ${ui.xRayDiameterPixels}px`;

export default function XRay() {
  const field = useRef();
  const anatomy = useRef();
  const [isDesktopView] = useState(() => {
    return window?.matchMedia('(hover: hover)').matches;
  });
  const backgroundColor = useColorModeValue(ui.darkBackground, ui.lightBackground);
  const textColor = useColorModeValue(ui.whiteAlpha, ui.blackAlpha);

  useEffect(() => {
    if (isDesktopView) {
      if (anatomy.current) anatomy.current.textContent = '';

      const pageHeight = document.documentElement.scrollHeight;

      if (anatomy.current) {
        let fontSize = ui.xRayFontSizePixels;
        anatomy.current.textContent = document.body.cloneNode(true).outerHTML;
        anatomy.current.style.fontSize = `${fontSize}px`;

        for (let i = 0; i < ui.xRayFontSizingPasses; i++) {
          fontSize *= Math.sqrt(pageHeight / anatomy.current.scrollHeight);
          anatomy.current.style.fontSize = `${fontSize}px`;
        }
      }

      const htmlHeight = anatomy.current ? anatomy.current.scrollHeight : 0;
      const scrollScale = !htmlHeight
        ? 1
        : (htmlHeight - window.innerHeight) / (pageHeight - window.innerHeight);

      const updateMask = (event) => {
        if (field.current) {
          const x = event.clientX - maskRadius;
          const y = event.clientY - maskRadius;

          field.current.style.maskPosition = `${x}px ${y}px`;
          field.current.style.webkitMaskPosition = `${x}px ${y}px`;
        }
      };

      const handleScroll = () => {
        if (anatomy.current) {
          anatomy.current.style.transform = `translateY(${-window.scrollY * scrollScale}px)`;
        }
      };

      const handleMouseOver = (event) => {
        if (field.current) field.current.style.opacity = 1;

        updateMask(event);
      };

      const handleMouseOut = () => {
        if (field.current) field.current.style.opacity = 0;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('mousemove', updateMask);
      document.addEventListener('mouseenter', handleMouseOver);
      document.addEventListener('mouseleave', handleMouseOut);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousemove', updateMask);
        document.removeEventListener('mouseenter', handleMouseOver);
        document.removeEventListener('mouseleave', handleMouseOut);
      };
    }
  }, []);

  return isDesktopView ? (
    <Box
      ref={field}
      position='fixed'
      top={0}
      left={0}
      zIndex='popover'
      opacity={0}
      bg={backgroundColor}
      w='100vw'
      h='100vh'
      pointerEvents='none'
      style={{
        maskSize,
        WebkitMaskSize: maskSize,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat'
      }}
    >
      <Box
        as='pre'
        ref={anatomy}
        m={ui.xRayMargin}
        w='100%'
        color={textColor}
        whiteSpace='pre-wrap'
        transition='none'
      />
    </Box>
  ) : null;
}
