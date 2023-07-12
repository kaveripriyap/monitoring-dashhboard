// Chakra imports
import {
	Icon,
	Text,
	useColorModeValue
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import Transaction from 'components/dataDisplay/Transaction';

export default function YourCard(props: { [x: string]: any }) {
	const { ...rest } = props;

	// Chakra Color Mode
	const greenIcon = useColorModeValue('green.500', 'white');
	const redIcon = useColorModeValue('red.500', 'white');
	const yellowIcon = useColorModeValue('yellow.500', 'white');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Card {...rest}>
			<Text fontSize='xl' color={textColor} fontWeight='700' mb='34px'>
				High Alert
			</Text>
			<Transaction
				mb='26px'
				name='App 1'
				date='10:13 6 July 2023'
				sum='CPU'
				icon={<Icon color={redIcon} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='App 2'
				date='12:15 6 July 2023'
				sum='APPL'
				icon={<Icon color={yellowIcon} w='20px' h='18px' />}
			/>
			<Transaction
				mb='26px'
				name='App 3'
				date='13:11 6 July 2023'
				sum='CPU'
				icon={<Icon color={yellowIcon} w='20px' h='18px' />}
			/>
			<Transaction
				name='App 4'
				date='16:57 6 July 2023'
				sum='N/A'
				icon={<Icon color={greenIcon} w='20px' h='18px' />}
			/>
		</Card>
	);
}
