import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { MdCheckCircle, MdOutlineWarningAmber, MdOutlineErrorOutline, MdSnooze } from 'react-icons/md';
import { useGlobalSnooze } from './GlobalSnoozeContext';

type ServerNode = {
  name: string;
  type: 'MC' | 'AppD';
  asCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
  snoozeTime?: number;
  comment?: string;
};

type PopupCardProps = {
  isOpen: boolean;
  onClose: () => void;
  serversNodes: ServerNode[];
  selectedFilterType: 'MC' | 'AppD' | 'GUI' | 'All';
  onGlobalSnooze: (serverNode: ServerNode, snoozeHours: number, snoozeDays: number) => void;
};

const PopupCard: React.FC<PopupCardProps> = ({ isOpen, onClose, serversNodes, selectedFilterType, onGlobalSnooze }) => {
  const [sorting, setSorting] = useState<{ id: keyof ServerNode; desc: boolean }[]>([]);
  const [filterType, setFilterType] = useState<'MC' | 'AppD' | 'GUI' | 'All'>(selectedFilterType);
  const [isSnoozeModalOpen, setIsSnoozeModalOpen] = useState(false);
  const [snoozeHours, setSnoozeHours] = useState(0);
  const [snoozeDays, setSnoozeDays] = useState(0);
  const [snoozeComment, setSnoozeComment] = useState('');
  const [selectedServerNode, setSelectedServerNode] = useState<ServerNode | null>(null);
  const { globalSnoozedItems, addGlobalSnooze, globalSnoozedItemsUpdated, updateGlobalSnoozedItems } = useGlobalSnooze();

  useEffect(() => {
    setFilterType(selectedFilterType); // Update filterType when selectedFilterType changes
  }, [selectedFilterType]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const updatedSnoozedItems = globalSnoozedItems.filter(item => !item.snoozeTime || item.snoozeTime > currentTime);
      updateGlobalSnoozedItems(updatedSnoozedItems);
    }, 1000); // Check every second
    return () => clearInterval(interval);
  }, [globalSnoozedItemsUpdated, globalSnoozedItems, updateGlobalSnoozedItems]);
  

  const handleSortingChange = (column: keyof ServerNode) => {
    setSorting([{ id: column, desc: !sorting[0]?.desc }]);
  };

  const mergedNodes = serversNodes.map(node => ({
    ...node,
    snoozed: globalSnoozedItems.some(item => item.name === node.name) // Or use a unique identifier
  }));

  const getSortedData = () => {
    if (sorting.length === 0) {
      return serversNodes.sort((a, b) => {
        if (a.status === 'Error' && b.status !== 'Error') {
          return -1; // 'Error' comes first
        } else if (a.status !== 'Error' && b.status === 'Error') {
          return 1;
        } else if (a.status === 'Warning' && b.status === 'Error') {
          return -1; // 'Warning' comes after 'Error'
        } else if (a.status === 'Error' && b.status === 'Warning') {
          return 1;
        } else if (a.status === 'Warning' && b.status !== 'Error' && b.status !== 'Warning') {
          return -1; // 'Warning' comes before other statuses
        } else if (a.status !== 'Error' && a.status !== 'Warning' && b.status === 'Warning') {
          return 1;
        }
        return 0;
      });
    }

    const sortedData = [...serversNodes].sort((a, b) => {
      const columnId = sorting[0].id;
      const aValue = a[columnId];
      const bValue = b[columnId];

      if (columnId === 'snoozeTime' && typeof aValue === 'number' && typeof bValue === 'number') {
        return sorting[0].desc ? bValue - aValue : aValue - bValue;
      }

      return sorting[0].desc ? bValue.toString().localeCompare(aValue.toString()) : aValue.toString().localeCompare(bValue.toString());
    });

    return sortedData;
  };

  const getArrow = (column: keyof ServerNode) => {
    if (sorting.length === 0 || sorting[0].id !== column) return null;
    return sorting[0].desc ? '↓' : '↑';
  };

  const getStatusColor = (status: ServerNode['status']) => {
    switch (status) {
      case 'Error':
        return 'red.500';
      case 'Warning':
        return 'orange.500';
      case 'Working':
        return 'green.500';
      default:
        return 'gray.500';
    }
  };

  const filterByType = (data: ServerNode) => {
    if (data.snoozeTime && data.snoozeTime > Date.now()) {
      return false;
    }
    
    if (filterType === 'All') {
      return data.status === 'Error' || data.status === 'Warning'; // Add condition to filter 'Error' or 'Warning' nodes
    }
    
    return data.type === filterType && (data.status === 'Error' || data.status === 'Warning'); // Filter by type and status
  };

  const handleSnooze = (serverNode: ServerNode, snoozeHours: number, snoozeDays: number, comment: string) => {
    if (comment.length < 30) {
      alert('Please provide a comment of at least 30 characters.');
      return;
    }

    const snoozeTime = Date.now() + (snoozeHours * 60 * 60 * 1000) + (snoozeDays * 24 * 60 * 60 * 1000);
    serverNode.snoozeTime = snoozeTime;
    serverNode.comment = comment;

    addGlobalSnooze(serverNode);

    setIsSnoozeModalOpen(false);
    setSnoozeHours(0);
    setSnoozeDays(0);
    setSnoozeComment('');

    // // Remove the snoozed item from the popup card's snoozed list
    // const updatedSnoozedItems = globalSnoozedItems.filter(item => item !== serverNode);
    // updateGlobalSnoozedItems(updatedSnoozedItems);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent width="90%" maxWidth="1000px" margin="auto">
        <ModalHeader>Server/Node Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="flex-start" mb="4">
            <Button colorScheme={filterType === 'All' ? 'navy' : 'gray'} size="sm" mr="3" onClick={() => setFilterType('All')}>
              All
            </Button>
            <Button colorScheme={filterType === 'MC' ? 'navy' : 'gray'} size="sm" mr="3" onClick={() => setFilterType('MC')}>
              MC
            </Button>
            <Button colorScheme={filterType === 'AppD' ? 'navy' : 'gray'} size="sm" mr="3" onClick={() => setFilterType('AppD')}>
              AppD
            </Button>
            <Button colorScheme={filterType === 'GUI' ? 'navy' : 'gray'} size="sm" onClick={() => setFilterType('GUI')}>
              GUI
            </Button>
          </Flex>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th colSpan={1} onClick={() => handleSortingChange('type')}>
                    <Flex justifyContent="space-between" align="center">
                      Type {getArrow('type')}
                    </Flex>
                  </Th>
                  <Th colSpan={1} onClick={() => handleSortingChange('name')}>
                    <Flex justifyContent="space-between" align="center">
                      Name {getArrow('name')}
                    </Flex>
                  </Th>
                  <Th colSpan={1} onClick={() => handleSortingChange('error')}>
                    <Flex justifyContent="space-between" align="center">
                      Error {getArrow('error')}
                    </Flex>
                  </Th>
                  <Th colSpan={1} onClick={() => handleSortingChange('status')}>
                    <Flex justifyContent="space-between" align="center">
                      Status {getArrow('status')}
                    </Flex>
                  </Th>
                  <Th colSpan={1}>Link</Th>
                  <Th colSpan={1}>Snooze</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getSortedData()
                  .filter(filterByType)
                  .map((serverNode, index) => (
                    <Tr key={index}>
                      <Td>{serverNode.type}</Td>
                      <Td>{serverNode.name}</Td>
                      <Td>{serverNode.error}</Td>
                      <Td>
                        <Icon
                          as={
                            serverNode.status === 'Error'
                              ? MdOutlineErrorOutline
                              : serverNode.status === 'Warning'
                              ? MdOutlineWarningAmber
                              : MdCheckCircle
                          }
                          color={getStatusColor(serverNode.status)}
                          w={6}
                          h={6}
                        />
                      </Td>
                      <Td>
                        <Link href={serverNode.link} target="_blank" rel="noopener noreferrer">
                          Link
                        </Link>
                      </Td>
                      <Td>
                        <Icon as={MdSnooze} cursor="pointer" onClick={() => { 
                          setSelectedServerNode(serverNode);
                          setIsSnoozeModalOpen(true);
                        }} />
                        <Modal isOpen={isSnoozeModalOpen} onClose={() => setIsSnoozeModalOpen(false)}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Snooze</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                            <FormControl>
                              <FormLabel>Snooze hours:</FormLabel>
                              <Input
                                type="number"
                                value={snoozeHours === 0 ? '' : snoozeHours}
                                onChange={(e) => setSnoozeHours(Number(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormControl mt={2}>
                              <FormLabel>Snooze days:</FormLabel>
                              <Input
                                type="number"
                                value={snoozeDays === 0 ? '' : snoozeDays}
                                onChange={(e) => setSnoozeDays(Number(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormControl mt={2}>
                              <FormLabel>Comment (minimum 30 characters):</FormLabel>
                              <Textarea
                                value={snoozeComment}
                                onChange={(e) => setSnoozeComment(e.target.value)}
                                required
                                minLength={30}
                              />
                            </FormControl>
                            </ModalBody>
                            <ModalFooter>
                              <Button size="sm" mr="2" colorScheme={'navy'} onClick={() => {
                                setIsSnoozeModalOpen(false);
                                setSnoozeHours(0); // Reset snoozeHours to 0
                                setSnoozeDays(0);  // Reset snoozeDays to 0

                              }}>
                                Close
                              </Button>
                              <Button
                                size="sm" 
                                mr="2" 
                                colorScheme={'teal'}
                                onClick={() => {
                                  if (selectedServerNode) {
                                    handleSnooze(selectedServerNode, snoozeHours, snoozeDays, snoozeComment);
                                    setIsSnoozeModalOpen(false);
                                    setSnoozeHours(0); // Reset snoozeHours to 0
                                    setSnoozeDays(0);  // Reset snoozeDays to 0
                                    setSnoozeComment('');
                                  }
                                }}
                              >
                                Snooze
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" mr="2" colorScheme={'navy'} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
        {/* // Display the global snoozed items
        {globalSnoozedItems.length > 0 && (
          <Box mt={4}>
            <Text fontWeight="bold">Global Snoozed Items:</Text>
            <ul>
              {globalSnoozedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.type} - Snoozed until: {new Date(item.snoozeTime!).toLocaleString()}
                </li>
              ))}
            </ul>
          </Box>
        )} */}
      </ModalContent>
    </Modal>
  );
};

export default PopupCard;
