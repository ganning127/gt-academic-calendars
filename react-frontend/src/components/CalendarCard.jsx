
import {
  Box,
  Heading,
  Stack,
  Button,
  Text,
  HStack,
  Flex,
  IconButton,
  Select, Checkbox,
  Spacer
} from '@chakra-ui/react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import ical from "cal-parser";
import { createRef, useEffect, useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { format, isSameDay } from 'date-fns';
import { colorMapper } from '../lib/constants';

import "./CalendarCard.css";

const indexToMonth = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const CalendarCard = ({ title, webAppLink, gCalOutlookLink, year, term }, props) => {
  const [initialEvents, setInitialEvents] = useState([]);
  const [dateRange, setDateRange] = useState('');
  const [calView, setCalView] = useState('month');
  const [calendars, setCalendars] = useState([]);
  const [containsSummer, setContainsSummer] = useState(false);
  const ref = createRef();

  const displayRange = () => {
    if (!ref.current) {
      return;
    }
    const calendarInstance = ref.current.getInstance();
    let month = calendarInstance.store.getState("month").view.renderDate.d.getMonth();
    month = indexToMonth[month];

    let year = calendarInstance.store.getState("month").view.renderDate.d.getFullYear();

    setDateRange(`${month} ${year}`);
  };

  useEffect(() => {
    if (ref?.current) {
      const calendarInstance = ref?.current.getInstance();
      calendarInstance.changeView(calView, true);
      displayRange();
    }
  }, [calView]);

  useEffect(() => {
    async function handleElse() {
      let events = [];
      let theCalendars = [];

      for (let i = 0; i < webAppLink.length; i++) {
        if (webAppLink[i].title.toLowerCase().includes("summer")) {
          setContainsSummer(true);
          continue;
        }

        const resp = await fetch(webAppLink[i].link);
        const text = await resp.text();

        const parsed = ical.parseString(text);
        const calId = parsed.calendarData.name;

        let calEvents = handleSingle(parsed, calId);

        theCalendars.push({
          id: calId,
          name: calId,
          backgroundColor: colorMapper[calId].backgroundColor,
          borderColor: colorMapper[calId].borderColor
        });

        events = events.concat(calEvents);
      }

      setInitialEvents(events);
      setCalendars(theCalendars);
    }

    function handleSingle(parsed, calId = null) {
      let events = [];
      for (let i = 0; i < parsed.events.length; i++) {
        const event = parsed.events[i];
        const isAllDay = event["x-microsoft-cdo-alldayevent"]?.value === "TRUE" || event["x-microsoft-msncalendar-alldayevent"]?.value === "TRUE";

        let start = event.dtstart.value;
        let end = event.dtend.value;
        events.push({
          id: i,
          title: event.summary.value,
          start: start,
          end: end,
          isAllDay: isAllDay,
          body: event.description.value,
          category: isAllDay ? 'allday' : 'time',
          calendarId: calId ? calId : undefined
        });
      }

      return events;
    }

    // if webappLink is a string
    if (typeof webAppLink === 'string') {
      fetch(webAppLink)
        .then(r => r.text())
        .then(text => {
          const parsed = ical.parseString(text);
          let calId = parsed.calendarData.name;
          let events = handleSingle(parsed, calId);
          setInitialEvents(events);
          setCalendars([{
            id: calId,
            name: calId,
            backgroundColor: colorMapper[calId].backgroundColor,
            borderColor: colorMapper[calId].borderColor
          }]);
          displayRange();
        });
    } else {
      handleElse();
    }
  }, []);

  const gcalOutlookIsString = typeof gCalOutlookLink === 'string';
  // https://github.com/nhn/tui.calendar/blob/main/apps/react-calendar/docs/en/guide/getting-started.md

  return (
    <Stack p={4} rounded='md' border='1px solid #d3d3d3' spacing={4}>
      <Flex align='center'>
        <Box>
          <Heading
            fontSize="2xl"
            color="yellow.500"
          >
            {title}
          </Heading>
          {
            containsSummer &&
            <Text size='sm' color='gray.500'>
              *Summer calendars are not yet available in the combined view.
            </Text>
          }
        </Box>

        <Spacer />

        {
          gCalOutlookLink && gcalOutlookIsString &&
          <Button bg='yellow.500' _hover={{ bg: 'yellow.600' }} size='sm' color='white' onClick={() => window.open(gCalOutlookLink, '_blank')}>
            Download {term} {year} (ics)
          </Button>
        }
        {
          gCalOutlookLink && !gcalOutlookIsString &&
          <Stack direction='horizontal' flexWrap="wrap" justifyContent='flex-end'>
            {
              gCalOutlookLink.map((link, index) => {
                return (
                  <Button
                    key={index}
                    bg='yellow.500'
                    _hover={{ bg: 'yellow.600' }}
                    size='sm'
                    color='white'
                    onClick={() => window.open(link.link, '_blank')}
                  >
                    Download {link.title} (ics)
                  </Button>
                );
              })
            }
          </Stack>
        }

      </Flex >


      <Flex justify='space-between' align='center'>
        <Text fontSize='md' bg={colorMapper[`${term + year}`.toLowerCase()]?.backgroundColor} px={2} rounded='md'>
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

      <Stack spacing={5} direction='row'>
        {
          calendars.map((calendar, index) => {
            const nameMapper = {
              // All, Early, Late, May
              // 'All': 'All Summer Sessions',
              // 'Early': 'Early Short Summer',
              // 'Late': 'Late Short Summer',
              // 'May': 'Maymester',
              // 'Full': 'Full Summer Session'
            };
            return (
              <Checkbox key={index} mt={2} defaultChecked onChange={(e) => {
                const calendarInstance = ref?.current.getInstance();
                calendarInstance.setCalendarVisibility(calendar.id, e.target.checked);
              }}>
                <Text fontSize='sm' fontWeight='bold' color={calendar.borderColor}>
                  {nameMapper[calendar.name] || calendar.name}
                </Text>
              </Checkbox>
            );
          }
          )
        }

      </Stack>

      <Calendar
        height='750px'
        isReadOnly={true}
        events={initialEvents}
        useDetailPopup={true}
        useCreationPopup={false}
        day={{
          taskView: false,
        }}
        week={{
          taskView: false,
          narrowWeekend: true
        }}
        month={{
          narrowWeekend: true,
        }}
        scheduleView={['time']}
        ref={ref}
        timezone={{
          zones: [
            {
              timezoneName: 'America/New_York',
              displayLabel: 'Eastern Time',
              tooltip: 'Eastern Time'
            }
          ]
        }}
        calendars={calendars}

        template={{
          popupDetailDate: ({ isAllday, start, end }) => {
            const startDate = format(new Date(start), 'MM/dd/yyyy');
            const endDate = format(new Date(end), 'MM/dd/yyyy');
            const startTime = format(new Date(start), 'hh:mm a');
            const endTime = format(new Date(end), 'hh:mm a');

            if (isAllday) {
              return `${startDate} - ${endDate}`;
            } else if (isSameDay(new Date(start), new Date(end))) {
              return `${startDate} • ${startTime} - ${endTime}`;
            } else {
              return `${startDate} ${startTime} - ${endDate} ${endTime}`;
            }
          },

          time(model) {
            const { start, title } = model;

            let startTime = format(new Date(start), 'hh:mm a');
            if (startTime.charAt(0) === '0') {
              startTime = startTime.slice(1);
            }

            return `${startTime} ${title}`;
          },
        }}
      />


    </Stack >
  );
};;