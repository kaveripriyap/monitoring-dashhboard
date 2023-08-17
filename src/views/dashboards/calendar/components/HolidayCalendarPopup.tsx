import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import EventCalendar from '../../../../components/calendar/EventCalendar';

interface HolidayCalendarPopupProps {
  isOpen: boolean;
  onClose: () => void;
  calendarData: {
    name: string;
    date: string;
    country: string;
  }[];
}

const HolidayCalendarPopup: React.FC<HolidayCalendarPopupProps> = ({ isOpen, onClose, calendarData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upcoming Holidays</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EventCalendar calendarData={calendarData} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HolidayCalendarPopup;
