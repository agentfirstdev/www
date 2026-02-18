import { useRef, useState, useEffect } from 'react';
import {
  Flex,
  Grid,
  GridItem,
  // Heading,
  FormLabel,
  Input,
  IconButton,
  Spinner,
  Tooltip,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import { EditIcon, ViewIcon, ViewOffIcon, CopyIcon, CheckIcon, AddIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';
import Login from '../components/Login';

const copyId = crypto.randomUUID();
const accountId = crypto.randomUUID();

export default function Profile({ supabaseClient, session, isSessionLoading }) {
  const tokenTimeout = useRef();
  const [account, setAccount] = useState(null);
  const [creditBalance, setCreditBalance] = useState(null);
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
            if (!toast.isActive(accountId)) {
              toast({
                id: accountId,
                position: 'top',
                status: 'error',
                description: ui.errorMessage,
                duration: null,
                isClosable: true
              });
            }

            console.error(error);
          } else {
            setAccount(data);
          }
        });

      supabaseClient.rpc('credit_balance').then(({ data, error }) => {
        if (error || data == null) {
          console.error(error ?? 'Credit balance not returned');
        } else {
          setCreditBalance(data);
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

  return session && !isSessionLoading ? (
    <>
      {/* <Heading variant='secondary' size='lg'>
        {ui.profileLabel}
      </Heading> */}
      <Flex px={ui.smMargin} pt={9} pb={5} justify='center' align='center' flex={1}>
        <Grid
          templateColumns={{ base: '1fr', md: 'auto 1fr' }}
          columnGap={ui.profileHorizontalMargin}
          rowGap={ui.profileVerticalMargin}
          justifyItems='start'
          alignItems='center'
        >
          <GridItem display='flex' justifySelf={{ base: 'start', md: 'end' }}>
            <FormLabel fontSize='lg'>{ui.emailLabel}</FormLabel>
          </GridItem>
          <GridItem display='flex' w='100%' alignItems='center'>
            <Input
              type='email'
              flex={{ base: 1, md: 'none' }}
              size='lg'
              w={ui.textboxWidth}
              value={account?.email ?? ui.loadingPlaceholder}
              aria-label={ui.emailLabel}
              isReadOnly
            />
            <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.updateLabel} hasArrow>
              <IconButton
                ml={2}
                icon={<EditIcon />}
                aria-label={ui.updateLabel}
                isDisabled={true}
              />
            </Tooltip>
          </GridItem>
          <GridItem display='flex' justifySelf={{ base: 'start', md: 'end' }}>
            <FormLabel fontSize='lg'>{ui.tokenLabel}</FormLabel>
          </GridItem>
          <GridItem display='flex' w='100%' alignItems='center'>
            <Input
              type={isPlaintext ? 'text' : 'password'}
              flex={{ base: 1, md: 'none' }}
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
                ml={2}
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
              label={hasToken ? (hasCopied ? null : ui.copyLabel) : null}
              hasArrow
            >
              <IconButton
                ml={2}
                icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                aria-label={ui.copyLabel}
                isDisabled={!hasToken}
                onClick={() => {
                  onCopy();

                  if (!toast.isActive(copyId)) {
                    toast({
                      id: copyId,
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
          <GridItem display='flex' justifySelf={{ base: 'start', md: 'end' }}>
            <FormLabel fontSize='lg'>{ui.creditsLabel}</FormLabel>
          </GridItem>
          <GridItem display='flex' w='100%' alignItems='center'>
            <Input
              type='text'
              flex={{ base: 1, md: 'none' }}
              size='lg'
              w={ui.textboxWidth}
              value={creditBalance?.toLocaleString() ?? ui.loadingPlaceholder}
              aria-label={ui.creditsLabel}
              isReadOnly
            />
            <Tooltip mx={ui.tooltipMargin} p={ui.tooltipPadding} label={ui.checkoutLabel} hasArrow>
              <IconButton
                as='a'
                ml={2}
                icon={<AddIcon fontSize='sm' />}
                aria-label={ui.checkoutLabel}
                href={ui.pricingPath}
              />
            </Tooltip>
          </GridItem>
        </Grid>
      </Flex>
    </>
  ) : isSessionLoading ? (
    <Flex pt={7} pb={5} justify='center' align='center' flex={1}>
      <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
    </Flex>
  ) : (
    <>
      {/* <Heading variant='secondary' size='lg'>
        {ui.loginLabel}
      </Heading> */}
      <Flex pt={ui.smMargin} pb={1} justify='center' align='center' flex={1}>
        <Login
          supabaseClient={supabaseClient}
          width={ui.secondaryTextboxWidth}
          font='var(--chakra-fontSizes-lg) var(--chakra-fonts-display)'
          textboxBackground='var(--chakra-colors-bg-muted)'
          redirectUrl={ui.profileUrl}
        />
      </Flex>
    </>
  );
}
