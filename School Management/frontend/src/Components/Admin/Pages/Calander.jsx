import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box } from '@chakra-ui/react';

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2024-02-27' },
    { title: 'Event 2', date: '2024-02-28' },
    // Add more events as needed
  ]);

  const handleEventClick = (info) => {
    alert(`Event: ${info.event.title}`);
  };

  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </Box>
  );
};

export default Calendar;
