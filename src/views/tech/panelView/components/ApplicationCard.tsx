import React, { useState } from 'react';
import {
  AvatarGroup,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdOutlineWarningAmber,
  MdOutlineErrorOutline,
  MdOutlineCheckCircle,
} from 'react-icons/md';
import Card from '../../../../components/card/Card';
import PopupCard from './PopupCard';
import { useGlobalSnooze } from './GlobalSnoozeContext';

type Application = {
  name: string;
  aaCode: string;
  overallStatus: string;
  mcStatus: string;
  appdStatus: string;
  guiStatus: string;
};

type ServerNode = {
  name: string;
  type: 'MC' | 'AppD';
  aaCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
  snoozeTime?: number;
};

type ApplicationCardProps = {
  application: Application;
  serversNodes: ServerNode[];
  onMCClick: (aaCode: string) => void;
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  serversNodes,
  onMCClick,
}) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBid = useColorModeValue('black.500', 'white');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState<'MC' | 'AppD' | 'All'>('All');
  const { globalSnoozedItems, addGlobalSnooze } = useGlobalSnooze();

  const handleCheckIssueClick = () => {
    setIsOpen(true);
    setSelectedFilterType('All');
  };

  const handleAppDClick = () => {
    setIsOpen(true);
    setSelectedFilterType('AppD'); // Set the selected filter type to 'AppD'
  };

  const handleMCClick = () => {
    setIsOpen(true);
    setSelectedFilterType('MC'); // Set the selected filter type to 'AppD'
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const overallStatus = () => {
    const statuses = [application.mcStatus, application.appdStatus, application.guiStatus];
    
    if (statuses.some((status) => status === 'Error')) {
      return 'Error';
    } else if (statuses.some((status) => status === 'Warning')) {
      return 'Warning';
    } else if (statuses.some((status) => status === 'Working')) {
      return 'Working';
    } else {
      return 'Undefined'; // Return 'Undefined' when there is no data or data is empty
    }
  };

  const getOverallMCStatus = () => {
    const mcNodes = serversNodes.filter((node) => node.type === 'MC');
    
    if (mcNodes.length === 0) {
      return 'Undefined'; // Return 'Undefined' when there are no MC nodes
    }
    
    if (mcNodes.some((node) => node.status === 'Error')) {
      return 'Error';
    } else if (mcNodes.some((node) => node.status === 'Warning')) {
      return 'Warning';
    } else if (mcNodes.some((node) => node.status === 'Working')) {
      return 'Working';
    } else {
      return 'Undefined'; // Return 'Undefined' when there is no data or data is empty
    }
  };
  
  const getOverallAppDStatus = () => {
    const appdNodes = serversNodes.filter((node) => node.type === 'AppD');
    
    if (appdNodes.length === 0) {
      return 'Undefined'; // Return 'Undefined' when there are no AppD nodes
    }
    
    if (appdNodes.some((node) => node.status === 'Error')) {
      return 'Error';
    } else if (appdNodes.some((node) => node.status === 'Warning')) {
      return 'Warning';
    } else if (appdNodes.some((node) => node.status === 'Working')) {
      return 'Working';
    } else {
      return 'Undefined'; // Return 'Undefined' when there is no data or data is empty
    }
  };

  const mcOverallStatus = getOverallMCStatus();
  const mcIcon = mcOverallStatus === 'Working'
    ? MdOutlineCheckCircle
    : mcOverallStatus === 'Warning'
    ? MdOutlineWarningAmber
    : mcOverallStatus === 'Error'
    ? MdOutlineErrorOutline
    : undefined; // Set to undefined when status is 'Undefined'

  const appdOverallStatus = getOverallAppDStatus();
  const appdIcon = appdOverallStatus === 'Working'
    ? MdOutlineCheckCircle
    : appdOverallStatus === 'Warning'
    ? MdOutlineWarningAmber
    : appdOverallStatus === 'Error'
    ? MdOutlineErrorOutline
    : undefined; // Set to undefined when status is 'Undefined'

  const guiIcon = application.guiStatus === 'Working'
    ? MdOutlineCheckCircle
    : application.guiStatus === 'Warning'
    ? MdOutlineWarningAmber
    : application.guiStatus === 'Error'
    ? MdOutlineErrorOutline
    : undefined; // Set to undefined when status is 'Undefined'

  const overallStatusValue = overallStatus();
  const overallIcon = overallStatusValue === 'Working'
    ? MdOutlineCheckCircle
    : overallStatusValue === 'Warning'
    ? MdOutlineWarningAmber
    : overallStatusValue === 'Error'
    ? MdOutlineErrorOutline
    : undefined; // Set to undefined when status is 'Undefined'

  const overallIconColor = overallStatusValue === 'Working'
    ? 'green.400'
    : overallStatusValue === 'Warning'
    ? 'orange.400'
    : overallStatusValue === 'Error'
    ? 'red.400'
    : 'gray.400'; // Set to gray for 'Undefined'

  return (
    <Card p='20px'>
      <Flex direction='column' h='100%'>
        <Text
          color={textColor}
          fontSize={{ base: 'xl', md: 'lg', lg: 'lg', xl: 'lg', '2xl': 'md', '3xl': 'lg' }}
          fontWeight='bold'
          mb='25px'
          me='14px'
        >
          {application.name}
        </Text>
        <Flex
          position='absolute'
          top='14px'
          right='14px'
          borderRadius='50%'
          minW='40px'
          minH='40px'
          h='40px'
          align='center'
          justify='center'
          color={overallIconColor}
          zIndex={1}
        >
          <Icon 
            as={overallIcon} w='28px' h='28px' />
        </Flex>
        <Flex direction='row' align='center' justify='space-between' h='100%' mt='auto'>
          <Flex direction='row' align='center'>
            <Flex direction='column' align='center' me='20px'>
              <Icon
                as={mcIcon}
                color={
                  mcOverallStatus === 'Working'
                    ? 'green.400'
                    : mcOverallStatus === 'Warning'
                    ? 'orange.400'
                    : mcOverallStatus === 'Error' 
                    ? 'red.400'
                    : 'gray.400'
                }
                w='24px'
                h='24px'
              />
              <Text
              fontWeight="medium"
              fontSize="sm"
              color={textColorBid}
              mt="8px"
              cursor="pointer"
              onClick={handleMCClick}
              >
                MC
              </Text>
            </Flex>
            <Box w='1px' h='16px' bg='gray.300' />
            <Flex direction='column' align='center' mx='20px'>
              <Icon
                as={appdIcon}
                color={
                  appdOverallStatus === 'Working'
                    ? 'green.400'
                    : appdOverallStatus === 'Warning'
                    ? 'orange.400'
                    : appdOverallStatus === 'Error' 
                    ? 'red.400'
                    : 'gray.400'
                }
                w='24px'
                h='24px'
              />
              <Text
              fontWeight="medium"
              fontSize="sm"
              color={textColorBid}
              mt="8px"
              cursor="pointer"
              onClick={handleAppDClick}
            >
              AppD
            </Text>
            </Flex>
            <Box w='1px' h='16px' bg='gray.300' />
            <Flex direction='column' align='center' ms='20px'>
              <Icon
                as={guiIcon}
                color={
                  application.guiStatus === 'Working'
                    ? 'green.400'
                    : application.guiStatus === 'Warning'
                    ? 'orange.400'
                    : application.guiStatus === 'Error' 
                    ? 'red.400'
                    : 'gray.400'
                }
                w='24px'
                h='24px'
              />
              <Text fontWeight='medium' fontSize='sm' color={textColorBid} mt='8px'>
                GUI
              </Text>
            </Flex>
          </Flex>
          <Button
            variant='darkBrand'
            color='white'
            fontSize='sm'
            fontWeight='500'
            borderRadius='70px'
            alignSelf='flex-end'
            onClick={handleCheckIssueClick}
          >
            Check Issue
          </Button>
            <PopupCard 
              isOpen={isOpen} 
              onClose={handleClosePopup} 
              serversNodes={serversNodes} 
              selectedFilterType={selectedFilterType}
              onGlobalSnooze={(snoozedNode: ServerNode) => addGlobalSnooze(snoozedNode)} // Pass the correct argument type
            />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ApplicationCard;
