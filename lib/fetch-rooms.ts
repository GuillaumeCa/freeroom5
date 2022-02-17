import { addWeeks, isWithinInterval, startOfDay } from "date-fns";
import fs from "fs";
import ICAL from "ical.js";
import { Event, Room } from "./rooms";

interface RoomConfig {
  floor: number;
  urlId: string;
}

export type RoomConfigMap = {
  [roomID: string]: RoomConfig;
};

function buildCalendarUrl(roomID: string, urlID: string): string {
  return `http://planning.isep.fr/Telechargements/ical/EdT_${roomID}.ics?version=13.0.2.1&idICal=${urlID}&param=643d5b312e2e36325d2666683d3126663d31`;
}

export function fetchRoomMock(config: RoomConfigMap): Promise<Room[]> {
  return Promise.all(
    Object.entries(config).map(([room, conf]) => {
      const filePath = "cached/room_" + room + ".txt";
      if (!fs.existsSync(filePath)) {
        return fetch(buildCalendarUrl(room, conf.urlId))
          .then((res) => res.text())
          .then((data) => {
            fs.writeFileSync(filePath, data);
            return {
              id: room,
              floor: conf.floor,
              events: extractCalEvents(data),
            };
          });
      }

      const data = fs.readFileSync(filePath).toString();
      return Promise.resolve({
        id: room,
        floor: conf.floor,
        events: extractCalEvents(data),
      });
    })
  );
}

export function fetchRooms(config: RoomConfigMap): Promise<Room[]> {
  return Promise.all(
    Object.entries(config).map(([roomID, roomConfig]) => {
      console.log("Fetching calendar for room: " + roomID);
      return fetch(buildCalendarUrl(roomID, roomConfig.urlId))
        .then((res) => res.text())
        .then((data) => ({
          id: roomID,
          floor: roomConfig.floor,
          events: extractCalEvents(data),
        }));
    })
  );
}

function extractCalEvents(rawData: string): Event[] {
  const calData = ICAL.parse(rawData);
  return new ICAL.Component(calData)
    .getAllSubcomponents("vevent")
    .map((subcomp) => new ICAL.Event(subcomp))
    .filter((e) => {
      const isValidEvent =
        e.summary !== "Férié" || !e.summary.startsWith("cours annulé");

      const startDate = e.startDate.toJSDate();
      const nextWeek = addWeeks(startOfDay(new Date()), 1);
      const isWithingNextWeek = isWithinInterval(startDate, {
        start: new Date(),
        end: nextWeek,
      });

      return isValidEvent && isWithingNextWeek;
    })
    .map((event) => {
      return {
        name: event.summary,
        description: event.description,
        location: event.location,
        time: {
          start: event.startDate.toUnixTime() * 1000,
          end: event.endDate.toUnixTime() * 1000,
        },
      };
    });
}
