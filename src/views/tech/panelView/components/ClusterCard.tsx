import React from 'react';
import { Flex, Text, Box, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import Card from 'components/card/Card';

type ClusterCardProps = {
  name: string;
  derivedStatus: string; // Derived status for the cluster
  onClick: () => void;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Working':
      return <Icon as={FaCheckCircle} color='green.400' />;
    case 'Warning':
      return <Icon as={FaExclamationTriangle} color='yellow.400' />;
    case 'Error':
      return <Icon as={FaTimesCircle} color='red.400' />;
    default:
      return null;
  }
};

const getCardBgColor = (status: string) => {
  switch (status) {
    case 'Working':
      return 'green.100';
    case 'Warning':
      return 'yellow.100';
    case 'Error':
      return 'red.100';
    default:
      return 'gray.100';
  }
};

const ClusterCard: React.FC<ClusterCardProps> = ({ name, derivedStatus, onClick }) => {
  const icon = getStatusIcon(derivedStatus);
  const cardBgColor = useColorModeValue(getCardBgColor(derivedStatus), 'gray.600');


  return (
    <Card
      p='20px'
      onClick={onClick}
      cursor='pointer'
      borderRadius='md'
      boxShadow='md'
      bg={cardBgColor}
      transition='all 0.2s ease'
      _hover={{ transform: 'scale(1.05)' }}
      minH='180px' // Set a minimum height for the card
    >
      <Flex direction='column' align='center' justifyContent='center' h='100%'>
        <Text fontSize='lg' fontWeight='semibold' textAlign='center'>
          {name}
        </Text>
      </Flex>
    </Card>
  );
};

export default ClusterCard;
