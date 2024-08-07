import ical, { ICalCalendarMethod } from 'ical-generator';
import TSV from 'tsv';
import momment from 'moment';
import fs from 'fs';
import path from 'path';

const data = {
  "summer2024": {
    "tsv": "https://ro-blob.azureedge.net/ro-calendar-data/public/txt/202405.txt",
    "name": "summer-2024.ics"
  },
  "fall2024": {
    "tsv": "https://ro-blob.azureedge.net/ro-calendar-data/public/txt/202408.txt",
    "name": "fall-2024.ics"
  },
  "spring2025": {
    "tsv": "https://ro-blob.azureedge.net/ro-calendar-data/public/txt/202502.txt",
    "name": "spring-2025.ics"
  }
};

const toGenerateKey = "spring2025";
const FILE_TSV = data[toGenerateKey].tsv;
const FILE_NAME = data[toGenerateKey].name;
const DEST_DIR = `../react-frontend/src/assets/${toGenerateKey}`;

const WEBAPP_TAG = "webapp";
const GCAL_OUTLOOK_TAG = "calendar";


const GENERATE_KEYS = [
  {
    "type": WEBAPP_TAG,
  },
  {
    "type": GCAL_OUTLOOK_TAG,
  }
];

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
  return !value || value === 'null' || value === '';
};

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const getIcsFile = (dataObject, type, calendarName = "") => {
  const calendar = ical({
    name: calendarName || toGenerateKey
  }); // init inside function to avoid reusing the same object

  for (let i = 0; i < dataObject.length; i++) {
    const event = dataObject[i];

    if (!event.Title) {
      continue;
    }

    let startDate = momment(event.Date, 'MM/DD/YYYY').toDate();
    let endDate = momment(event.EndDate, 'MM/DD/YYYY').toDate();
    let isAllDay = valueIsBlank(event.Time) && valueIsBlank(event.EndTime);

    if (!valueIsBlank(event.Time)) {
      const startTime = event.Time.split(':');
      startDate.setHours(startTime[0]);
      startDate.setMinutes(startTime[1]);
    }
    if (!valueIsBlank(event.EndTime)) {
      const endTime = event.EndTime.split(':');
      endDate.setHours(endTime[0]);
      endDate.setMinutes(endTime[1]);
    }

    if (type === GCAL_OUTLOOK_TAG && isAllDay) {
      endDate = addDays(endDate, 1);
    }

    calendar.createEvent({
      start: startDate,
      end: endDate,
      allDay: isAllDay,
      summary: event.Title,
      description: !valueIsBlank(event.Body) ? event.Body : '',
      location: !valueIsBlank(event.Location) ? event.Location : '',
      url: !valueIsBlank(event.Link) ? event.Link : '',
      method: ICalCalendarMethod.PUBLISH,
    });
  }

  return calendar.toString();
};

const main = async () => {
  const tsvData = await getTsvFile();
  const obj = TSV.parse(tsvData);

  console.log("object", obj);


  if (toGenerateKey.includes("summer")) {
    // group objects into array based on TermPart key
    let grouped = obj.reduce((r, a) => {
      r[a.TermPart] = [...r[a.TermPart] || [], a];
      return r;
    }, {});

    console.log("grouped", Object.keys(grouped));
    for (let i = 0; i < GENERATE_KEYS.length; i++) {
      for (const key in grouped) {
        if (!key || key === 'undefined') {
          continue;
        }
        const gen = GENERATE_KEYS[i].type;
        const ics = getIcsFile(grouped[key], gen, key);

        makeDir(DEST_DIR);
        fs.writeFileSync(path.join(DEST_DIR, gen + '-' + key + '-' + FILE_NAME), ics);

        console.log(`Generated ${gen} ics file for ${key}`);
      }
    }
  } else {
    for (let i = 0; i < GENERATE_KEYS.length; i++) {
      const gen = GENERATE_KEYS[i].type;
      const ics = getIcsFile(obj, gen);

      makeDir(DEST_DIR);
      fs.writeFileSync(path.join(DEST_DIR, gen + '-' + FILE_NAME), ics);

      console.log(`Generated ${gen} ics file`);
    }
  }


};

main();