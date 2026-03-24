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
import { CheckIcon } from '@chakra-ui/icons';

import * as ui from './ui';

// Strings
export const Tagline = forwardRef(function Tagline(props, ref) {
  useEffect(() => {
    ui.embedCal();
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
          _light={{ bg: ui.royalBlue, shadow: `0 0 8px ${ui.royalBlue}` }}
          _dark={{ bg: ui.cornflowerBlue, shadow: `0 0 8px ${ui.cornflowerBlue}` }}
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
      <Text variant='audience' display={{ base: 'block', sm: 'none' }} mt={ui.xxsMargin}>
        {ui.shortAudienceLabel}
      </Text>
      <Heading as='h1' variant='tagline' mt={'4.5rem'} fontSize={ui.taglineFontSize}>
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
        {'Search & browse with automatic captcha solving & geo-targeting to 190+ countries — '}
        <Box as='span' display='inline-block' position='relative' whiteSpace='nowrap'>
          {'pay only for successful requests'}
          <Box
            as='svg'
            position='absolute'
            left={-0.5}
            right={-0.5}
            bottom={-1}
            viewBox='0 0 300 8'
            preserveAspectRatio='none'
            fill='none'
          >
            <Box
              as='path'
              d='M2 4.5C75 3 150 5.5 225 3.5S280 4.5 298 4'
              strokeWidth='2.5'
              strokeLinecap='round'
              _light={{ stroke: ui.creativeBlue }}
              _dark={{ stroke: ui.cornflowerBlue }}
            />
          </Box>
        </Box>
      </Text>
      <Text variant='subheading' display={{ base: 'inline', lg: 'none' }} my={ui.xxsMargin}>
        Search & browse with automatic captcha solving & geotargeting to 190+ countries
      </Text>
      <Flex mt={ui.xlMargin} alignSelf={{ base: 'stretch', sm: 'center' }} gap={ui.xxsMargin}>
        <Button
          size={{ base: 'md', sm: 'lg' }}
          w={{ base: '100%', sm: 'auto' }}
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
          w={{ base: '100%', sm: 'auto' }}
          h={ui.ctaHeight}
          tabIndex={2}
          data-cal-link={ui.calPath}
        >
          {ui.secondaryCtaLabel}
        </Button>
      </Flex>
      <HStack
        display={{ base: 'flex', lg: 'none' }}
        mt={ui.xsMargin}
        spacing={{ base: ui.xxsMargin, md: ui.xsMargin }}
        fontSize={{ base: 'xs', md: 'sm' }}
        color='fg-muted'
      >
        {ui.supplementalBullets.map((bullet, index) => {
          const isLastBullet = index == ui.supplementalBullets.length - 1;

          return (
            <HStack
              key={bullet}
              display={isLastBullet ? 'flex' : { base: 'none', sm: 'flex' }}
              spacing={2}
            >
              <CheckIcon color='bg-button' />
              <Text fontSize='inherit'>{bullet}</Text>
            </HStack>
          );
        })}
      </HStack>
      <OrderedList id={ui.citationsId} variant='citations' mt={ui.mdMargin} pt={ui.mdMargin}>
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
