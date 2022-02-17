import { isAfter, isBefore, isSameDay, isWithinInterval } from "date-fns";

type Building = "NDC" | "NDL";

interface TimeDuration {
  start: number;
  end: number;
}

export interface Event {
  name: string;
  location: string;
  description: string;
  time: TimeDuration;
}

export interface Room {
  id: string;
  floor: number;
  events: Event[];
}

export interface Floor {
  level: number;
  rooms: Room[];
}

export enum RoomStatus {
  NOT_FREE,
  FREE_FOR,
  FREE,
}

export type RoomStatusInfo = { status: RoomStatus; currentEvent: Event | null };

// Sépare les salles en 2 catégories: dispo et non dispo
export function filterRoomsByAvailability(rooms: Room[]): {
  free: Room[];
  notFree: Room[];
} {
  const now = new Date().getTime();
  // const now = new Date().getTime() + 1000 * 60 * 60 * 9;
  const free: Room[] = [];
  const notFree: Room[] = [];
  if (rooms.length === 0) {
    return { free, notFree };
  }
  rooms.forEach((r) => {
    let isFree = true;
    r.events.forEach((e) => {
      if (now > e.time.start && now < e.time.end) {
        isFree = false;
        notFree.push(r);
      }
    });
    if (isFree) {
      free.push(r);
    }
  });
  return { free, notFree };
}

export function buildFloors(rooms: Room[]): Floor[] {
  const floors: { [floor: string]: Room[] } = {};
  const floorsList: Floor[] = [];
  rooms.forEach((r) => {
    if (floors[r.floor] == null) floors[r.floor] = [];
    floors[r.floor].push(r);
  });
  Object.keys(floors).forEach((k) => {
    floorsList.push({
      level: parseInt(k, 10),
      rooms: floors[k],
    });
  });
  return floorsList;
}

export function roomStatus(date: Date, events: Event[]): RoomStatusInfo {
  const filtered = events
    .filter((e) => {
      const startTime = new Date(e.time.start);
      return isSameDay(date, startTime) && isAfter(startTime, date);
    })
    .sort((a, b) => (a.time.start > b.time.start ? 1 : -1));

  for (const event of filtered) {
    const start = new Date(event.time.start);
    const end = new Date(event.time.end);
    if (isWithinInterval(date, { start, end })) {
      return { status: RoomStatus.NOT_FREE, currentEvent: event };
    }

    if (isBefore(date, start)) {
      return { status: RoomStatus.FREE_FOR, currentEvent: event };
    }
  }
  return { status: RoomStatus.FREE, currentEvent: null };
}
