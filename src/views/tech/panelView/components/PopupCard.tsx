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
} from '@chakra-ui/react';
import { MdCheckCircle, MdOutlineWarningAmber, MdOutlineErrorOutline, MdFilterList } from 'react-icons/md';

type ServerNode = {
  name: string;
  type: 'MC' | 'AppD';
  aaCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
};

type PopupCardProps = {
  isOpen: boolean;
  onClose: () => void;
  serversNodes: ServerNode[];
  selectedFilterType: 'MC' | 'AppD' | 'All';
};

const PopupCard: React.FC<PopupCardProps> = ({ isOpen, onClose, serversNodes, selectedFilterType }) => {
  const [sorting, setSorting] = useState<{ id: keyof ServerNode; desc: boolean }[]>([]);
  console.log(selectedFilterType);
  const [filterType, setFilterType] = useState<'MC' | 'AppD' | 'All'>(selectedFilterType);

  useEffect(() => {
    setFilterType(selectedFilterType); // Update filterType when selectedFilterType changes
  }, [selectedFilterType]);

  const handleSortingChange = (column: keyof ServerNode) => {
    setSorting([{ id: column, desc: !sorting[0]?.desc }]);
  };

  const getSortedData = () => {
    if (sorting.length === 0) return serversNodes;
    const sortedData = [...serversNodes].sort((a, b) => {
      const columnId = sorting[0].id;
      const aValue = a[columnId];
      const bValue = b[columnId];
      return sorting[0].desc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
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
    if (filterType === 'All') {
      return true; // Show all server nodes when 'All' is selected
    }
    return data.type === filterType;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Server/Node Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="flex-start" mb="4">
            <Button
              colorScheme={filterType === 'All' ? 'navy' : 'gray'}
              size="sm"
              mr="3"
              onClick={() => setFilterType('All')}
            >
              All
            </Button>
            <Button
              colorScheme={filterType === 'MC' ? 'navy' : 'gray'}
              size="sm"
              mr="3"
              onClick={() => setFilterType('MC')}
            >
              MC
            </Button>
            <Button
              colorScheme={filterType === 'AppD' ? 'navy' : 'gray'}
              size="sm"
              onClick={() => setFilterType('AppD')}
            >
              AppD
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
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
              size="sm"
              mr="2"
              colorScheme={'navy'} 
              onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PopupCard;

