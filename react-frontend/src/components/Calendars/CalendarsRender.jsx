import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarCard } from '../CalendarCard';
import { ACTIVE_CALENDARS_MAP } from '../../lib/constants';


const CalendarsRender = () => {
  const { term } = useParams();
  useEffect(() => {
    document.title = `${term} | GT Academic Calendars`;

  }, [term]);

  if (!ACTIVE_CALENDARS_MAP[term]) {
    return <div>Calendar not found.</div>;
  }
  const calendar = ACTIVE_CALENDARS_MAP[term];

  return (
    <>
      <CalendarCard
        key={calendar.title}
        title={calendar.title}
        webAppLink={calendar.webAppLink}
        gCalOutlookLink={calendar.gCalOutlookLink}
        year={calendar.year}
        term={calendar.term}
      />
    </>
  );

};

export default CalendarsRender;