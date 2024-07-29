import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
  Heading,
  Stack,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Fall2024Ics from './assets/fall-2024.ics';
import Spring2025Ics from './assets/spring-2025.ics';
import { CalendarCard } from './components/CalendarCard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" p={4}>

        <Heading>
          Georgia Tech Academic Calendars
        </Heading>
        <Text fontSize='md' mt={2} mb={4}>All data is pulled from <Link color='yellow.600' href="https://registrar.gatech.edu/calendar/">https://registrar.gatech.edu/calendar</Link>.
          All source code is available at <Link color='yellow.600' href="">here</Link>.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <CalendarCard
            title="Fall 2024 Academic Calendar"
            link={Fall2024Ics}
            embedSrc="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=1&showPrint=0&showCalendars=0&src=NzFlOTJhMGMwYTc4MjQ3ZGRhODc2ODE4MjNlNDNiNjNiNDkxYzE3OGQ4YjQ5OWQ0MGRiODRlOTg4YWM4ZjZmZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342"
          />

          <CalendarCard
            title="Spring 2025 Academic Calendar"
            link={Spring2025Ics}
            embedSrc="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=1&showPrint=0&showCalendars=0&src=N2YwYjQ0ZTM3MDJmZDJmYTVmNGFjZjUxMzRmZjNkNmFmOWRiMjBjNjlhOWNlYjRjMGMwMDM5NTVkODAzZDAyNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342"
          />
        </SimpleGrid>

      </Container>
    </ChakraProvider>
  );
}

export default App;
