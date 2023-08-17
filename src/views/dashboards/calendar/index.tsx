import {
  Box,
  Grid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import Card from 'components/card/Card';
import { calendarData } from './variables/calendar';
import EventCalendar from '../../../components/calendar/EventCalendar';
import Timeline from './components/Timeline';

export default function HolidayCalendar() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
      <Grid
          pt={{ base: '130px', md: '80px', xl: '80px' }}
          gridTemplateColumns={{ base: '2.4fr 1fr', lg: '1fr 1.83fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', lg: 'grid' }}
          >
          <Box gridArea='1 / 1 / 2 / 2'>
            <Box h='480px'>
              <Timeline mb='20px' />
            </Box>
          </Box>
          <Card gridArea='1 / 2 / 2 / 3' minH='680px'>
            <Text fontSize='2xl' fontWeight='700' color={textColor}>
            Calendar
            </Text>
            <Text fontSize='md' fontWeight='500' color='secondaryGray.600' mb='30px'>
            {new Date().getFullYear()} {/* Display the current year */}
            </Text>
            <EventCalendar calendarData={calendarData} /> {/* Use the updated EventCalendar */}
          </Card>
      </Grid>
  );
}
