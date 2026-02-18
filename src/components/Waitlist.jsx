import { useRef, useState, useEffect } from 'react';
import { Box, Text, Heading, Input, Button, Divider, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';

const toastId = crypto.randomUUID();

export default function Waitlist({
  supabaseClient,
  session,
  isOpen,
  close,
  handleKeyPress,
  onWaitlisted
}) {
  const dropdown = useRef(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const toast = useToast();
  const isUsingSessionEmail = emailAddress == session?.user?.email;
  const handleSuccess = () => {
    localStorage.setItem(
      ui.waitlistKey,
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem(ui.waitlistKey)) ?? []),
        ui.waitlistService
      ])
    );
    setIsJoining(true);
    onWaitlisted();
  };
  const handleFailure = () => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        position: 'top',
        status: 'error',
        description: ui.errorMessage,
        duration: null,
        isClosable: true
      });
    }
  };
  const joinWaitlist = async () => {
    if (emailAddress) {
      if (isUsingSessionEmail) {
        setIsLoading(true);

        const { error: waitlistError } = await supabaseClient.rpc('join_waitlist', {
          waitlist_email: emailAddress,
          waitlist_service: ui.waitlistService
        });

        if (waitlistError) {
          setIsLoading(false);
          handleFailure();
        } else {
          const { error: confirmationError } = await supabaseClient.rpc('confirm_email', {
            waitlist_service: ui.waitlistService
          });

          setIsLoading(false);

          if (confirmationError) {
            handleFailure();
          } else {
            handleSuccess();
          }
        }
      } else {
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
          handleFailure();
        } else {
          const { error: waitlistError } = await supabaseClient.rpc('join_waitlist', {
            waitlist_email: emailAddress,
            waitlist_service: ui.waitlistService
          });

          setIsLoading(false);

          if (waitlistError) {
            handleFailure();
          } else {
            handleSuccess();
          }
        }
      }
    }
  };

  useEffect(() => {
    if (session?.user?.email && !emailAddress) setEmailAddress(session.user.email);
  }, [session]);

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
          {isUsingSessionEmail ? ui.notificationLabel : ui.confirmationLabel}
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
            {isUsingSessionEmail ? ui.cdpMessage : ui.confirmationMessage}
          </Text>
        )}
      </Box>
    </Box>
  ) : null;
}
