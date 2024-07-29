
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

export const CalendarCard = ({ title, link, embedSrc }) => {
  return (
    <Stack fontSize="xl" p={4} rounded='md' border='1px solid #d3d3d3' spacing={4}>
      <Heading
        fontSize="3xl"
        color="yellow.500"
      >
        {title}
      </Heading>
      <Button colorScheme='yellow' onClick={() => window.open(link, '_blank')}>
        Download {title} (ics)
      </Button>
      <iframe src={embedSrc} style={{
        borderWidth: "0"
      }} width="100%" height="400px" frameborder="0" scrolling="no"></iframe>
    </Stack>
  );
};