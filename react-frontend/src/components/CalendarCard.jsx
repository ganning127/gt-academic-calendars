
import {
  Heading,
  Stack,
  Button,
  Text,
  HStack,
  Flex,
  IconButton,
  Select
} from '@chakra-ui/react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import ical from "cal-parser";
import { createRef, useEffect, useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';


export const CalendarCard = ({ title, webAppLink, gCalOutlookLink, year, term }) => {
  const [initialEvents, setInitialEvents] = useState([]);
  const [dateRange, setDateRange] = useState('');
  const [calView, setCalView] = useState('month');
  const ref = createRef();

  const displayRange = () => {
    if (!ref.current) {
      return;
    }
    const calendarInstance = ref.current.getInstance();
    const range = calendarInstance.getDateRangeStart();
    const rangeEnd = calendarInstance.getDateRangeEnd();

    console.log("calendarInstance", calendarInstance);

    // format as MM/DD/YYYY
    const formattedRange = `${range.getMonth() + 1}/${range.getDate()}/${range.getFullYear()} - ${rangeEnd.getMonth() + 1}/${rangeEnd.getDate()}/${rangeEnd.getFullYear()}`;


    setDateRange(formattedRange);
  };

  useEffect(() => {
    console.log("calView", calView);
    if (ref?.current) {
      const calendarInstance = ref?.current.getInstance();
      calendarInstance.changeView(calView, true);
      displayRange();
    }
  }, [calView]);

  useEffect(() => {
    fetch(webAppLink)
      .then(r => r.text())
      .then(text => {
        const parsed = ical.parseString(text);

        let events = [];

        for (let i = 0; i < parsed.events.length; i++) {
          const event = parsed.events[i];
          const isAllDay = event["x-microsoft-cdo-alldayevent"]?.value === "TRUE" || event["x-microsoft-msncalendar-alldayevent"]?.value === "TRUE";
          events.push({
            id: i,
            title: event.summary.value,
            start: event.dtstart.value,
            end: event.dtend.value,
            isAllDay: isAllDay,
            body: event.description.value,
            calendarId: '1',
            category: isAllDay ? 'allday' : 'time'
          });
        }

        setInitialEvents(events);
        displayRange();
      });
  }, []);

  // https://github.com/nhn/tui.calendar/blob/main/apps/react-calendar/docs/en/guide/getting-started.md

  return (
    <Stack fontSize="xl" p={4} rounded='md' border='1px solid #d3d3d3' spacing={4}>
      <Flex justify='space-between' align='center'>
        <Heading
          fontSize="3xl"
          color="yellow.500"
        >
          {title}
        </Heading>
        <Button colorScheme='yellow' onClick={() => window.open(gCalOutlookLink, '_blank')}>
          Download {term} {year} (ics)
        </Button>
      </Flex>


      <Flex justify='space-between'>
        <Text>
          {
            dateRange
          }
        </Text>

        <HStack gap={1}>


          <IconButton
            variant='outline'
            size='sm'
            icon={<ArrowBackIcon />}
            onClick={() => {
              const calendarInstance = ref.current.getInstance();
              calendarInstance.prev();
              displayRange();
            }}>
            Previous
          </IconButton>

          <IconButton
            variant='outline'
            size='sm'
            icon={<ArrowForwardIcon />}
            onClick={() => {
              const calendarInstance = ref.current.getInstance();
              calendarInstance.next();
              displayRange();
            }}>
            Next
          </IconButton>

          <Button
            variant='outline'
            size='sm'
            px={5}
            onClick={() => {
              const calendarInstance = ref.current.getInstance();
              calendarInstance.today();
              displayRange();
            }}
          >
            Today
          </Button>


          <Select
            size='sm'
            rounded='md'
            onChange={(e) => { setCalView(e.target.value); }}
            value={calView}
          >
            <option value='week'>Week</option>
            <option value='month'>Month</option>
            <option value='day'>Day</option>
          </Select>

        </HStack>
      </Flex>

      <Calendar
        isReadOnly={true}
        events={initialEvents}
        useDetailPopup={true}
        taskView={false}
        scheduleView={['time']}
        ref={ref}
      />


    </Stack>
  );
};