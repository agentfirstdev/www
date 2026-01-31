import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Slide,
  Grid,
  GridItem,
  Heading,
  FormLabel,
  Input,
  Button,
  IconButton,
  Tooltip,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  EditIcon,
  ViewIcon,
  ViewOffIcon,
  CopyIcon,
  CheckIcon,
  AddIcon
} from '@chakra-ui/icons';

import * as ui from '../config/ui';

export default function Sidebar({ supabaseClient, session, isOpen, toggle }) {
  const tokenTimeout = useRef();
  const [account, setAccount] = useState(null);
  const [isTokenShown, setIsTokenShown] = useState(false);
  const { hasCopied, onCopy } = useClipboard(account?.api_token);
  const toast = useToast();
  const hasToken = !!account?.api_token;
  const isPlaintext = isTokenShown || !hasToken;

  useEffect(() => {
    return () => {
      clearTimeout(tokenTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (session) {
      supabaseClient
        .from('accounts')
        .select('email, api_token, partners (email)')
        .single()
        .then(({ data, error }) => {
          if (error) {
            const id = 'account';

            if (!toast.isActive(id)) {
              toast({
                id,
                position: 'top',
                status: 'error',
                description: ui.errorMessage,
                duration: ui.toastTimeoutMs
              });
            }

            console.error(error);
          } else {
            setAccount(data);
          }
        });
    }
  }, [session]);

  useEffect(() => {
    if (isTokenShown) {
      clearTimeout(tokenTimeout.current);

      tokenTimeout.current = setTimeout(() => {
        setIsTokenShown(false);
      }, ui.buttonResetMs);
    }
  }, [isTokenShown]);

  return (
    <Box display={{ base: 'none', lg: 'block' }} zIndex='overlay' pointerEvents='none'>
      <Slide
        direction='left'
        motionProps={{
          initial: false,
          variants: {
            enter: {
              translateX: 0,
              transition: { ease: ui.sidebarEasing, duration: ui.sidebarCollapseSecs }
            },
            exit: {
              translateX: ui.sidebarTravel,
              transition: { ease: ui.sidebarEasing, duration: ui.sidebarCollapseSecs }
            }
          }
        }}
        in={isOpen}
      >
        <Box
          pos='fixed'
          top='0'
          left='0'
          shadow='lg'
          px='4'
          py='8'
          w={ui.sidebarWidth}
          h='100vh'
          textAlign='right'
          pointerEvents='auto'
          _light={{ bg: isOpen ? 'gray.100' : '#edf2f7b3' }}
          _dark={{ bg: isOpen ? '#232934' : '#232934b3' }}
        >
          <Button
            variant='toggle'
            mr={isOpen ? '-8' : null}
            aspectRatio='1'
            fontSize='2xl'
            onClick={toggle}
          >
            <ChevronRightIcon
              transform={isOpen ? `rotate(${ui.expandRotation}deg)` : 'rotate(0)'}
              sx={{ transitionProperty: 'transform', transitionDuration: `${ui.iconRotationMs}ms` }}
            />
          </Button>
          <Heading mt='2' size='md' textAlign='left' fontFamily='body'>
            {ui.profileLabel}
          </Heading>
          <Grid
            mt={ui.xsMargin}
            templateColumns='auto 1fr'
            columnGap={ui.profileHorizontalMargin}
            rowGap={ui.profileVerticalMargin}
            justifyItems='start'
            alignItems='center'
          >
            <GridItem display='flex' justifySelf='right'>
              <FormLabel>{ui.emailLabel}</FormLabel>
            </GridItem>
            <GridItem display='flex' alignItems='center'>
              <Input
                type='email'
                variant='sidebar'
                w={ui.textboxWidth}
                value={account?.email ?? ui.loadingPlaceholder}
                aria-label={ui.emailLabel}
                isReadOnly
              />
              <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.updateLabel} hasArrow>
                <IconButton
                  ml='2'
                  icon={<EditIcon />}
                  aria-label={ui.updateLabel}
                  isDisabled={true}
                />
              </Tooltip>
            </GridItem>
            <GridItem display='flex' justifySelf='right'>
              <FormLabel>{ui.tokenLabel}</FormLabel>
            </GridItem>
            <GridItem display='flex' alignItems='center'>
              <Input
                type={isPlaintext ? 'text' : 'password'}
                variant='sidebar'
                w={ui.textboxWidth}
                letterSpacing={isPlaintext ? null : ui.ciphertextSpacing}
                value={account?.api_token ?? ui.loadingPlaceholder}
                aria-label={ui.tokenLabel}
                isReadOnly
              />
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={hasToken ? (isTokenShown ? ui.hideLabel : ui.showLabel) : null}
                hasArrow
              >
                <IconButton
                  ml='2'
                  icon={isTokenShown ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={isTokenShown ? ui.hideLabel : ui.showLabel}
                  isDisabled={!hasToken}
                  onClick={() => {
                    setIsTokenShown((state) => {
                      return !state;
                    });
                  }}
                />
              </Tooltip>
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={hasToken ? ui.copyLabel : null}
                hasArrow
              >
                <IconButton
                  ml='2'
                  icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                  aria-label={ui.copyLabel}
                  isDisabled={!hasToken}
                  onClick={() => {
                    const id = 'copy';

                    onCopy();

                    if (!toast.isActive(id)) {
                      toast({
                        id,
                        position: 'top',
                        status: 'success',
                        description: ui.copiedMessage,
                        duration: ui.toastTimeoutMs
                      });
                    }
                  }}
                />
              </Tooltip>
            </GridItem>
            <GridItem display='flex' justifySelf='right'>
              <FormLabel>{ui.creditsLabel}</FormLabel>
            </GridItem>
            <GridItem display='flex' alignItems='center'>
              <Input
                type='text'
                variant='sidebar'
                w={ui.textboxWidth}
                value='0'
                aria-label={ui.creditsLabel}
                isReadOnly
              />
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={ui.purchaseLabel}
                hasArrow
              >
                <IconButton
                  as='a'
                  ml='2'
                  icon={<AddIcon fontSize='sm' />}
                  aria-label={ui.purchaseLabel}
                  href='/#pricing'
                />
              </Tooltip>
            </GridItem>
          </Grid>
        </Box>
      </Slide>
    </Box>
  );
}
