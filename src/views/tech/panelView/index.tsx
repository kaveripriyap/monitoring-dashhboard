import { useEffect, useRef, useState } from 'react';

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
import ApplicationCard from 'views/tech/panelView/components/ApplicationCard';
import SnoozedNodesPopup from './components/SnoozedNodesPopup';
import ServerCardList from './components/ServerCardList';
import { SearchBar } from 'views/tech/panelView/components/Search';
import { HSeparator } from 'components/separator/Separator';
import tableAppList, { getAppListWithDerivedStatuses } from './variable/tableAppList';
import tableNodeList from './variable/tableServerNodeList';
import { GlobalSnoozeProvider, useGlobalSnooze } from './components/GlobalSnoozeContext';

import {
  MdDensityMedium,
  MdDensitySmall,
} from 'react-icons/md';

interface AppData {
	name: string;
	asCode: string;
	overallStatus: string;
	mcStatus: string,
  appdStatus: string,
  guiStatus: string,
}

type NodeObj = {
  name: string;
  type: 'MC' | 'AppD';
  asCode: string;
  error: string;
  time: string;
  status: 'Error' | 'Warning' | 'Working';
  link: string;
};

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

export default function PanelView() {
  const [tabState, setTabState] = useState('application');
  const [filteredServerList, setFilteredServerList] = useState<NodeObj[]>(tableNodeList);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredAppList, setFilteredAppList] = useState(tableAppList);
  const [selectedAppasCode, setSelectedAppasCode] = useState<string | null>(null);
  const [tabKey, setTabKey] = useState<number>(0);
  const [shouldSwitchToServerTab, setShouldSwitchToServerTab] = useState(false);
  const [snoozedNodes, setSnoozedNodes] = useState<ServerNode[]>([]);
  const [isSnoozedNodesPopupOpen, setIsSnoozedNodesPopupOpen] = useState(false);
  const [serversNodes, setServersNodes] = useState<ServerNode[]>([]);

  const handleSnoozedNodesButtonClick = () => {
    setIsSnoozedNodesPopupOpen(true);
  };

  const handleSnoozeEnd = (snoozedNode: ServerNode) => {
    // Find the index of the snoozed node to be removed in the snoozedNodes array
    const snoozedNodeIndex = snoozedNodes.findIndex(node => node.name === snoozedNode.name);
  
    // If the snoozed node is found in the array, remove it
    if (snoozedNodeIndex !== -1) {
      const updatedSnoozedNodes = [...snoozedNodes];
      updatedSnoozedNodes.splice(snoozedNodeIndex, 1);
      setSnoozedNodes(updatedSnoozedNodes);
    }
  };

  const filterServersByApp = (asCode: string) => {
    const filteredServerList = tableNodeList.filter((node) => node.asCode === asCode);
    setFilteredServerList(filteredServerList);
  };

  const textColor = useColorModeValue('secondaryGray.900', 'white');
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
  
    // Filter by status
    const filteredByStatus = data.overallStatus === selectedStatus;
  
    return filteredByStatus;
  };

  const filterNodeByName = (data: NodeObj) => {
    if (searchQuery === '') {
      return true; // Show all nodes when search query is empty
    }
    const lowerSearchQuery = searchQuery.toLowerCase();
    return data.name.toLowerCase().includes(lowerSearchQuery);
  };

  const filterNodeByStatus = (data: NodeObj) => {
    if (selectedStatus === 'all' || selectedStatus === '') {
      return true; // Show all nodes when 'All' or an empty value is selected
    }
    return data.status === selectedStatus;
  };
  
  useEffect(() => {
    const appListWithStatuses = getAppListWithDerivedStatuses(tableAppList, tableNodeList);
    const filteredList = appListWithStatuses.filter(filterBySearch).filter(filterByStatus);
    setFilteredAppList(filteredList);
  }, [searchQuery, selectedStatus]);

  useEffect(() => {
    // Filter the server list based on search query and selected status
    const filteredServerList = tableNodeList.filter(filterNodeByName).filter(filterNodeByStatus);

    // Sort the filtered server list based on the sort order
    filteredServerList.sort((a, b) => {
      // Customize the property you want to sort based on
      if (sortOrder === 'asc') {
        // For ascending order
        return a.status.localeCompare(b.status);
      } else {
        // For descending order
        return b.status.localeCompare(a.status);
      }
    });

    // Update the state with the filtered and sorted server list
    setFilteredServerList(filteredServerList);
  }, [searchQuery, selectedStatus, sortOrder]);

  // Function to handle "MC" button click and filter the application list by MC servers
  const handleMCClick = (asCode: string) => {
    setSelectedAppasCode(asCode); // Set the selected application's asCode
    setShouldSwitchToServerTab(true); // Set the flag to indicate that we need to switch to the "Server" tab
  };

  useEffect(() => {
    if (selectedAppasCode) {
      // If there is a selected application, filter the server list based on its asCode
      filterServersByApp(selectedAppasCode);
    } else {
      // If there is no selected application, show all server cards
      setFilteredServerList(tableNodeList);
    }
  }, [selectedAppasCode]);

  const switchTab = (tab: 'application' | 'server') => {
    setTabState(tab);
  };

  return (
    <GlobalSnoozeProvider>
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
                switchTab('application');
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
                <Icon color={textColor} as={MdDensityMedium} w='20px' h='20px' me='8px' />
                <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                  Application
                </Text>
                <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                  {filteredAppList.length}
                </Text>
              </Flex>
              <Box
                height='4px'
                w='100%'
                transition='0.1s linear'
                bg={tabState === 'application' ? 'navy.700' : 'transparent'}
                mt='15px'
                borderRadius='30px'
              />
            </Tab>
            <Tab
              onClick={() => {
                switchTab('server');
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
                <Icon color={textColor} as={MdDensitySmall} w='20px' h='20px' me='8px' />
                <Text color={textColor} fontSize='lg' fontWeight='500' me='12px'>
                  Server
                </Text>
                <Text color='secondaryGray.600' fontSize='md' fontWeight='400'>
                  {filteredServerList.length}
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
          </Flex>
        </TabList>
        <HSeparator mb='30px' bg={paleGray} mt='0px' />
        <Flex w='100%'>
          <SearchBar onSearch={setSearchQuery} />
          <Select
            fontSize='sm'
            variant='main'
            h='44px'
            maxH='44px'
            me='20px'
            flexBasis='300px'
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            <option value=''>All</option>
            <option value='Error'>Red</option>
            <option value='Warning'>Amber</option>
            <option value='Working'>Green</option>
          </Select>
          <Select
            fontSize='sm'
            variant='main'
            h='44px'
            maxH='44px'
            me='20px'
            flexBasis='300px'
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as 'asc' | 'desc')}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </Select>
            <Button 
              fontSize='sm'
              fontWeight='500'
              borderRadius='70px'
              alignSelf='flex-end'
              variant='darkBrand'
              h='44px'
              maxH='44px'
              me='20px'
              width={180} 
              size="sm" 
              mr="2" 
              px='20px'
              py='8px'
              onClick={handleSnoozedNodesButtonClick}>
              View Snoozed Nodes
            </Button>
            {isSnoozedNodesPopupOpen && (
              <SnoozedNodesPopup
                isOpen={isSnoozedNodesPopupOpen}
                onClose={() => setIsSnoozedNodesPopupOpen(false)}
                onSnoozeEnd={handleSnoozeEnd} // Pass the snooze end function
              />
            )}
        </Flex>
        <Text mt='25px' mb='36px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
          {tabState === 'application' ? filteredAppList.length : filteredServerList.length} Results
        </Text>
        <TabPanels>
          <TabPanel px='0px'>
              <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
                {filteredAppList
                  .sort((a, b) => {
                    if (sortOrder === 'asc') {
                      return getStatusPriority(a.overallStatus) - getStatusPriority(b.overallStatus);
                    } else {
                      return getStatusPriority(b.overallStatus) - getStatusPriority(a.overallStatus);
                    }
                  })
                  .map((data, index) => {
                    return (
                      <ApplicationCard
                        key={index}
                        application={data}
                        serversNodes={tableNodeList.filter((node) => node.asCode === data.asCode)}
                        onMCClick={handleMCClick}
                      />
                    );
                  })}
              </SimpleGrid>
          </TabPanel>
          <TabPanel px='0px'>
            {/* Use the key prop to force a re-render of the ServerCardList component */}
            {tabState === 'server' && <ServerCardList key={tabKey} filteredServerList={filteredServerList} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    </GlobalSnoozeProvider>
  );
}

