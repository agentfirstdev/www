import { useRef, useState, useEffect } from 'react';
import { Box, Text, Heading, Input, Button, Divider, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';

const waitlistId = 'waitlist';

export default function Waitlist({ supabaseClient, isOpen, close, handleKeyPress, onWaitlisted }) {
  const dropdown = useRef(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const toast = useToast();
  const joinWaitlist = async () => {
    if (emailAddress) {
      setIsLoading(true);

      const { error: signinError } = await supabaseClient.auth.signInWithOtp({
        email: emailAddress,
        options: {
          data: { source: ui.waitlistSource, service: ui.waitlistService },
          emailRedirectTo: ui.homeUrl
        }
      });

      if (signinError) {
        setIsLoading(false);

        if (!toast.isActive(waitlistId)) {
          toast({
            id: waitlistId,
            position: 'top',
            status: 'error',
            description: ui.errorMessage,
            duration: null,
            isClosable: true
          });
        }
      } else {
        const { error: waitlistError } = await supabaseClient.rpc('join_waitlist', {
          waitlist_email: emailAddress,
          waitlist_service: ui.waitlistService
        });

        setIsLoading(false);

        if (waitlistError) {
          if (!toast.isActive(waitlistId)) {
            toast({
              id: waitlistId,
              position: 'top',
              status: 'error',
              description: ui.errorMessage,
              duration: null,
              isClosable: true
            });
          }
        } else {
          localStorage.setItem(ui.waitlistKey, 'true');
          setIsJoining(true);
          onWaitlisted();
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const handleDismissalClick = (event) => {
        if (dropdown.current && !dropdown.current.contains(event.target)) {
          close();
        }
      };
      const handleEscapePress = (event) => {
        handleKeyPress(event, null, () => {
          close();
        });
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
        {ui.notificationLabel}
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
      <Box px={2}>
        <Input
          type='email'
          mt={ui.loginTextboxMargin}
          bg='chakra-body-bg'
          h={ui.controlDimension}
          fontSize='md'
          placeholder={ui.emailPlaceholder}
          value={emailAddress}
          onKeyDown={(event) => {
            handleKeyPress(event, joinWaitlist);
          }}
          onChange={(event) => {
            setEmailAddress(event.target.value);
          }}
        />
        <Button
          m={ui.loginButtonMargin}
          border={ui.buttonBorder}
          w='100%'
          h={ui.controlDimension}
          fontSize='md'
          isLoading={isLoading}
          onClick={joinWaitlist}
        >
          {ui.confirmationLabel}
        </Button>
        {isJoining && (
          <Text
            my={ui.loginMessageMargin}
            border='1px solid'
            rounded='md'
            borderColor='bg-success'
            bg='bg-success'
            p={ui.loginMessagePadding}
            textAlign='center'
            fontFamily='display'
            fontSize='md'
            color='fg-success'
          >
            {ui.confirmationMessage}
          </Text>
        )}
      </Box>
    </Box>
  ) : null;
}
