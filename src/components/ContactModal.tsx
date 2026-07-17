'use client';

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';

import ContactForm from '@/src/components/ContactForm';
import MidnightButton from '@/src/components/MidnightButton';
import Modal from '@/src/components/Modal';
import { localeFromPathname, type Locale } from '@/src/lib/i18n';

type ContactModalProps = {
  trigger?: ReactNode;
  triggerLabel?: string;
  showTrigger?: boolean;
  locale?: Locale;
};

const modalCopy = {
  en: {
    trigger: 'Open Contact Form',
    title: 'Start A Project',
    description: 'Tell us what you are building, what you need, or where things feel stuck.',
    close: 'Close modal',
  },
  sq: {
    trigger: 'Hap Formularin e Kontaktit',
    title: 'Nis Një Projekt',
    description: 'Na tregoni çfarë po ndërtoni, çfarë ju nevojitet ose ku mendoni se gjërat kanë ngecur.',
    close: 'Mbyll dritaren',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function ContactModal({
  trigger,
  triggerLabel,
  showTrigger = true,
  locale,
}: ContactModalProps) {
  const pathname = usePathname();
  const resolvedLocale = locale ?? localeFromPathname(pathname);
  const copy = modalCopy[resolvedLocale];
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
            {triggerLabel ?? copy.trigger}
          </MidnightButton>
        )
      ) : null}

      <Modal
        open={isOpen}
        onClose={closeModal}
        variant="pokopia"
        logoSrc="/logo/MDNT-ICON-WHITE.png"
        logoAlt="Midnight"
        title={copy.title}
        description={copy.description}
        closeLabel={copy.close}
      >
        <ContactForm tone="light" locale={resolvedLocale} />
      </Modal>
    </>
  );
}
