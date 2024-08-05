import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CalendarsRender from './Calendars/CalendarsRender';
import CombinedCalendars from './Calendars/CombinedCalendars';


const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendars/:term" element={<CalendarsRender />} />
      <Route path="/combined" element={<CombinedCalendars />} />
    </Routes>
  );
};

export default Main;