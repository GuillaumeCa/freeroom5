import { useEffect, useState } from "react";
import { Room, RoomStatus, roomStatus, RoomStatusInfo } from "../lib/rooms";
import { EventDetail } from "./event-detail";
import { RoomStatusLabel } from "./room-status-label";

function useRoomStatus(room: Room): RoomStatusInfo {
  const [statusInfo, setStatusInfo] = useState<RoomStatusInfo>(() =>
    roomStatus(new Date(), room.events)
  );

  useEffect(() => {
    let timer = setInterval(() => {
      setStatusInfo(roomStatus(new Date(), room.events));
    }, 1000);
    return () => clearInterval(timer);
  }, [room]);

  return statusInfo;
}

function getStatusColor(status: RoomStatus): string {
  let statusColor = "bg-blue-500";
  if (status === RoomStatus.NOT_FREE) {
    statusColor = "bg-gray-400";
  }

  return statusColor;
}

export function RoomInfo({ room }: { room: Room }) {
  const [showEvent, setShowEvent] = useState(false);
  const { status, currentEvent } = useRoomStatus(room);

  return (
    <div className="mb-2">
      <div
        className={`${getStatusColor(
          status
        )} rounded-lg px-3 py-2 cursor-pointer text-white flex justify-between select-none`}
        onClick={() => setShowEvent(!showEvent)}
      >
        <h4 className="leading-none font-bold text-2xl">{room.id}</h4>
        <RoomStatusLabel status={status} event={currentEvent} />
      </div>
      {showEvent && currentEvent && <EventDetail event={currentEvent} />}
    </div>
  );
}
