import WebFall2024Ics from '../assets/fall2024/webapp-fall-2024.ics';
import GCalOutlookFall2024Ics from '../assets/fall2024/calendar-fall-2024.ics';
import WebSpring2025Ics from '../assets/spring2025/webapp-spring-2025.ics';
import GCalOutlookSpring2025Ics from '../assets/spring2025/calendar-spring-2025.ics';
import WebSummer2024AllIcs from '../assets/summer2024/webapp-All-summer-2024.ics';
import GCalOutlookSummer2024AllIcs from '../assets/summer2024/calendar-All-summer-2024.ics';
import WebSummer2024EarlyIcs from '../assets/summer2024/webapp-Early-summer-2024.ics';
import GCalOutlookSummer2024EarlyIcs from '../assets/summer2024/calendar-Early-summer-2024.ics';
import WebSummer2024LateIcs from '../assets/summer2024/webapp-Late-summer-2024.ics';
import GCalOutlookSummer2024LateIcs from '../assets/summer2024/calendar-Late-summer-2024.ics';
import WebSummer2024MayIcs from '../assets/summer2024/webapp-May-summer-2024.ics';
import GCalOutlookSummer2024MayIcs from '../assets/summer2024/calendar-May-summer-2024.ics';
import WebSummer2024FullIcs from '../assets/summer2024/webapp-Full-summer-2024.ics';
import GCalOutlookSummer2024FullIcs from '../assets/summer2024/calendar-Full-summer-2024.ics';



export const WEBAPP_TAG = "webapp";
export const GCAL_OUTLOOK_TAG = "calendar";

export const CALENDARS_MAP = {
  "summer2024": {
    title: "Summer 2024",
    year: "2024",
    term: "Summer",
    webAppLink: [
      {
        title: "All",
        link: WebSummer2024AllIcs
      },
      {
        title: "Early",
        link: WebSummer2024EarlyIcs
      },
      {
        title: "Late",
        link: WebSummer2024LateIcs
      },
      {
        title: "May",
        link: WebSummer2024MayIcs
      },
      {
        title: "Full",
        link: WebSummer2024FullIcs
      }
    ],
    gCalOutlookLink: [
      {
        title: "All",
        link: GCalOutlookSummer2024AllIcs
      },
      {
        title: "Early",
        link: GCalOutlookSummer2024EarlyIcs
      },
      {
        title: "Late",
        link: GCalOutlookSummer2024LateIcs
      },
      {
        title: "May",
        link: GCalOutlookSummer2024MayIcs
      },
      {
        title: "Full",
        link: GCalOutlookSummer2024FullIcs
      }
    ],
    show: false
  },
  "fall2024": {
    title: "Fall 2024",
    year: "2024",
    term: "Fall",
    webAppLink: WebFall2024Ics,
    gCalOutlookLink: GCalOutlookFall2024Ics,
    show: true
  },
  "spring2025": {
    title: "Spring 2025",
    year: "2025",
    term: "Spring",
    webAppLink: WebSpring2025Ics,
    gCalOutlookLink: GCalOutlookSpring2025Ics,
    show: true
  }
};

export const ACTIVE_CALENDARS_MAP = Object.keys(CALENDARS_MAP).reduce((acc, key) => {
  if (CALENDARS_MAP[key].show) {
    acc[key] = CALENDARS_MAP[key];
  }
  return acc;
}, {});


export const colorMapper = {

  'All': {
    backgroundColor: '#FED7D7',
    borderColor: '#E53E3E'
  },
  'Full': {
    backgroundColor: '#a8edd4',
    borderColor: '#0c704c',
  },
  'Early': {
    backgroundColor: '#FEEBC8',
    borderColor: '#fcc560'
  },
  'Late': {
    backgroundColor: '#BEE3F8',
    borderColor: '#4299E1',
  },
  'May': {
    backgroundColor: '#E9D8FD',
    borderColor: '#9F7AEA',
  },
  'summer2024': {
    backgroundColor: '#FEEBC8',
    borderColor: '#ED893'
  },
  'fall2024': {
    backgroundColor: '#BEE3F8',
    borderColor: '#4299E1',
  },
  'spring2025': {
    backgroundColor: '#E9D8FD',
    borderColor: '#9F7AEA',
  }
};
export const calNameIsSummer = (name) => {
  const summerContains = ["All", "Early", "Late", "May"];
  return summerContains.some((term) => name.toLowerCase().includes(term.toLowerCase()));
};