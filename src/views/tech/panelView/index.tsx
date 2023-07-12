import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import Banner from 'views/tech/panelView/components/Banner';
import Card from 'components/card/ServerCard';
import { SearchBar } from 'views/tech/panelView/components/Search';
import { HSeparator } from 'components/separator/Separator';
import tableAppList from './variable/tableAppList';

import {
  MdDashboard,
  MdDensityMedium,
  MdDensityLarge,
  MdDensitySmall,
} from 'react-icons/md';

interface AppData {
	name: string;
	error: string;
	solution: string;
	time: string;
	status: string;
}

export default function PanelView() {
  const [tabState, setTabState] = useState('server');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredAppList, setFilteredAppList] = useState(tableAppList);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const buttonBg = useColorModeValue('transparent', 'navy.800');
  const hoverButton = useColorModeValue({ bg: 'gray.100' }, { bg: 'whiteAlpha.100' });
  const activeButton = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.200' });
  const paleGray = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');

  const getStatusPriority = (status: string) => {
    if (status === 'Error') {
      return 0;
    } else if (status === 'Warning') {
      return 1;
    } else if (status === 'Working') {
      return 2;
    }
    return 3; 
  };

  const filterBySearch = (data: AppData) => {
    if (searchQuery === '') {
      return true; // Show all cards when search query is empty
    }
    const lowerSearchQuery = searchQuery.toLowerCase();
    return Object.values(data).some((value) => String(value).toLowerCase().includes(lowerSearchQuery));
  };
  
  const filterByStatus = (data: AppData) => {
    if (selectedStatus === 'all' || selectedStatus === '') {
      return true; // Show all cards when 'All' or an empty value is selected
    }
    return data.status === selectedStatus;
  };  
  
  useEffect(() => {
    const filteredList = tableAppList.filter(filterBySearch).filter(filterByStatus);
    setFilteredAppList(filteredList);
  }, [searchQuery, selectedStatus]);

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Box mb='20px' display={{ base: 'block', lg: 'grid' }}>
        <Flex flexDirection='column'>
          <Banner name='Monitoring Dashboard' />
        </Flex>
      </Box>
      <Tabs variant='soft-rounded' colorScheme='brandTabs'>
        <TabList mx={{ base: '10px', lg: '30px' }} overflowX={{ sm: 'scroll', lg: 'unset' }}>
          <Flex justify={{ base: 'start', md: 'center' }} w='100%'>
            <Tab
              pb='0px'
              flexDirection='column'
              onClick={() => {
                setTabState('server');
              }}
              me='50px'
              bg='unset'
              _selected={{
                bg: 'none',
              }}
              _focus={{ border: 'none' }}
              minW='max-content'
            >
              <Flex align='center'>
                <Icon color={textColor} as={MdDensitySmall} w='20px' h='20px' me='8px' />
                <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                  Server
                </Text>
                <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                  {filteredAppList.length}
                </Text>
              </Flex>
              <Box
                height='4px'
                w='100%'
                transition='0.1s linear'
                bg={tabState === 'server' ? 'navy.700' : 'transparent'}
                mt='15px'
                borderRadius='30px'
              />
            </Tab>
            <Tab
              onClick={() => {
                setTabState('application');
              }}
              pb='0px'
              me='50px'
              bg='unset'
              _selected={{
                bg: 'none',
              }}
              _focus={{ border: 'none' }}
              minW='max-content'
              flexDirection='column'
            >
              <Flex align='center'>
                <Icon color={textColor} as={MdDensityMedium} w='20px' h='20px' me='8px' />
                <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                  Application
                </Text>
                <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                  4
                </Text>
              </Flex>
              <Box
                height='4px'
                w='100%'
                transition='0.1s linear'
                bg={tabState === 'application' ? 'brand.500' : 'transparent'}
                mt='15px'
                borderRadius='30px'
              />
            </Tab>
            <Tab
              pb='0px'
              flexDirection='column'
              onClick={() => {
                setTabState('solution');
              }}
              me='50px'
              bg='unset'
              _selected={{
                bg: 'none',
              }}
              _focus={{ border: 'none' }}
              minW='max-content'
            >
              <Flex align='center'>
                <Icon color={textColor} as={MdDensityLarge} w='20px' h='20px' me='8px' />
                <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                  Solution
                </Text>
                <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                  12
                </Text>
              </Flex>
              <Box
                height='4px'
                w='100%'
                transition='0.1s linear'
                bg={tabState === 'solution' ? 'brand.500' : 'transparent'}
                mt='15px'
                borderRadius='30px'
              />
            </Tab>
          </Flex>
        </TabList>
        <HSeparator mb='30px' bg={paleGray} mt='0px' />
        <Flex w='100%'>
          <SearchBar onSearch={setSearchQuery} />
          <Select
            fontSize="sm"
            variant="main"
            h="44px"
            maxH="44px"
            me="20px"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            <option value="">All</option>
            <option value="Error" >Red</option>
            <option value="Warning">Amber</option>
            <option value="Working">Green</option>
          </Select>
          <Select
            fontSize='sm'
            variant='main'
            h='44px'
            maxH='44px'
            me='20px'
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as 'asc' | 'desc')}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </Select>
          <Button
            me='20px'
            bg={buttonBg}
            border='1px solid'
            color='secondaryGray.600'
            borderColor={useColorModeValue('secondaryGray.100', 'whiteAlpha.100')}
            borderRadius='16px'
            _placeholder={{ color: 'secondaryGray.600' }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdDashboard} />
          </Button>
        </Flex>
        <Text mt='25px' mb='36px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
          {filteredAppList.length} Results
        </Text>
        <TabPanels>
          <TabPanel px='0px'>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
              {tableAppList
                .filter((data: any) => {
                  const searchFields = ['name', 'error', 'time', 'solution'];
                  const lowerSearchQuery = searchQuery.toLowerCase();
                  return searchFields.some((field) =>
                    data[field].toLowerCase().includes(lowerSearchQuery)
                  );
                })
                .filter((data: any) => {
                  if (selectedStatus === 'all' || selectedStatus === '') {
                    return true;
                  }
                  return data.status === selectedStatus;
                  })
                .sort((a: any, b: any) => {
                  if (sortOrder === 'asc') {
                    return getStatusPriority(a.status) - getStatusPriority(b.status);
                  } else {
                    return getStatusPriority(b.status) - getStatusPriority(a.status);
                  }
                })
                .map((data: any, index: number) => (
                  <Card key={index} {...data} />
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
