import { buildFloors, Room } from "../lib/rooms";
import { Floor } from "./floor";

export function Building(props: { name: string; rooms: Room[] }) {
  const floors = buildFloors(props.rooms);
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-700 mt-5">{props.name}</h2>
      <div>
        {floors.map((floor) => (
          <Floor key={floor.level} floor={floor} />
        ))}
      </div>
    </>
  );
}
