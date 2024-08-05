import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import CalendarsRender from './Calendars/CalendarsRender';
import CombinedCalendars from './Calendars/CombinedCalendars';


const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendars/:term" element={<CalendarsRender />} />
      <Route path="/calendars/combined" element={<CombinedCalendars />} />
      <Route path="/404" element={<div>Calendar not found.</div>} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default Main;