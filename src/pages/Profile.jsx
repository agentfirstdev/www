import { useRef, useState, useEffect } from 'react';
import {
  Flex,
  Grid,
  GridItem,
  FormLabel,
  Input,
  IconButton,
  Tooltip,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import { EditIcon, ViewIcon, ViewOffIcon, CopyIcon, CheckIcon, AddIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';

export default function Profile({ supabaseClient, session }) {
  const tokenTimeout = useRef();
  const [account, setAccount] = useState(null);
  const [isTokenShown, setIsTokenShown] = useState(false);
  const { hasCopied, onCopy } = useClipboard(account?.api_token);
  const toast = useToast();
  const hasToken = !!account?.api_token;
  const isPlaintext = isTokenShown || !hasToken;

  useEffect(() => {
    if (session) {
      supabaseClient
        .from('accounts')
        .select('email, api_token, partners (email)')
        .single()
        .then(({ data, error }) => {
          if (error) {
            toast({
              position: 'top',
              status: 'error',
              description: ui.errorMessage,
              duration: ui.toastTimeoutMs
            });
            console.error(error);
          } else {
            setAccount(data);
          }
        });
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(tokenTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (isTokenShown) {
      clearTimeout(tokenTimeout.current);

      tokenTimeout.current = setTimeout(() => {
        setIsTokenShown(false);
      }, ui.buttonResetMs);
    }
  }, [isTokenShown]);

  return (
    <Flex mt={ui.xlMargin} minH={ui.profileHeight} justify='center' align='start'>
      <Grid
        templateColumns='auto 1fr'
        columnGap={ui.profileHorizontalMargin}
        rowGap={ui.profileVerticalMargin}
        justifyItems='start'
        alignItems='center'
      >
        <GridItem display='flex' justifySelf='right'>
          <FormLabel mr='0' mb='0' fontSize='lg' fontWeight='bold'>
            {ui.emailLabel}
          </FormLabel>
        </GridItem>
        <GridItem display='flex' alignItems='center'>
          <Input
            type='email'
            size='lg'
            w={ui.textboxWidth}
            value={account?.email ?? ui.loadingPlaceholder}
            aria-label={ui.emailLabel}
            isReadOnly
          />
          <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.updateLabel} hasArrow>
            <IconButton ml='2' icon={<EditIcon />} aria-label={ui.updateLabel} isDisabled={true} />
          </Tooltip>
        </GridItem>
        <GridItem display='flex' justifySelf='right'>
          <FormLabel mr='0' mb='0' fontSize='lg' fontWeight='bold'>
            {ui.tokenLabel}
          </FormLabel>
        </GridItem>
        <GridItem display='flex' alignItems='center'>
          <Input
            type={isPlaintext ? 'text' : 'password'}
            size='lg'
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
                onCopy();
                toast({
                  position: 'top',
                  status: 'success',
                  description: ui.copiedMessage,
                  duration: ui.toastTimeoutMs
                });
              }}
            />
          </Tooltip>
        </GridItem>
        <GridItem display='flex' justifySelf='right'>
          <FormLabel mr='0' mb='0' fontSize='lg' fontWeight='bold'>
            {ui.creditsLabel}
          </FormLabel>
        </GridItem>
        <GridItem display='flex' alignItems='center'>
          <Input
            type='text'
            size='lg'
            w={ui.textboxWidth}
            value='0'
            aria-label={ui.creditsLabel}
            isReadOnly
          />
          <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.purchaseLabel} hasArrow>
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
    </Flex>
  );
}
