'use client';

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import ContactForm from '@/src/components/ContactForm';
import MidnightButton from '@/src/components/MidnightButton';
import Modal from '@/src/components/Modal';

type ContactModalProps = {
  trigger?: ReactNode;
  triggerLabel?: string;
  showTrigger?: boolean;
};

export default function ContactModal({
  trigger,
  triggerLabel = 'Open Contact Form',
  showTrigger = true,
}: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleTerminalContact() {
      openModal();
    }

    window.addEventListener(
      'midnight:open-contact',
      handleTerminalContact,
    );

    return () => {
      window.removeEventListener(
        'midnight:open-contact',
        handleTerminalContact,
      );
    };
  }, [openModal]);

  return (
    <>
      {showTrigger ? (
        trigger ? (
          <button
            type="button"
            onClick={openModal}
            className="cursor-pointer"
          >
            {trigger}
          </button>
        ) : (
          <MidnightButton
            type="button"
            onClick={openModal}
            className="max-w-[18rem]"
          >
            {triggerLabel}
          </MidnightButton>
        )
      ) : null}

      <Modal
        open={isOpen}
        onClose={closeModal}
        variant="pokopia"
        logoSrc="/logo/MDNT-ICON-WHITE.png"
        logoAlt="Midnight"
        title="Start A Project"
        description="Tell us what you are building, what you need, or where things feel stuck."
      >
        <ContactForm tone="light" />
      </Modal>
    </>
  );
}