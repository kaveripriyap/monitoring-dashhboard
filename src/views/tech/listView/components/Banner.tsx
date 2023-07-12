import { Flex, Icon, Image, Avatar, Text, useColorModeValue } from '@chakra-ui/react';

import Card from 'components/card/Card';
import { VSeparator } from 'components/separator/Separator';

export default function Banner(props: {
	total: number;
	errors: number;
	warnings: number;
	working: number;
}) {
	const { total, errors, warnings, working } = props;

	const borderColor = useColorModeValue('white !important', '#0b1437 !important');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorLink = useColorModeValue('blue.500', 'white');
	return (
		<Flex mb={{ base: '20px', '2xl': '20px' }} justifyContent='center' align='center' direction='column' w='100%'>
			<Card maxW='100%' w='700px' py='40px' mb='40px'>
				<Flex w='100%' justify='center' direction={{ base: 'column', md: 'row' }}>
					<Flex
						direction='column'
						align='center'
						me={{ base: '0px', md: '60px' }}
						mb={{ base: '20px', md: '11px' }}>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							{total}
						</Text>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Total
						</Text>
					</Flex>
					<VSeparator />
					<Flex
						direction='column'
						align='center'
						mx={{ base: '0px', md: '60px' }}
						mb={{ base: '20px', md: '11px' }}>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							{errors}
						</Text>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Errors
						</Text>
					</Flex>
					<VSeparator />
					<Flex
						direction='column'
						align='center'
						mx={{ base: '0px', md: '60px' }}
						mb={{ base: '20px', md: '11px' }}>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							{warnings}
						</Text>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Warnings
						</Text>
					</Flex>
					<VSeparator />
					<Flex direction='column' align='center' ms={{ base: '0px', md: '60px' }}>
						<Text color={textColor} fontSize='36px' fontWeight='700'>
							{working}
						</Text>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Working
						</Text>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
}
