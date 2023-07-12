import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import CircularProgress from 'components/charts/CircularProgress';
import { VSeparator } from 'components/separator/Separator';

import Card from 'components/card/Card';

export default function ProfitEstimation(props: { [x: string]: any }) {
	const { ...rest } = props;

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Text color={textColor} fontSize='lg' fontWeight='700' mb='10px' mx='auto'>
				Applications Status
			</Text>
			<Text color='secondaryGray.600' fontSize='sm' fontWeight='500' maxW='200px' mx='auto' mb='10px'>
				Percentage Running
			</Text>
			<Flex justifyContent='center' alignItems='center' w='100%' px='10px' mb='8px' />
			<Box w='140px' mx='auto' mb='10px' mt='10px'>
				<CircularProgress title='' percentage={90} />
			</Box>
			<Card bg={cardColor} flexDirection='row' p='15px' px='20px' mt='auto'>
				<Flex direction='column' py='5px'>
					<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
						Running
					</Text>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						89
					</Text>
				</Flex>
				<VSeparator ms='70px' me='20px' />
				<Flex direction='column' py='5px'>
					<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
						Not running
					</Text>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						3
					</Text>
				</Flex>
			</Card>
		</Card>
	);
}
