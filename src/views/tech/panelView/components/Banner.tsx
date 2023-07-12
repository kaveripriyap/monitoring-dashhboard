// Chakra imports
import { Flex, Text, useToast, useColorModeValue } from '@chakra-ui/react';

export default function Banner(props: {
	name: string;
}) {
	const { name } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Flex justifyContent='center' align='center' direction='column' w='100%'>
			<Flex align='center' mb='20px'>
				<Text
					color={textColor}
					fontSize={{ base: '40px', lg: '44px' }}
					fontWeight='700'
					lineHeight='100%'
					me='6px'>
					{name}
				</Text>
			</Flex>
		</Flex>
	);
}
