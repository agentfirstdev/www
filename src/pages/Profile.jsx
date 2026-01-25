import { useRef, useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  FormLabel,
  Input,
  IconButton,
  Tooltip,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, CopyIcon, CheckIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';

export default function Profile({
  supabaseClient,
  session,
  setSession,
  shouldShowLogin,
  setShouldShowLogin,
  handleKeyPress,
  handleMenuOpen
}) {
  const tokenTimeout = useRef();
  const [account, setAccount] = useState(null);
  const [isTokenShown, setIsTokenShown] = useState(false);
  const { hasCopied, onCopy } = useClipboard(account?.api_token);
  const toast = useToast();
  const hasToken = !!account?.api_token;

  useEffect(() => {
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
        tokenTimeout.current = null;

        setIsTokenShown(false);
      }, ui.buttonResetMs);
    }
  }, [isTokenShown]);

  return (
    <Grid
      templateColumns='20ch 1fr'
      columnGap='2'
      rowGap='4'
      justifyItems='start'
      alignItems='center'
    >
      <GridItem display='flex' justifySelf='center' alignItems='center'>
        <FormLabel mr='0' mb='0' fontSize='lg' fontWeight='bold'>
          {ui.emailLabel}
        </FormLabel>
      </GridItem>
      <GridItem display='flex' alignItems='center'>
        <Input
          type='email'
          size='lg'
          w='35ch'
          value={account?.email ?? ui.loadingPlaceholder}
          aria-label={ui.emailLabel}
          isReadOnly
        />
      </GridItem>
      <GridItem display='flex' justifySelf='center' alignItems='center'>
        <FormLabel mr='0' mb='0' fontSize='lg' fontWeight='bold'>
          {ui.tokenLabel}
        </FormLabel>
      </GridItem>
      <GridItem display='flex' alignItems='center'>
        <Input
          type={isTokenShown || !hasToken ? 'text' : 'password'}
          size='lg'
          w='35ch'
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
    </Grid>
  );
}
