import { Flex } from '@chakra-ui/react';
import Card from 'components/card/Card';

import ApplicationsTable from './components/ApplicationsTable'; 
import tableDataOrders from './variable/tableApp';
import Banner from'./components/Banner';

export default function SearchUser() {
	return (
		<Flex direction='column' pt={{ sm: '125px', lg: '75px' }} justifyContent='space-between' marginBottom={'100px'}>
			<Banner
						total={156}
						errors={8}
						warnings={11}
						working={135}
					/>
			<Card px='0px' mb='5'>
				<ApplicationsTable tableData={tableDataOrders} />
			</Card>
			<Card px='0px'>
				<ApplicationsTable tableData={tableDataOrders} />
			</Card>
		</Flex>
	);
}
