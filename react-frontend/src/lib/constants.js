import WebFall2024Ics from '../assets/fall2024/webapp-fall-2024.ics';
import GCalOutlookFall2024Ics from '../assets/fall2024/calendar-fall-2024.ics';
import WebSpring2025Ics from '../assets/spring2025/webapp-spring-2025.ics';
import GCalOutlookSpring2025Ics from '../assets/spring2025/calendar-spring-2025.ics';

export const WEBAPP_TAG = "webapp";
export const GCAL_OUTLOOK_TAG = "calendar";


export const CALENDARS_MAP = {
    "fall2024": {
        title: "Fall 2024",
        year: "2024",
        term: "Fall",
        webAppLink: WebFall2024Ics,
        gCalOutlookLink: GCalOutlookFall2024Ics,
    },
    "spring2025": {
        title: "Spring 2025",
        year: "2025",
        term: "Spring",
        webAppLink: WebSpring2025Ics,
        gCalOutlookLink: GCalOutlookSpring2025Ics,
    }
};