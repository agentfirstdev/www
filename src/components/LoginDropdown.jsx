import { useRef, useState, useEffect } from 'react';
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

import Login from './Login';
import * as ui from '../config/ui';

export default function LoginDropdown({
  supabaseClient,
  session,
  setSession,
  isSessionLoading,
  shouldShowLogin,
  setShouldShowLogin,
  toggleSidebar,
  handleKeyPress
}) {
  const dropdown = useRef(null);
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

  useEffect(() => {
    if (shouldShowLogin) {
      const handleDismissalClick = (event) => {
        if (dropdown.current && !dropdown.current.contains(event.target)) {
          setShouldShowLogin(false);
        }
      };
      const handleEscapePress = (event) => {
        handleKeyPress(event, null, () => {
          setShouldShowLogin(false);
        });
      };

      document.addEventListener('mousedown', handleDismissalClick);
      document.addEventListener('keydown', handleEscapePress);

      return () => {
        document.removeEventListener('mousedown', handleDismissalClick);
        document.removeEventListener('keydown', handleEscapePress);
      };
    }
  }, [shouldShowLogin, setShouldShowLogin]);

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
      {!isOnDashboard && !isOnProfile && pathname != ui.checkoutPath && (
        <Button
          display={{ base: 'none', lg: 'inline-flex' }}
          ml={ui.itemMargin}
          fontSize='md'
          tabIndex={0}
          isLoading={isSessionLoading}
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
          ref={dropdown}
          position='absolute'
          top='100%'
          right={0}
          zIndex='modal'
          mt={2}
          rounded='md'
          bg='bg-panel'
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
            aria-label={ui.closeLabel}
            onClick={() => {
              setShouldShowLogin(false);
            }}
          >
            <AddIcon transform={`rotate(-${ui.openRotation}deg)`} />
          </Button>
          <Divider mt={2} />
          <Login
            supabaseClient={supabaseClient}
            margin={ui.loginMargin}
            font='var(--chakra-fontSizes-md) var(--chakra-fonts-body)'
            textboxMargin={ui.loginTextboxMargin}
            textboxBackground='var(--chakra-colors-chakra-body-bg)'
            redirectUrl={ui.dashboardUrl}
          />
        </Box>
      )}
    </>
  );
}
