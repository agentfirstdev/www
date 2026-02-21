import { useRef, useEffect } from 'react';
import { Box, Heading, Button, Divider } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import Waitlist from './Waitlist';
import * as ui from '../config/ui';

export default function WaitlistDropdown({
  supabaseClient,
  session,
  isOpen,
  join,
  close,
  handleKeyPress
}) {
  const dropdown = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const handleDismissalClick = (event) => {
        if (dropdown.current && !dropdown.current.contains(event.target)) close();
      };
      const handleEscapePress = (event) => {
        handleKeyPress(event, null, close);
      };

      document.addEventListener('mousedown', handleDismissalClick);
      document.addEventListener('keydown', handleEscapePress);

      return () => {
        document.removeEventListener('mousedown', handleDismissalClick);
        document.removeEventListener('keydown', handleEscapePress);
      };
    }
  }, [isOpen, close]);

  return isOpen ? (
    <Box
      ref={dropdown}
      position='absolute'
      top={0}
      left={ui.buttonWidth}
      zIndex='modal'
      mt={4}
      ml={4}
      rounded='md'
      bg='bg-panel'
      p={2}
      w={ui.loginWidth}
      shadow='sm'
    >
      <Heading variant='dropdown' textAlign='center'>
        {ui.firstLabel}
      </Heading>
      <Button
        variant='monochrome'
        position='absolute'
        top={ui.closePosition}
        right={ui.closePosition}
        size='xs'
        p={0}
        fontSize='sm'
        aria-label={ui.closeLabel}
        onClick={close}
      >
        <AddIcon transform={`rotate(-${ui.openRotation}deg)`} />
      </Button>
      <Divider mt={2} />
      <Waitlist
        supabaseClient={supabaseClient}
        session={session}
        fontSize='md'
        textboxMargin={ui.loginTextboxMargin}
        textboxBackground='chakra-body-bg'
        join={join}
      />
    </Box>
  ) : null;
}
