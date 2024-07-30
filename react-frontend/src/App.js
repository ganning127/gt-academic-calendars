import React from 'react';
import {
  ChakraProvider, Text,
  Link, theme,
  Container,
  Heading, SimpleGrid
} from '@chakra-ui/react';
import { CalendarCard } from './components/CalendarCard';

import WebFall2024Ics from './assets/fall2024/webapp-fall-2024.ics';
import GCalOutlookFall2024Ics from './assets/fall2024/calendar-fall-2024.ics';
import WebSpring2025Ics from './assets/spring2025/webapp-spring-2025.ics';
import GCalOutlookSpring2025Ics from './assets/spring2025/calendar-spring-2025.ics';



const calendarsToRender = [
  {
    title: "Fall 2024 Academic Calendar",
    year: "2024",
    term: "Fall",
    webAppLink: WebFall2024Ics,
    gCalOutlookLink: GCalOutlookFall2024Ics,
  },
  {
    title: "Spring 2025 Academic Calendar",
    year: "2025",
    term: "Spring",
    webAppLink: WebSpring2025Ics,
    gCalOutlookLink: GCalOutlookSpring2025Ics,
  }
];

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.2xl" p={4}>
        <Heading>
          Georgia Tech Academic Calendars
        </Heading>
        <Text fontSize='md' mt={2} mb={4}>All data is pulled from the <Link color='yellow.600' href="https://registrar.gatech.edu/calendar/" target="_blank">registrar&apos;s academic calendar</Link>.
          Source code is available <Link color='yellow.600' href="https://github.com/ganning127/gt-academic-calendars" target="_blank">on my GitHub</Link>.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
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
      </Container>
    </ChakraProvider>
  );
}

export default App;
