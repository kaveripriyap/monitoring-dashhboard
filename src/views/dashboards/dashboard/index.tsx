import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid
} from '@chakra-ui/react';

import MiniStatistics from '../../../components/card/MiniStatistics';
import ClusterCard from '../../tech/panelView/components/ClusterCard';
import tableAppList, { getAppListWithDerivedStatuses, calculateClusterStatus } from '../../tech/panelView/variable/tableAppList';
import { fetchTableNodeList } from '../../tech/panelView/variable/tableServerNodeList';
import { GlobalSnoozeProvider } from '../../tech/panelView/components/GlobalSnoozeContext';

interface AppData {
  name: string;
  asCode: string;
  overallStatus: string;
  mcStatus: string,
  appdStatus: string,
  guiStatus: string,
  cluster: string
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

export type AppObj = {
	name: string;
	asCode: string;
	overallStatus: string;
	mcStatus: string,
  appdStatus: string,
  guiStatus: string,
	cluster: string
};

export default function PanelView() {
  const [tabState, setTabState] = useState('application');
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
  const [tableNodeList, setTableNodeList] = useState<NodeObj[]>([]);
  const [clusterStatusMapping, setClusterStatusMapping] = useState<Record<string, string>>({});
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  useEffect(() => {
    const fetchData = async () => {
      const updatedTableNodeList = await fetchTableNodeList();
      setTableNodeList(updatedTableNodeList);
    };

    fetchData(); // Fetch data immediately on component mount

    // Set up an interval to fetch data every 15 minutes
    const intervalId = setInterval(fetchData, 15 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleSnoozedNodesButtonClick = () => {
    setIsSnoozedNodesPopupOpen(true);
  };

  const handleClusterClick = (cluster: string) => {
    if (cluster === selectedCluster) {
      setSelectedCluster(null); // Deselect the cluster if it's already selected
    } else {
      setSelectedCluster(cluster); // Update the selectedCluster state
    }
  };

  const [filteredServerList, setFilteredServerList] = useState<NodeObj[]>(tableNodeList);

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

  const filterByCluster = (data: AppData) => {
    if (selectedCluster === null || selectedCluster === '') {
      return true; // Show all cards when no cluster is selected
    }
  
    // Filter by cluster
    return data.cluster === selectedCluster;
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
  const newClusterStatusMapping: Record<string, string> = {};

  tableAppList.forEach((app) => {
    const cluster = app.cluster;
    
    if (cluster && !newClusterStatusMapping[cluster]) {
      // Derive the cluster status based on app statuses
      const clusterApps = tableAppList.filter((a) => a.cluster === cluster);
      const clusterStatus = calculateClusterStatus(clusterApps); // Implement this function
      newClusterStatusMapping[cluster] = clusterStatus;
    }
  });

  setClusterStatusMapping(newClusterStatusMapping);
}, [tableAppList]);
  
  useEffect(() => {
    const appListWithStatuses = getAppListWithDerivedStatuses(tableAppList, tableNodeList);
    const filteredList = appListWithStatuses.filter(filterBySearch).filter(filterByStatus).filter(filterByCluster);
    setFilteredAppList(filteredList);

    // Calculate cluster statuses
    const clusterAppMapping: Record<string, AppObj[]> = {};

    filteredList.forEach((app) => {
      const clusterName = app.cluster;
  
      if (clusterName) {
        if (!clusterAppMapping[clusterName]) {
          clusterAppMapping[clusterName] = [];
        }
        clusterAppMapping[clusterName].push(app);
      }
    });

    const newClusterStatusMapping: Record<string, string> = {};

    Object.keys(clusterAppMapping).forEach((clusterName) => {
      const clusterApps = clusterAppMapping[clusterName];
      const clusterStatus = calculateClusterStatus(clusterApps); // Implement this function
      newClusterStatusMapping[clusterName] = clusterStatus;
    });

    setClusterStatusMapping(newClusterStatusMapping);
  }, [searchQuery, selectedStatus, selectedCluster]);

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

  // Calculate the number of applications for each category
  const errorCount = filteredAppList.filter(app => app.overallStatus === 'Error').length;
  const warningCount = filteredAppList.filter(app => app.overallStatus === 'Warning').length;
  const workingCount = filteredAppList.filter(app => app.overallStatus === 'Working').length;
  const noDataCount = filteredAppList.filter(app => !app.overallStatus).length; // Applications with undefined overallStatus

  // Calculate the total number of applications
  const totalAppCount = tableAppList.length;

  return (
    <GlobalSnoozeProvider>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
		<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
			<MiniStatistics
				name='Total Applications'
				value={totalAppCount.toString()}
			/>
			<MiniStatistics
				name='Error (#)'
				value={errorCount.toString()}
			/>
			<MiniStatistics 
				name='Warning (#)' 
				value={warningCount.toString()}
      />
			<MiniStatistics
				name='Working (#)'
				value={workingCount.toString()}
			/>
			<MiniStatistics
				name='No data (#)'
				value={noDataCount.toString()}
			/>
			<Flex direction='column' bg={boxBg} p='16px 20px' borderRadius='14px'>
				<Text fontSize='sm' fontWeight='700' color={textColor}>
					What is this dashboard?
				</Text>
				<Text fontSize='sm' fontWeight='500' color='secondaryGray.600'>
					A consolidated view to monitor applications.
				</Text>
			</Flex>
		</SimpleGrid>
		<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap='20px'>
			{/* Display ClusterCard components using the cluster status data */}
			{Object.keys(clusterStatusMapping).map((cluster) => (
			<ClusterCard
				key={cluster}
				name={cluster}
				derivedStatus={clusterStatusMapping[cluster]}
				onClick={() => handleClusterClick(cluster)} // You might need to implement this function
			/>
			))}
		</SimpleGrid>
	  </Box>
    </GlobalSnoozeProvider>
  );
}
