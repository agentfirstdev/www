import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';
import Waitlist from './Waitlist';

export default function WaitlistModal({ supabaseClient, session, isOpen, join, close }) {
  return (
    <Modal isOpen={isOpen} isCentered returnFocusOnClose={false} onClose={close}>
      <ModalOverlay />
      <ModalContent mx={4} p={2} bg='bg-panel'>
        <ModalHeader
          p={0}
          textAlign='center'
          fontFamily='subheading'
          fontSize='2xl'
          color='bg-button'
        >
          {ui.firstLabel}
        </ModalHeader>
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
        <ModalBody p={0}>
          <Waitlist
            supabaseClient={supabaseClient}
            session={session}
            fontSize='lg'
            textboxMargin={ui.loginTextboxMargin}
            textboxBackground='chakra-body-bg'
            join={join}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
