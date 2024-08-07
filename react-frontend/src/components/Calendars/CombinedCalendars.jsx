import { CalendarCard } from '../CalendarCard';
import { ACTIVE_CALENDARS_MAP } from '../../lib/constants';

const CombinedCalendars = () => {
  let webAppLinks = [];
  let titles = [];
  for (const key in ACTIVE_CALENDARS_MAP) {
    webAppLinks.push({
      title: ACTIVE_CALENDARS_MAP[key].term + ' ' + ACTIVE_CALENDARS_MAP[key].year,
      link: ACTIVE_CALENDARS_MAP[key].webAppLink
    });
    titles.push(ACTIVE_CALENDARS_MAP[key].term + ' ' + ACTIVE_CALENDARS_MAP[key].year);
  }

  return (
    <>
      <CalendarCard
        title={`Combined Calendars (${titles.join(', ')})`}
        webAppLink={webAppLinks}
      />
    </>
  );
};

export default CombinedCalendars;