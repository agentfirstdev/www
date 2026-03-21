/* global Cal */

import { forwardRef, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  OrderedList,
  ListItem,
  Heading,
  Text,
  Link,
  Button
} from '@chakra-ui/react';

import * as ui from './ui';

// Strings
export const Tagline = forwardRef(function Tagline(props, ref) {
  useEffect(() => {
    if (!window.Cal) {
      ((C, A, L) => {
        let p = (a, ar) => {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ??
          function () {
            let cal = C.Cal;
            let ar = arguments;

            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q ?? [];
              d.head.appendChild(d.createElement('script')).src = A;
              cal.loaded = true;
            }

            if (ar[0] == L) {
              const api = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q ?? [];

              if (typeof namespace == 'string') {
                cal.ns[namespace] = cal.ns[namespace] ?? api;

                p(cal.ns[namespace], ar);
                p(cal, ['initNamespace', namespace]);
              } else {
                p(cal, ar);
              }
            } else {
              p(cal, ar);
            }
          };
      })(window, 'https://cal.com/embed.js', 'init');

      Cal('init', { origin: 'https://cal.com' });
    }
  }, []);

  return (
    <>
      <HStack
        borderWidth='1px'
        rounded='full'
        px={3.5}
        py={1.5}
        _light={{ borderColor: ui.blueAlpha, bg: ui.lightBlueAlpha }}
        _dark={{ borderColor: ui.grayAlpha, bg: ui.lightGrayAlpha }}
      >
        <Box
          rounded='full'
          w={1.5}
          h={1.5}
          _light={{ bg: ui.royalBlue, boxShadow: `0 0 8px ${ui.royalBlue}` }}
          _dark={{ bg: ui.cornflowerBlue, boxShadow: `0 0 8px ${ui.cornflowerBlue}` }}
        />
        <Text variant='pill' display={{ base: 'none', md: 'inline' }}>
          From the developer of the world’s most-used privacy tools
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>1</sup>
          </Link>
          {' & Proxyway’s benchmark-topping proxy provider'}
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>2</sup>
          </Link>
        </Text>
        <Text variant='pill' display={{ base: 'inline', md: 'none' }}>
          From the developer of Proxyway’s benchmark-topping proxy
          <Link variant='marker' href={`#${ui.citationsId}`}>
            <sup>1</sup>
          </Link>
        </Text>
      </HStack>
      <Text variant='audience' display={{ base: 'none', sm: 'block' }} mt={6}>
        {ui.audienceLabel}
      </Text>
      <Text variant='audience' display={{ base: 'block', sm: 'none' }} mt={6}>
        {ui.shortAudienceLabel}
      </Text>
      <Heading as='h1' variant='tagline' mt={ui.mdMargin} fontSize={ui.taglineFontSize}>
        <Box as='span' display='inline-block' position='relative' textAlign='left'>
          <Text fontSize={ui.taglineFontSize} visibility='hidden' pointerEvents='none'>
            Reliable access
          </Text>
          <Text
            ref={ref}
            position='absolute'
            inset={0}
            bgClip='text'
            fontSize={ui.taglineFontSize}
            _light={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.cornflowerBlue}, ${ui.creativeBlue})`
            }}
            _dark={{
              bgGradient: `linear(${ui.gradientAngle}deg, ${ui.creativeBlue}, ${ui.cornflowerBlue})`
            }}
          ></Text>
        </Box>
        {' to every public website'}
      </Heading>
      <Text variant='subheading' display={{ base: 'none', lg: 'inline' }} my={ui.xxsMargin}>
        {ui.subheadingLabel}
      </Text>
      <Text variant='subheading' display={{ base: 'inline', lg: 'none' }} my={ui.xxsMargin}>
        {ui.shortSubheadingLabel}
      </Text>
      <Flex mt={ui.lgMargin} gap={ui.xxsMargin}>
        <Button
          size={{ base: 'md', sm: 'lg' }}
          h={ui.ctaHeight}
          tabIndex={1}
          onClick={props.onCtaPress}
        >
          <Text as='span' display={{ base: 'none', md: 'inline' }}>
            {ui.ctaLabel}
          </Text>
          <Text as='span' display={{ base: 'inline', md: 'none' }} fontSize='inherit'>
            {ui.shortCtaLabel}
          </Text>
        </Button>
        <Button
          variant='outline'
          size={{ base: 'md', sm: 'lg' }}
          w='auto'
          h={ui.ctaHeight}
          tabIndex={2}
          data-cal-link={ui.calPath}
        >
          {ui.secondaryCtaLabel}
        </Button>
      </Flex>
      <OrderedList id={ui.citationsId} variant='citations' mt={6} pt={ui.mdMargin}>
        <ListItem display={{ base: 'none', md: 'list-item' }}>
          <Link
            variant='citation'
            href='https://medium.com/samsung-internet-dev/introducing-our-new-tracking-blocker-powered-by-disconnect-c00f118c1151'
            isExternal
          >
            “The [Tracking Blocker filter] is provided by Disconnect, the industry-leading privacy
            protection company”, Samsung
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
    </>
  );
});
