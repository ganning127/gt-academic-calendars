
import {
  Heading,
  Stack,
  Button
} from '@chakra-ui/react';

export const CalendarCard = ({ title, link, embedSrc, year, term }) => {
  return (
    <Stack fontSize="xl" p={4} rounded='md' border='1px solid #d3d3d3' spacing={4}>
      <Heading
        fontSize="3xl"
        color="yellow.500"
      >
        {title}
      </Heading>
      <Button colorScheme='yellow' onClick={() => window.open(link, '_blank')}>
        Download {term} {year} (ics)
      </Button>
      <iframe src={embedSrc} style={{
        borderWidth: "0"
      }} width="100%" height="400px" scrolling="no"></iframe>
    </Stack>
  );
};