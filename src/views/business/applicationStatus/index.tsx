import { Flex, SimpleGrid, Text, Icon, useColorModeValue } from '@chakra-ui/react';

import Statistics from 'views/business/applicationStatus/components/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import BusinessApplicationsTable from 'views/business/applicationStatus/components/BusinessApplicationsTable';
import tableBusinessApplications from 'views/business/applicationStatus/variables/tableBusinessApplications';

import { MdOutlineBarChart, MdPerson, MdFileCopy, MdArrowDownward, MdDesktopWindows, MdOutlineDesktopWindows, MdArrowUpward } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import SearchTableOrders from './components/BusinessApplicationsTable';
import Card from 'components/card/Card';

export default function Application() {
	const iconBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const iconColor = useColorModeValue('brand.500', 'white');
	return (
		<Flex pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<Flex direction='column' width='stretch'>
				<SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 2, '2xl': 4 }} gap='20px' mb='20px'>
					<Flex>
						<Statistics
							focused={true}
							bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
							title={'Applications Running'}
							value='98%'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowUpSFill} color='white' />
									<Text color='white' fontSize='sm' mx='3px' fontWeight='500'>
										+7%
									</Text>
									<Text color='white' fontSize='sm' fontWeight='500'>
										Since last year
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg='linear-gradient(290.56deg, #868CFF -18.35%, #4318FF 60.45%)'
									icon={<Icon as={MdOutlineBarChart} w='38px' h='38px' color='white' />}
								/>
							}
						/>
					</Flex>
					<Flex>
						<Statistics
							title={'Applications Down'}
							value='5'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowDownSFill} color='red.500' />
									<Text color='red.500' fontSize='sm' mx='4px' fontWeight='700'>
										-12%
									</Text>
									<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg={iconBg}
									icon={<Icon color={iconColor} as={MdArrowDownward} w='38px' h='38px' />}
								/>
							}
						/>
					</Flex>
					<Flex>
						<Statistics
							title={'Applications Up'}
							value='49'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowUpSFill} color='green.500' />
									<Text color='green.500' fontSize='sm' mx='4px' fontWeight='700'>
										+16%
									</Text>
									<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg={iconBg}
									icon={<Icon color={iconColor} as={MdArrowUpward} w='38px' h='38px' />}
								/>
							}
						/>
					</Flex>
					<Flex>
						<Statistics
							title={'Total Applications'}
							value='53'
							detail={
								<Flex align='center'>
									<Icon as={RiArrowUpSFill} color='green.500' />
									<Text color='green.500' fontSize='sm' mx='4px' fontWeight='700'>
										+27%
									</Text>
									<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
										Since last month
									</Text>
								</Flex>
							}
							illustration={
								<IconBox
									w='80px'
									h='80px'
									bg={iconBg}
									icon={<Icon color={iconColor} as={MdOutlineDesktopWindows} w='28px' h='28px' />}
								/>
							}
						/>
					</Flex>
				</SimpleGrid>
				{/* <BusinessApplicationsTable tableData={tableBusinessApplications} /> */}
				<Card px='0px'>
					<SearchTableOrders tableData={tableBusinessApplications} />
				</Card>
			</Flex>
		</Flex>
	);
}
