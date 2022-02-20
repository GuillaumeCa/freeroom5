import { buildingsConf } from "../lib/map.conf";
import { Room } from "../lib/rooms";
import { BuildingMap } from "./map";
import { RoomList } from "./room-list";

export function Building({ id, rooms }: { id: string; rooms: Room[] }) {
  return (
    <div className="flex">
      <div className="w-full md:w-1/2">
        <RoomList name={id} rooms={rooms} />
      </div>
      <div className="hidden md:block w-1/2 ml-[140px] mt-[100px]">
        <BuildingMap config={buildingsConf[id]} rooms={rooms} />
      </div>
    </div>
  );
}
