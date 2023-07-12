import { Box, Flex, Icon, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import ComplexTable from './components/ComplexTable';
import DailyTraffic from './components/DailyTraffic';
import PieCard from './components/PieCard';
import TotalSpent from './components/TotalSpent';
import WeeklyRevenue from './components/WeeklyRevenue';
import tableDataComplex from './variables/tableDataComplex';
import PercentageEstimation from './components/PercentageEstimation';
import UserActivity from './components/UserActivity';
import Balance from './components/Balance';
import YourCard from './components/YourCard';
import ProjectStatus from './components/ProjectStatus';

export default function UserReports() {
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }} height='100%'>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
				<MiniStatistics
					name='Total Applications'
					value='176'
				/>
				<MiniStatistics
					name='Applications Running (#)'
					value='173'
				/>
				<MiniStatistics 
					growth='+6%' 
					name='Applications Running (%)' 
					value='1.73%' />
				<MiniStatistics
					name='Applications Down (#)'
					value='98.27%'
				/>
				<MiniStatistics
					name='Applications Down (%)'
					value='1.73%'
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

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<Balance />
					<PercentageEstimation />
				</SimpleGrid>
				<TotalSpent />
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<ComplexTable tableData={tableDataComplex} />
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<YourCard />
					<PieCard />
				</SimpleGrid>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<DailyTraffic />
					<WeeklyRevenue />
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
					<ProjectStatus />
					<UserActivity />
				</SimpleGrid>
			</SimpleGrid>
		</Box>
	);
}
