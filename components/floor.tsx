import { addMinutes } from "date-fns";
import { Floor, Room } from "../lib/rooms";
import { RoomInfo } from "./room-info";

function formatFloor(floor: number) {
  if (floor === 0) {
    return "RDC";
  } else if (floor === 1) {
    return "1ER";
  } else {
    return floor + "EME";
  }
}

const createDate = (minutes: number) => addMinutes(new Date(), minutes);

const testRoomAvailable: Room = {
  events: [
    {
      name: "test name",
      description: "test description",
      location: "somewhere",
      time: {
        start: createDate(-50).getTime(),
        end: createDate(-10).getTime(),
      },
    },
  ],
  floor: 1,
  id: "N99",
};

const testRoomUnavailableFor: Room = {
  events: [
    {
      name: "test name",
      description: "test description",
      location: "somewhere",
      time: {
        start: createDate(-10).getTime(),
        end: createDate(1).getTime(),
      },
    },
  ],
  floor: 1,
  id: "N98",
};

const testRoomAvailableFor: Room = {
  events: [
    // {
    //   name: "test name 2",
    //   description: "test description 2",
    //   location: "somewhere 2",
    //   time: {
    //     start: createDate(-10).getTime(),
    //     end: createDate(1).getTime(),
    //   },
    // },
    {
      name: "test name",
      description: "test description",
      location: "somewhere",
      time: {
        start: createDate(-2).getTime(),
        end: createDate(50).getTime(),
      },
    },
  ],
  floor: 1,
  id: "N97",
};

export function Floor({ floor }: { floor: Floor }) {
  return (
    <div className="mt-2">
      <h3 className="uppercase text-gray-400 font-semibold mb-3">
        {formatFloor(floor.level)}
      </h3>
      {floor.rooms.map((room) => (
        <RoomInfo key={room.id} room={room} />
      ))}

      {/* <RoomInfo room={testRoomAvailable} />
      <RoomInfo room={testRoomAvailableFor} />
      <RoomInfo room={testRoomUnavailableFor} /> */}
    </div>
  );
}
