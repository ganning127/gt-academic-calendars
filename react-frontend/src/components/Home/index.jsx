import { SimpleGrid } from '@chakra-ui/react';
import { CalendarCard } from '../CalendarCard';
import WebFall2024Ics from '../../assets/fall2024/webapp-fall-2024.ics';
import GCalOutlookFall2024Ics from '../../assets/fall2024/calendar-fall-2024.ics';
import WebSpring2025Ics from '../../assets/spring2025/webapp-spring-2025.ics';
import GCalOutlookSpring2025Ics from '../../assets/spring2025/calendar-spring-2025.ics';

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

const Home = () => {
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={5}>
        {
          calendarsToRender.map((calendar) => (
            <CalendarCard
              title={calendar.title}
              key={calendar.title}
              webAppLink={calendar.webAppLink}
              gCalOutlookLink={calendar.gCalOutlookLink}
              year={calendar.year}
              term={calendar.term}
            />
          ))
        }
      </SimpleGrid>
    </>
  );
};

export default Home;