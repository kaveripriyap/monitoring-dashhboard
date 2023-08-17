import React, { useState } from 'react';
import { Button, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import TimelineItem from 'components/dataDisplay/TimelineItem';
import { calendarData } from '../variables/calendar';
import HolidayCalendarPopup from './HolidayCalendarPopup';

export default function Default(props: { [x: string]: any }) {
  const { ...rest } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);

  // Function to get the weekday
  const getWeekday = (dateString: string): string => {
    const date = new Date(dateString);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
  };

  // Get the current date
  const currentDate = new Date();

  // Filter holidays within the next 7 days
  const upcomingHolidays = calendarData.filter(event => {
    const [day, month, year] = event.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day); // Month is zero-based
    const timeDifference = eventDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    return daysDifference >= 0 && daysDifference <= 7;
  });

  return (
    <Card {...rest}>
      <Text fontSize='2xl' fontWeight='700' color={textColor}>
        Upcoming Holidays
      </Text>
      <Text fontSize='md' fontWeight='500' color='secondaryGray.600' mb='30px'>
        In the next week
      </Text>
      {/* Update timeline items with upcoming holidays */}
      {upcomingHolidays.map((event, index) => (
        <TimelineItem
          key={index}
          mb='16px'
          title={event.name}
          day={event.date.substring(0, 2)}
          date={event.date}
          weekday={getWeekday(event.date)}
          country={event.country}
        />
      ))}
      {/* <Button onClick={() => setIsCalendarPopupOpen(true)}>See All</Button>
      <HolidayCalendarPopup
        isOpen={isCalendarPopupOpen}
        onClose={() => setIsCalendarPopupOpen(false)}
        calendarData={calendarData} // Add this line
        /> */}
    </Card>
  );
}
