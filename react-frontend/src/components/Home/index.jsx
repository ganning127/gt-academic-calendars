import { SimpleGrid } from '@chakra-ui/react';
import { CalendarCard } from '../CalendarCard';
import { ACTIVE_CALENDARS_MAP } from '../../lib/constants';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    document.title = 'GT Academic Calendars';
  }, []);

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={5}>
        {
          Object.keys(ACTIVE_CALENDARS_MAP).map((calendarKey) => {
            const calendar = ACTIVE_CALENDARS_MAP[calendarKey];
            return (
              <CalendarCard
                key={calendar.title}
                title={calendar.title}
                webAppLink={calendar.webAppLink}
                gCalOutlookLink={calendar.gCalOutlookLink}
                year={calendar.year}
                term={calendar.term}
              />
            );
          })
        }
      </SimpleGrid>
    </>
  );
};

export default Home;