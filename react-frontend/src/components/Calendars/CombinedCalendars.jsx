import { CalendarCard } from '../CalendarCard';
import { CALENDARS_MAP } from '../../lib/constants';

const CombinedCalendars = () => {
  let webAppLinks = [];
  for (const key in CALENDARS_MAP) {
    webAppLinks.push(CALENDARS_MAP[key].webAppLink);
  }

  return (
    <>
      <CalendarCard
        title="Combined (fall 2024 + spring 2025)"
        webAppLink={webAppLinks}
      />
    </>
  );
};

export default CombinedCalendars;