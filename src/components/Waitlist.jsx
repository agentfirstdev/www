import { useState, useEffect } from 'react';
import { Box, Text, Input, Button, useToast } from '@chakra-ui/react';

import * as ui from '../config/ui';

const toastId = crypto.randomUUID();

export default function Waitlist({
  service,
  supabaseClient,
  session,
  fontSize,
  textboxMargin,
  textboxBackground,
  join
}) {
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const toast = useToast();
  const isUsingSessionEmail = emailAddress == session?.user?.email;
  const handleSuccess = () => {
    localStorage.setItem(
      ui.waitlistKey,
      JSON.stringify([...(JSON.parse(localStorage.getItem(ui.waitlistKey)) ?? []), service])
    );
    setIsJoining(true);
    join();
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
          waitlist_service: service
        });

        if (waitlistError) {
          setIsLoading(false);
          handleFailure();
        } else {
          const { error: confirmationError } = await supabaseClient.rpc('confirm_email', {
            waitlist_service: service
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
          options: { emailRedirectTo: ui.homeUrl }
        });

        if (signinError) {
          setIsLoading(false);
          handleFailure();
        } else {
          localStorage.setItem(ui.pendingWaitlistKey, service);

          const { error: waitlistError } = await supabaseClient.rpc('join_waitlist', {
            waitlist_email: emailAddress,
            waitlist_service: service
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

  return (
    <Box
      as='form'
      px={2}
      onSubmit={(event) => {
        event.preventDefault();
        joinWaitlist();
      }}
    >
      <Input
        type='email'
        mt={textboxMargin}
        bg={textboxBackground}
        h={ui.controlDimension}
        fontSize={fontSize}
        placeholder={ui.emailPlaceholder}
        value={emailAddress}
        autoFocus={true}
        required
        onChange={(event) => {
          setEmailAddress(event.target.value);
        }}
      />
      <Button
        type='submit'
        m={ui.loginButtonMargin}
        border={ui.buttonBorder}
        w='100%'
        h={ui.controlDimension}
        fontSize={fontSize}
        isLoading={isLoading}
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
          fontSize={fontSize}
          color='fg-success'
        >
          {isUsingSessionEmail ? ui.waitlistMessages[service] : ui.confirmationMessage}
        </Text>
      )}
    </Box>
  );
}
