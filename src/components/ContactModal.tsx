'use client';

import { ReactNode, useState } from 'react';
import ContactForm from '@/src/components/ContactForm';
import MidnightButton from '@/src/components/MidnightButton';
import Modal from '@/src/components/Modal';

type ContactModalProps = {
  trigger?: ReactNode;
  triggerLabel?: string;
};

export default function ContactModal({
  trigger,
  triggerLabel = 'Open Contact Form',
}: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {trigger ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        >
          {trigger}
        </button>
      ) : (
        <MidnightButton type="button" onClick={() => setIsOpen(true)} className="max-w-[18rem]">
          {triggerLabel}
        </MidnightButton>
      )}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
