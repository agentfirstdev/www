import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Button
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import * as ui from '../config/ui';
import Login from './Login';

export default function LoginModal({ supabaseClient, redirectUrl, isOpen, open, close }) {
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
          {ui.loginLabel}
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
          <Login
            supabaseClient={supabaseClient}
            margin={ui.loginMargin}
            font='var(--chakra-fontSizes-lg) var(--chakra-fonts-body)'
            textboxMargin={ui.loginTextboxMargin}
            textboxBackground='var(--chakra-colors-chakra-body-bg)'
            redirectUrl={redirectUrl}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
