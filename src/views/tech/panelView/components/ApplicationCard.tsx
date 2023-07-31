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

type Application = {
  name: string;
  aaCode: string;
  status: string;
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
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBid = useColorModeValue('black.500', 'white');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState<'MC' | 'AppD' | 'All'>('All');

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
    if (statuses.includes('Red')) {
      return 'Red';
    } else if (statuses.includes('Amber')) {
      return 'Amber';
    } else {
      return 'Green';
    }
  };

  const getOverallMCStatus = () => {
    const mcNodes = serversNodes.filter((node) => node.type === 'MC');
    if (mcNodes.some((node) => node.status === 'Error')) {
      return 'Red';
    } else if (mcNodes.some((node) => node.status === 'Warning')) {
      return 'Amber';
    } else {
      return 'Green';
    }
  };


  
  const getOverallAppDStatus = () => {
    const appdNodes = serversNodes.filter((node) => node.type === 'AppD');
    if (appdNodes.some((node) => node.status === 'Error')) {
      return 'Red';
    } else if (appdNodes.some((node) => node.status === 'Warning')) {
      return 'Amber';
    } else {
      return 'Green';
    }
  };

  const mcOverallStatus = getOverallMCStatus();
  const mcIcon =
    mcOverallStatus === 'Green'
      ? MdOutlineCheckCircle
      : mcOverallStatus === 'Amber'
      ? MdOutlineWarningAmber
      : MdOutlineErrorOutline;

  const appdOverallStatus = getOverallAppDStatus();
  const appdIcon =
    appdOverallStatus === 'Green'
      ? MdOutlineCheckCircle
      : appdOverallStatus === 'Amber'
      ? MdOutlineWarningAmber
      : MdOutlineErrorOutline;

  const guiIcon =
    application.guiStatus === 'Green'
      ? MdOutlineCheckCircle
      : application.guiStatus === 'Amber'
      ? MdOutlineWarningAmber
      : MdOutlineErrorOutline;

  const overallStatusValue = overallStatus();
  const overallIcon =
    overallStatusValue === 'Green'
      ? MdOutlineCheckCircle
      : overallStatusValue === 'Amber'
      ? MdOutlineWarningAmber
      : MdOutlineErrorOutline;
  const overallIconColor =
    overallStatusValue === 'Green' ? 'green.400' : overallStatusValue === 'Amber' ? 'orange.400' : 'red.400';

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
          <Icon as={overallIcon} w='28px' h='28px' />
        </Flex>
        <Flex direction='row' align='center' justify='space-between' h='100%' mt='auto'>
          <Flex direction='row' align='center'>
            <Flex direction='column' align='center' me='20px'>
              <Icon
                as={mcIcon}
                color={
                  mcOverallStatus === 'Green'
                    ? 'green.400'
                    : mcOverallStatus === 'Amber'
                    ? 'orange.400'
                    : 'red.400'
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
                  appdOverallStatus === 'Green'
                    ? 'green.400'
                    : appdOverallStatus === 'Amber'
                    ? 'orange.400'
                    : 'red.400'
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
                  application.guiStatus === 'Green'
                    ? 'green.400'
                    : application.guiStatus === 'Amber'
                    ? 'orange.400'
                    : 'red.400'
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
          <PopupCard isOpen={isOpen} onClose={handleClosePopup} serversNodes={serversNodes} selectedFilterType={selectedFilterType}/>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ApplicationCard;
