import { Box, Flex, Select, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

import BarChart from 'components/charts/BarChart';
import { barChartDataUserActivity, barChartOptionsUserActivity } from 'variables/charts';

export default function UserActivity(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex align='center' w='100%' px='15px' py='10px'>
				<Text me='auto' color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%'>
					Rebound Times
				</Text>
			</Flex>

			<Box h='240px' mt='auto'>
				<BarChart chartData={barChartDataUserActivity} chartOptions={barChartOptionsUserActivity} />
			</Box>
		</Card>
	);
}
