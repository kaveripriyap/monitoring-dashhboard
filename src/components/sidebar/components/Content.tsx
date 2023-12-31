import { Box, Flex, Stack } from '@chakra-ui/react';

// Components
import Links from 'components/sidebar/components/Links';

function SidebarContent(props: { routes: RoutesType[] }) {
	const { routes } = props;

	// Sidebar
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Stack direction='column' mb='auto' mt='8px'>
				<Box ps='20px' pe={{ md: '16px', '2xl': '1px' }}>
					<Links routes={routes} />
				</Box>
			</Stack>
		</Flex>
	);
}

export default SidebarContent;
