import { Flex, Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import LineChart from 'components/charts/LineChart';

import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

import { lineChartDataProjectStatus, lineChartOptionsProjectStatus } from 'variables/charts';

export default function ProjectStatus(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex justify='space-between' px='10px' pt='5px' mb='20px' align='center' w='100%'>
				<Text color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%'>
					Application Status
				</Text>
			</Flex>
			<Box minH='250px' mt='auto'>
				<LineChart chartData={lineChartDataProjectStatus} chartOptions={lineChartOptionsProjectStatus} />
			</Box>
		</Card>
	);
}
