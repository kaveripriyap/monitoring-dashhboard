import React from 'react';
import { Flex, Text, Box, Icon } from '@chakra-ui/react';
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

const ClusterCard: React.FC<ClusterCardProps> = ({ name, derivedStatus, onClick }) => {
  const icon = getStatusIcon(derivedStatus);

  return (
    <Card
      p='20px'
      onClick={onClick}
      cursor='pointer'
      borderRadius='md'
      boxShadow='md'
      transition='all 0.2s ease'
      _hover={{ transform: 'scale(1.05)' }}
    >
      <Flex direction='column' align='center'>
        <Text fontSize='lg' fontWeight='semibold' mb='10px'>
          {name}
        </Text>
        {icon && (
          <Box
            w='30px'
            h='30px'
            borderRadius='50%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mb='10px'
            bg={
              derivedStatus === 'Working'
                ? 'green.100'
                : derivedStatus === 'Warning'
                ? 'yellow.100'
                : derivedStatus === 'Error'
                ? 'red.100'
                : 'gray.100'
            }
          >
            {icon}
          </Box>
        )}
      </Flex>
    </Card>
  );
};

export default ClusterCard;
