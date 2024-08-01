import React from 'react';
import {
  ChakraProvider, Text,
  Link, theme,
  Container,
  Heading, SimpleGrid,
  UnorderedList,
  ListItem,
  Divider,
  Box
} from '@chakra-ui/react';
import { CalendarCard } from './components/CalendarCard';

import WebFall2024Ics from './assets/fall2024/webapp-fall-2024.ics';
import GCalOutlookFall2024Ics from './assets/fall2024/calendar-fall-2024.ics';
import WebSpring2025Ics from './assets/spring2025/webapp-spring-2025.ics';
import GCalOutlookSpring2025Ics from './assets/spring2025/calendar-spring-2025.ics';

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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.2xl" p={4} mx='auto'>
        <Heading>
          Georgia Tech Academic Calendars
        </Heading>
        <Text fontSize='md' mt={2} mb={4}>
          <UnorderedList ml={8}>
            <ListItem>
              <Text>
                <Text as='span' fontWeight='bold'>What: </Text> Easy to view and export academic calendar for Georgia Tech. <Text as='span' textDecor='underline'>Fall 2024 and Spring 2025 are currently available.</Text> All times shown on this site are in ET, but calendar exports (.ics) will adapt to your calendar&apos;s timezone.
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                <Text as='span' fontWeight='bold'>Why: </Text> The academic calendar on the registrar's page is difficult to read and export.
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                <Text as='span' fontWeight='bold'>How: </Text> All data is pulled from the <Link color='yellow.600' href="https://registrar.gatech.edu/calendar/" target="_blank">registrar&apos;s academic calendar</Link>.           Source code is available <Link color='yellow.600' href="https://github.com/ganning127/gt-academic-calendars" target="_blank">on my GitHub</Link>.

              </Text>
            </ListItem>

          </UnorderedList>

        </Text>


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


        <CalendarCard
          title="Combined (fall 2024 + spring 2025)"
          webAppLink={[WebFall2024Ics, WebSpring2025Ics]}
        />


      </Container>
    </ChakraProvider>
  );
}

export default App;
