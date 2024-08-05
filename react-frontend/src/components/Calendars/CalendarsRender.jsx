import React from 'react';
import { useParams } from 'react-router-dom';
import WebFall2024Ics from '../../assets/fall2024/webapp-fall-2024.ics';
import GCalOutlookFall2024Ics from '../../assets/fall2024/calendar-fall-2024.ics';
import WebSpring2025Ics from '../../assets/spring2025/webapp-spring-2025.ics';
import GCalOutlookSpring2025Ics from '../../assets/spring2025/calendar-spring-2025.ics';
import { CalendarCard } from '../CalendarCard';

const calendarsToRender = [
  {
    title: "Fall 2024",
    year: "2024",
    term: "Fall",
    webAppLink: WebFall2024Ics,
    gCalOutlookLink: GCalOutlookFall2024Ics,
  },
  {
    title: "Spring 2025",
    year: "2025",
    term: "Spring",
    webAppLink: WebSpring2025Ics,
    gCalOutlookLink: GCalOutlookSpring2025Ics,
  }
];

const calendarMap = {
  "fall2024": {
    title: "Fall 2024",
    year: "2024",
    term: "Fall",
    webAppLink: WebFall2024Ics,
    gCalOutlookLink: GCalOutlookFall2024Ics,
  },
  "spring2025": {
    title: "Spring 2025",
    year: "2025",
    term: "Spring",
    webAppLink: WebSpring2025Ics,
    gCalOutlookLink: GCalOutlookSpring2025Ics,
  }
};

const CalendarsRender = () => {
  const { term } = useParams();
  const calendar = calendarMap[term];
  console.log(calendar);
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