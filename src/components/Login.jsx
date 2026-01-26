import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  Divider,
  useBreakpointValue
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
  const location = useLocation();
  const isInLgView = useBreakpointValue({ base: false, lg: true });
  const isOnHomepage = location.pathname == '/';
  const isOnDashboard = location.pathname == ui.dashboardPath;
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
        {isInLgView && !isOnHomepage && (
          <MenuItem as='a' borderRadius={ui.menuTopBorder} href='/'>
            Home
          </MenuItem>
        )}
        {!isOnDashboard && (
          <MenuItem
            as='a'
            borderRadius={isOnHomepage ? ui.menuTopBorder : '0'}
            href={ui.dashboardUrl}
          >
            Dashboard
          </MenuItem>
        )}
        {location.pathname != ui.profilePath && (
          <MenuItem
            as='a'
            borderRadius={!isInLgView && isOnDashboard ? ui.menuTopBorder : '0'}
            href={ui.profileUrl}
          >
            Settings
          </MenuItem>
        )}
        <MenuItem
          as='a'
          display={{ base: 'flex', lg: 'none' }}
          borderRadius='0'
          href={ui.servicesPath}
        >
          Services
        </MenuItem>
        <MenuItem
          as='a'
          display={{ base: 'flex', lg: 'none' }}
          borderRadius='0'
          href={ui.pricingPath}
        >
          Pricing
        </MenuItem>
        <MenuItem as='a' display={{ base: 'flex', lg: 'none' }} borderRadius='0' href={ui.docUrl}>
          Documentation
        </MenuItem>
        {/* <MenuItem
          as='a'
          display={{ base: 'flex', lg: 'none' }}
          borderRadius='0'
          href={ui.demoUrl}
          target='_blank'
          rel='noopener'
        >
          Live demo
        </MenuItem> */}
        <MenuItem
          as='a'
          display={{ base: 'flex', lg: 'none' }}
          borderRadius='0'
          href={ui.aboutPath}
        >
          About us
        </MenuItem>
        {/* <MenuItem
          as='a'
          display={{ base: 'flex', lg: 'none' }}
          borderRadius='0'
          href={ui.llmsTxtUrl}
        >
          llms.txt
        </MenuItem> */}
        <MenuItem as='a' borderRadius='0' href={ui.supportUrl}>
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
            redirectTo={ui.dashboardUrl}
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
                  marginTop: ui.loginTextboxMargin,
                  opacity: ui.loginTextboxOpacity,
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
