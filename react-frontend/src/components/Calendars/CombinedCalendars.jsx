import { CalendarCard } from '../CalendarCard';
import WebFall2024Ics from '../../assets/fall2024/webapp-fall-2024.ics';
import WebSpring2025Ics from '../../assets/spring2025/webapp-spring-2025.ics';

const CombinedCalendars = () => {
  return (
    <>
      <CalendarCard
        title="Combined (fall 2024 + spring 2025)"
        webAppLink={[WebFall2024Ics, WebSpring2025Ics]}
      />
    </>
  );
};

export default CombinedCalendars;