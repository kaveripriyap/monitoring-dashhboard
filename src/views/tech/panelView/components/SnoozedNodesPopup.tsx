import React, { useContext } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MdSnooze } from 'react-icons/md';
import { useGlobalSnooze } from './GlobalSnoozeContext';

type ServerNode = {
  name: string;
  type: 'MC' | 'AppD';
  aaCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
};

type SnoozedNodesPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSnoozeEnd: (snoozedNode: ServerNode) => void;
};

const SnoozedNodesPopup: React.FC<SnoozedNodesPopupProps> = ({
  isOpen,
  onClose,
  onSnoozeEnd,
}) => {
  const { globalSnoozedItems, removeGlobalSnooze } = useGlobalSnooze();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="90%" maxWidth="1000px" margin="auto">
            <ModalHeader>Snoozed Nodes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>  
            <Table variant="simple">
                <Thead>
                <Tr>
                    <Th>Type</Th>
                    <Th>Name</Th>
                    <Th>Error</Th>
                    <Th>Status</Th>
                    <Th>Link</Th>
                    <Th>End Snooze</Th>
                </Tr>
                </Thead>
                <Tbody>
                {globalSnoozedItems.map((snoozedNode, index) => (
                    <Tr key={index}>
                    <Td>{snoozedNode.type}</Td>
                    <Td>{snoozedNode.name}</Td>
                    <Td>{snoozedNode.error}</Td>
                    <Td>{snoozedNode.status}</Td>
                    <Td>
                        <a href={snoozedNode.link} target="_blank" rel="noopener noreferrer">
                        Link
                        </a>
                    </Td>
                    <Td>
                        <Button
                        size="sm" mr="2" colorScheme={'navy'}
                        leftIcon={<MdSnooze />}
                        onClick={() => {
                          removeGlobalSnooze(snoozedNode)
                        }}
                        >
                        End Snooze
                        </Button>
                    </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            </ModalBody>
            <ModalFooter>
            <Button size="sm" mr="2" colorScheme={'navy'} onClick={onClose}>
                Close
            </Button>
            {/* {globalSnoozedItems} */}
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};

export default SnoozedNodesPopup;
