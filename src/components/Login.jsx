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
  toggleSidebar,
  handleKeyPress
}) {
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState([]);
  const { pathname } = useLocation();
  const isInLgView = useBreakpointValue({ base: false, lg: true });
  const isOnDashboard = pathname == ui.dashboardPath;
  const isOnProfile = pathname == ui.profilePath;
  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
  };

  return session ? (
    <Menu variant='dropdown'>
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
      <MenuList overflow='hidden'>
        {/* {isInLgView && pathname != '/' && (
          <MenuItem as='a' href='/'>
            {ui.homeLabel}
          </MenuItem>
        )} */}
        {!isOnDashboard && (
          <MenuItem as='a' href={ui.dashboardUrl}>
            {ui.dashboardLabel}
          </MenuItem>
        )}
        {!isOnProfile && (
          <MenuItem
            as='a'
            href={!isInLgView || !isOnDashboard ? ui.profileUrl : null}
            onClick={isInLgView && isOnDashboard ? toggleSidebar : null}
          >
            {ui.profileLabel}
          </MenuItem>
        )}
        {!isInLgView && (
          <>
            <MenuItem as='a' href={ui.servicesPath}>
              {ui.servicesLabel}
            </MenuItem>
            <MenuItem as='a' href={ui.pricingPath}>
              {ui.pricingLabel}
            </MenuItem>
            <MenuItem as='a' href={ui.docUrl}>
              {ui.docLabel}
            </MenuItem>
            {/* <MenuItem as='a' href={ui.demoUrl} target='_blank' rel='noopener'>
              {ui.demoLabel}
            </MenuItem> */}
            <MenuItem as='a' href={ui.aboutPath}>
              {ui.aboutLabel}
            </MenuItem>
            {/* <MenuItem as='a' href={ui.llmsTxtPath}>
              {ui.llmsTxtLabel}
            </MenuItem> */}
          </>
        )}
        <MenuItem as='a' href={ui.supportUrl}>
          {ui.supportLabel}
        </MenuItem>
        <MenuItem onClick={handleLogout}>{ui.logoutLabel}</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <>
      {!isOnDashboard && !isOnProfile && (
        <Button
          display={{ base: 'none', lg: 'inline-flex' }}
          ml={ui.itemMargin}
          fontSize='md'
          tabIndex={0}
          onClick={() => {
            setShouldShowLogin(true);
          }}
          onKeyDown={(event) => {
            handleKeyPress(event, () => {
              setShouldShowLogin(true);
            });
          }}
        >
          {ui.dashboardLabel}
        </Button>
      )}
      {shouldShowLogin && (
        <Box
          position='absolute'
          top='100%'
          right={0}
          zIndex='modal'
          mt={2}
          rounded='md'
          bg='chakra-overlay-bg'
          p={2}
          w={ui.loginWidth}
          shadow='md'
        >
          <Heading variant='login'>{ui.loginLabel}</Heading>
          <Button
            variant='monochrome'
            position='absolute'
            top={ui.closePosition}
            right={ui.closePosition}
            size='xs'
            p={0}
            fontSize='sm'
            aria-label='Close'
            onClick={() => {
              setShouldShowLogin(false);
            }}
          >
            <AddIcon transform={`rotate(-${ui.openRotation}deg)`} />
          </Button>
          <Divider mt={2} />
          <Auth
            supabaseClient={supabaseClient}
            providers={[]}
            view='magic_link'
            redirectTo={ui.dashboardUrl}
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
                  height: ui.controlDimension,
                  font: 'var(--chakra-fontSizes-md) var(--chakra-fonts-body)',
                  fontWeight: 'var(--chakra-fontWeights-bold)',
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
