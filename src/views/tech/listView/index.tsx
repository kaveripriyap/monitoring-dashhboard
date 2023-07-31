import { Flex } from '@chakra-ui/react';
import Card from 'components/card/Card';

import ApplicationsTable from './components/ApplicationsTable'; 
import tableServerNodeList from '../panelView/variable/tableServerNodeList';
import Banner from'./components/Banner';

export default function SearchUser() {

	const filteredData = tableServerNodeList;
	const total = filteredData.length;
	const errors = filteredData.filter((row) => row.status === 'Error').length;
	const warnings = filteredData.filter((row) => row.status === 'Warning').length;
	const working = filteredData.filter((row) => row.status === 'Working').length;

	return (
		<Flex direction='column' pt={{ sm: '125px', lg: '75px' }} justifyContent='space-between' marginBottom={'100px'}>
			<Banner total={total} errors={errors} warnings={warnings} working={working} />
			<Card px='0px' mb='5'>
				<ApplicationsTable tableData={tableServerNodeList} />
			</Card>
			{/* <Card px='0px'>
				<ApplicationsTable tableData={tableDataOrders} />
			</Card> */}
		</Flex>
	);
}
