import ical, { ICalCalendarMethod } from 'ical-generator';
import TSV from 'tsv';
import momment from 'moment';
import fs from 'fs';
import path from 'path';

const FALL_2024_TSV = "https://ro-blob.azureedge.net/ro-calendar-data/public/txt/202408.txt";
const FALL_2024_NAME = "fall-2024.ics";
const SPRING_2025_TSV = "https://ro-blob.azureedge.net/ro-calendar-data/public/txt/202502.txt";
const SPRING_2025_NAME = "spring-2025.ics";

const FILE_TSV = FALL_2024_TSV;
const FILE_NAME = FALL_2024_NAME;
const TAG = "fall2024";


const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getTsvFile = async () => {
  const response = await fetch(FILE_TSV);
  const data = await response.text();
  return data;
};
const valueIsBlank = (value) => {
  return value === 'null' || value === '';
};
const getIcsFile = (dataObject, type) => {
  const calendar = ical();

  for (let i = 0; i < dataObject.length; i++) {
    const event = dataObject[i];

    if (!event.Title) {
      continue;
    }

    const startDate = momment(event.Date, 'MM/DD/YYYY').toDate();
    const endDate = momment(event.EndDate, 'MM/DD/YYYY').toDate();

    const isAllDay = valueIsBlank(event.Time) && valueIsBlank(event.EndTime);

    // Handle Time and EndTime
    if (event.Time && event.Time !== 'null') {
      const startTime = event.Time.split(':');
      startDate.setHours(startTime[0]);
      startDate.setMinutes(startTime[1]);
    }
    if (event.EndTime && event.EndTime !== 'null') {
      const endTime = event.EndTime.split(':');
      endDate.setHours(endTime[0]);
      endDate.setMinutes(endTime[1]);
    }


    calendar.createEvent({
      start: startDate,
      end: (type === 'gcal_outlook' && isAllDay) ? addDays(endDate, 1) : endDate,
      allDay: isAllDay,
      summary: event.Title,
      description: event.Body === 'null' ? '' : event.Body,
      location: event.EventLocation === 'null' ? '' : event.EventLocation,
      url: event.Link === 'null' ? '' : event.Link,
      method: ICalCalendarMethod.PUBLISH
    });
  }

  return calendar.toString();
};

const DEST_DIR = `../react-frontend/src/assets/${TAG}`;

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const main = async () => {
  const tsvData = await getTsvFile();
  const obj = TSV.parse(tsvData);

  const generators = [
    {
      "type": "webapp",
    },
    {
      "type": "gcal_outlook",
    }
  ];

  for (let i = 0; i < generators.length; i++) {
    const gen = generators[i].type;
    const ics = getIcsFile(obj, gen);

    makeDir(DEST_DIR);



    fs.writeFileSync(DEST_DIR + '/' + gen + FILE_NAME, ics);



  }
};

main();