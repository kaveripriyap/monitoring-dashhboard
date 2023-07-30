import { AvatarGroup, Box, Button, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { MdOutlineWarningAmber, MdOutlineErrorOutline, MdOutlineCheckCircle } from 'react-icons/md';
import Card from '../../../../components/card/Card';

interface ServerCardProps {
  name: string;
  error: string;
  time: string;
  status: string;
}

const ServerCard: React.FC<ServerCardProps> = ({ name, error, time, status }) => {
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBid = useColorModeValue('black.500', 'white');
  let icon;
  let iconColor;

  if (status === 'Working') {
    icon = MdOutlineCheckCircle;
    iconColor = 'green.400';
  } else if (status === 'Warning') {
    icon = MdOutlineWarningAmber;
    iconColor = 'orange.400';
  } else if (status === 'Error') {
    icon = MdOutlineErrorOutline;
    iconColor = 'red.400';
  }

  return (
    <Card p='20px'>
      <Flex direction={{ base: 'column' }} justify='center'>
        <Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
		  <Icon
            position='absolute'
            bg='white'
            _hover={{ bg: 'whiteAlpha.900' }}
            _active={{ bg: 'white' }}
            _focus={{ bg: 'white' }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            minH='26px'
            h='20px'
            color={iconColor}
            as={icon}
          />
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row'
            }}
            mb='auto'
          >
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: 'xl',
                  md: 'lg',
                  lg: 'lg',
                  xl: 'lg',
                  '2xl': 'md',
                  '3xl': 'lg'
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'
              >
                {name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: 'sm'
                }}
                fontWeight='400'
                me='14px'
              >
                {time}
              </Text>
            </Flex>
            <AvatarGroup
              max={3}
              color={textColorBid}
              size='sm'
              mt={{
                base: '0px',
                md: '10px',
                lg: '0px',
                xl: '10px',
                '2xl': '0px'
              }}
              fontSize='12px'
            >
            </AvatarGroup>
          </Flex>
          <Flex
            justify='space-between'
            align={{
              base: 'center',
              md: 'start',
              lg: 'center',
              xl: 'start',
              '2xl': 'center'
            }}
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row'
            }}
            mt='25px'
          >
            <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              Error: {error}
            </Text>
            <Link
              mt={{
                base: '0px',
                md: '10px',
                lg: '0px',
                xl: '10px',
                '2xl': '0px'
              }}
            >
              <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'
              >
                Check Issue
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ServerCard;
