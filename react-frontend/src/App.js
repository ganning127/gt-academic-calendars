import React from 'react';
import {
  Container,
  Text, UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { NavBar } from './components/NavBar';
import { Link } from './components/Link';
import Main from './components/Main';



function App() {
  return (
    <>
      <NavBar />

      <Container maxW="container.xl" p={4} mx='auto'>
        <UnorderedList ml={8} mb={4}>
          <ListItem>
            <Text>
              <Text as='span' fontWeight='bold'>What: </Text> Easy to view and export academic calendar for Georgia Tech. <Text as='span' textDecor='underline'>Fall 2024 and Spring 2025 are currently available.</Text> All times shown on this site are in ET, but calendar exports (.ics) will adapt to your calendar&apos;s timezone.
            </Text>
            <UnorderedList ml={8}>
              <ListItem>
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd72IJmpjLWFZkc9sb55qRx3X4q5hWoDW8UpmF9RAdqb3oQ2g/viewform">Get notified when a new academic calendar is published.</Link>
              </ListItem>

              <ListItem>
                <Text>Any questions? Please email {" "}
                  <Link href="mailto:ganning.xu@gatech.edu">
                    ganning.xu@gatech.edu
                  </Link>.
                </Text>
              </ListItem>
            </UnorderedList>
          </ListItem>

          <ListItem>
            <Text>
              <Text as='span' fontWeight='bold'>Why: </Text> A better and more intuitive way to browse the registrar&apos;s academic calendar.
            </Text>
          </ListItem>

          <ListItem>
            <Text>
              <Text as='span' fontWeight='bold'>How: </Text> All data is pulled from the <Link href="https://registrar.gatech.edu/calendar/" >registrar&apos;s academic calendar</Link>.           Source code is available <Link href="https://github.com/ganning127/gt-academic-calendars">on my GitHub</Link>.

            </Text>
          </ListItem>
        </UnorderedList>

        <Main />


      </Container>
    </>
  );
}

export default App;
