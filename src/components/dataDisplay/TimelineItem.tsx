import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function Default(props: {
  current?: boolean;
  day: string;
  weekday: string;
  date: string;
  country: string;
  title: string;
  [x: string]: any;
}) {
  const { current, day, weekday, date, country, title, ...rest } = props;
  
  const miniCardCurrent = useColorModeValue('brand.900', 'brand.400');
  const miniCardNonCurrent = useColorModeValue('transparent', 'navy.700');
  const boxCurrent = useColorModeValue('#32278D', 'navy.900');
  const boxNonCurrent = useColorModeValue('secondaryGray.300', 'navy.800');
  const textCurrent = useColorModeValue('white', 'white');
  const textNonCurrent = useColorModeValue('secondaryGray.900', 'white');
  const textSecondaryCurrent = useColorModeValue('white', 'white');
  const textSecondaryNonCurrent = useColorModeValue('secondaryGray.600', 'white');
  
  return (
    <Flex align='center' p='6px' borderRadius='20px' bg={current ? miniCardCurrent : miniCardNonCurrent} {...rest}>
      <Flex
        me='20px'
        direction='column'
        align='center'
        justify='center'
        w='77px'
        h='77px'
        borderRadius='15px'
        bg={current ? boxCurrent : boxNonCurrent}>
        <Text
          mb='2px'
          fontSize='md'
          fontWeight='500'
          color={current ? textSecondaryCurrent : textSecondaryNonCurrent}>
          {weekday}
        </Text>
        <Text lineHeight='100%' fontSize='34px' fontWeight='700' color={current ? textCurrent : textNonCurrent}>
          {day}
        </Text>
      </Flex>
      <Box>
        <Text fontSize='lg' fontWeight='700' color={current ? textCurrent : textNonCurrent}>
          {title}
        </Text>
        <Flex align='center'>
          <Text
            me='8px'
            fontSize='sm'
            fontWeight='500'
            color={current ? textSecondaryCurrent : textSecondaryNonCurrent}>
            {country}: {date}
          </Text>
          {/* <Icon
            as={IoMdTime}
            w='16px'
            h='16px'
            color={current ? textSecondaryCurrent : textSecondaryNonCurrent}
          /> */}
        </Flex>
      </Box>
      {/* <Button mt='auto' variant='no-hover' bg='transparent' p='0px' ms='auto'>
        <Icon as={BsArrowRight} color={current ? textCurrent : textNonCurrent} w='20px' h='20px' />
      </Button> */}
    </Flex>
  );
}
