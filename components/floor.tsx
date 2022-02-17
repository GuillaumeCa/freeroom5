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

const testRoomAvailable: Room = {
  events: [
    {
      name: "test name",
      description: "test description",
      location: "somewhere",
      time: {
        start: new Date(2022, 1, 19, 15, 50, 0).getTime(),
        end: new Date(2022, 1, 19, 16, 50, 0).getTime(),
      },
    },
  ],
  floor: 1,
  id: "AVAILABLE",
};

const testRoomUnavailableFor: Room = {
  events: [
    {
      name: "test name",
      description: "test description",
      location: "somewhere",
      time: {
        start: new Date(2022, 1, 18, 14, 50, 0).getTime(),
        end: new Date(2022, 1, 18, 16, 50, 0).getTime(),
      },
    },
  ],
  floor: 1,
  id: "UNAVAILABLE_FOR",
};

const testRoomAvailableFor: Room = {
  events: [
    {
      name: "test name",
      description: "test description",
      location: "somewhere",
      time: {
        start: new Date(2022, 1, 18, 15, 50, 0).getTime(),
        end: new Date(2022, 1, 18, 16, 50, 0).getTime(),
      },
    },
  ],
  floor: 1,
  id: "AVAILABLE_FOR",
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
