import React from 'react';
import {
  ChakraProvider, Text,
  Link, theme,
  Container,
  Heading, SimpleGrid
} from '@chakra-ui/react';
import Fall2024Ics from './assets/fall-2024.ics';
import Spring2025Ics from './assets/spring-2025.ics';
import { CalendarCard } from './components/CalendarCard';

const calendarsToRender = [
  {
    title: "Fall 2024 Academic Calendar",
    year: "2024",
    term: "Fall",
    link: Fall2024Ics,
    calId: "OWVmMmZiNTI3ODE1YzI1ZjNlNmE1NGRmODVmZTgxYjNmM2JhZjNmYWZlOThiZWYxNDdjNTJmODM3ZjNiMjNjN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
  },
  {
    title: "Spring 2025 Academic Calendar",
    year: "2025",
    term: "Spring",
    link: Spring2025Ics,
    calId: "N2VlNWI2ZWY2ODYzZGIwNzg4ZGUxNTFjNjY4NDRlN2UyZTg5MDNiMjNjYmE2MDcwMjg5ZTIyYjNkNDE0N2Q3Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
  }
];

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" p={4}>
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
                link={calendar.link}
                year={calendar.year}
                term={calendar.term}
                embedSrc={`https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=1&showPrint=0&showCalendars=0&src=${calendar.calId}&color=%237CB342`}
              />
            ))
          }
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
}

export default App;
