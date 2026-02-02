import { useRef, useState, useEffect } from 'react';
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  FormLabel,
  Input,
  IconButton,
  Spinner,
  Tooltip,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import { EditIcon, ViewIcon, ViewOffIcon, CopyIcon, CheckIcon, AddIcon } from '@chakra-ui/icons';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';

export default function Profile({ supabaseClient, session, isSessionLoading }) {
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

  return isSessionLoading ? (
    <Flex justify='center' align='center' flex={1}>
      <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
    </Flex>
  ) : (
    <>
      <Heading variant='secondary' size='lg'>
        {session ? ui.profileLabel : ui.loginLabel}
      </Heading>
      <Flex justify='center' align='start' flex={1}>
        {session ? (
          <Grid
            templateColumns='auto 1fr'
            columnGap={ui.profileHorizontalMargin}
            rowGap={ui.profileVerticalMargin}
            justifyItems='start'
            alignItems='center'
          >
            <GridItem display='flex' justifySelf='right'>
              <FormLabel fontSize='lg'>{ui.emailLabel}</FormLabel>
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
                <IconButton
                  ml={2}
                  icon={<EditIcon />}
                  aria-label={ui.updateLabel}
                  isDisabled={true}
                />
              </Tooltip>
            </GridItem>
            <GridItem display='flex' justifySelf='right'>
              <FormLabel fontSize='lg'>{ui.tokenLabel}</FormLabel>
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
              <FormLabel fontSize='lg'>{ui.creditsLabel}</FormLabel>
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
              <Tooltip
                mx={ui.tooltipMargin}
                p={ui.tooltipPadding}
                label={ui.purchaseLabel}
                hasArrow
              >
                <IconButton
                  as='a'
                  ml={2}
                  icon={<AddIcon fontSize='sm' />}
                  aria-label={ui.purchaseLabel}
                  href='/#pricing'
                />
              </Tooltip>
            </GridItem>
          </Grid>
        ) : (
          <Auth
            supabaseClient={supabaseClient}
            providers={[]}
            view='magic_link'
            redirectTo={ui.profileUrl}
            localization={{
              variables: { magic_link: { email_input_label: '', button_label: ui.magicLabel } }
            }}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'var(--chakra-colors-accent-secondary)',
                    brandAccent: 'var(--chakra-colors-chakra-inverse-bg)',
                    inputPlaceholder: 'var(--chakra-colors-chakra-label-color)'
                  }
                }
              },
              style: {
                container: { gap: 0, width: ui.secondaryWidth },
                label: { marginBottom: 0 },
                input: {
                  borderRadius: 'var(--chakra-radii-md)',
                  borderColor: 'var(--chakra-colors-chakra-border-color)',
                  background: 'var(--chakra-colors-chakra-inset-bg)',
                  height: ui.controlDimension,
                  font: 'var(--chakra-fontSizes-lg) var(--chakra-fonts-body)',
                  color: 'var(--chakra-colors-chakra-body-text)'
                },
                button: {
                  margin: ui.loginButtonMargin,
                  border: ui.buttonBorder,
                  height: ui.controlDimension,
                  font: 'var(--chakra-fontSizes-lg) var(--chakra-fonts-body)',
                  fontWeight: 'var(--chakra-fontWeights-bold)',
                  transition: ui.transition
                }
              }
            }}
            showLinks={false}
          />
        )}
      </Flex>
    </>
  );
}
