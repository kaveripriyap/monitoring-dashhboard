import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { parse, format } from 'date-fns';

function EventCalendar(props: {
  calendarData: {
    name: string;
    date: string;
    country: string;
  }[];
}) {
  const { calendarData } = props;

  const getBackgroundColor = (country: string): string => {
    switch (country) {
      case 'JP':
        return '#7551FF'; // Example color for Japan
      case 'TW':
        return '#01B574'; // Example color for Taiwan
      case 'HK':
        return '#FFB547'; // Example color for Hong Kong
      case 'SG':
        return '#32278D'; // Example color for Singapore
      default:
        return '#7551FF'; // Default color
    }
  };

  const fullCalendarEvents = calendarData.map(event => ({
    title: event.name,
    date: format(parse(event.date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd'),
    backgroundColor: getBackgroundColor(event.country),
    borderColor: event.country === 'JP' ? 'transparent' : '#000',
    className: event.country.toLowerCase(),
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
      }}
      initialView='dayGridMonth'
      contentHeight='auto'
      events={fullCalendarEvents}
      // Set initialDate to the beginning of the current month
      initialDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
      editable={true}
      height='100%'
    />
  );
}

export default EventCalendar;
