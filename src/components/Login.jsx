import { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
  Box,
  Heading,
  Button,
  Divider
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';

export default function Login({
  supabaseClient,
  session,
  setSession,
  shouldShowLogin,
  setShouldShowLogin,
  handleKeyPress
}) {
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState([]);
  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
  };

  return session ? (
    <Menu>
      <MenuButton
        ml={ui.itemMargin}
        border='none'
        borderRadius='50%'
        sx={{ '&:hover .chakra-avatar': { backgroundColor: 'brand.secondary' } }}
        _focus={{ outline: 'none', shadow: ui.shadowStyle }}
      >
        <Avatar
          size='md'
          bg='accent.secondary'
          color='white'
          name={session.user.email}
          transition={ui.transition}
        >
          {!!notifications.length && (
            <AvatarBadge
              boxSize={ui.badgeSize}
              borderColor='brand.secondary'
              bg='accent.primary'
              fontSize='xs'
            >
              {notifications.length}
            </AvatarBadge>
          )}
        </Avatar>
      </MenuButton>
      <MenuList p='0' fontSize='sm'>
        <MenuItem borderRadius={ui.menuTopBorder} textDecoration='line-through'>
          Settings
        </MenuItem>
        <MenuItem borderRadius='0' textDecoration='line-through'>
          Help
        </MenuItem>
        <MenuItem borderRadius={ui.menuBottomBorder} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <>
      <Button
        display={{ base: 'none', lg: 'inline-flex' }}
        ml={ui.itemMargin}
        fontSize='md'
        tabIndex='0'
        onClick={() => {
          setShouldShowLogin(true);
        }}
        onKeyDown={(event) => {
          handleKeyPress(event, () => {
            setShouldShowLogin(true);
          });
        }}
      >
        Dashboard
      </Button>
      {shouldShowLogin && (
        <Box
          position='absolute'
          top='100%'
          right='0'
          zIndex='modal'
          mt='2'
          rounded='md'
          bg='chakra-overlay-bg'
          p='2'
          w={ui.loginWidth}
          shadow='md'
        >
          <Heading variant='login'>Log in or sign up</Heading>
          <Button
            variant='monochrome'
            position='absolute'
            top={ui.closePosition}
            right={ui.closePosition}
            size='xs'
            p='0'
            fontSize='sm'
            aria-label='Close'
            onClick={() => {
              setShouldShowLogin(false);
            }}
          >
            <AddIcon transform={`rotate(-${ui.openRotation}deg)`} />
          </Button>
          <Divider mt='2' />
          <Auth
            supabaseClient={supabaseClient}
            providers={[]}
            view='magic_link'
            localization={{
              variables: { magic_link: { email_input_label: '', button_label: ui.loginLabel } }
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
                container: { margin: ui.loginMargin, gap: 0 },
                label: { marginBottom: 0 },
                input: {
                  marginTop: ui.loginInputMargin,
                  opacity: ui.loginInputOpacity,
                  borderColor: 'var(--chakra-colors-chakra-border-color)',
                  background: 'var(--chakra-colors-chakra-body-bg)',
                  height: ui.controlDimension,
                  font: 'var(--chakra-fontSizes-md) var(--chakra-fonts-body)',
                  color: 'var(--chakra-colors-chakra-body-text)'
                },
                button: {
                  margin: ui.loginButtonMargin,
                  border: ui.buttonBorder,
                  width: ui.loginButtonWidth,
                  height: ui.controlDimension,
                  font:
                    'var(--chakra-fontWeights-semibold) ' +
                    'var(--chakra-fontSizes-md) ' +
                    'var(--chakra-fonts-body)',
                  transition: ui.transition
                }
              }
            }}
            showLinks={false}
          />
        </Box>
      )}
    </>
  );
}
