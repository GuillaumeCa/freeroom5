import { useState } from "react";
import { cls } from "../lib/classes";
import { Room, RoomStatus } from "../lib/rooms";
import { EventDetail } from "./event-detail";
import { useRoomStatus } from "./hooks/use-room-info";
import { RoomStatusLabel } from "./room-status-label";

function getStatusColor(status: RoomStatus, highlight = false): string {
  let statusColor = "bg-blue-500";
  if (status === RoomStatus.NOT_FREE) {
    statusColor = !highlight ? "bg-gray-400" : "hover:bg-gray-400/75";
  } else if (status === RoomStatus.FREE_FOR) {
    statusColor = !highlight ? "bg-blue-500" : "hover:bg-blue-500/75";
  }

  return statusColor;
}

export function RoomInfo({ room }: { room: Room }) {
  const [showEvent, setShowEvent] = useState(false);
  const { status, currentEvent } = useRoomStatus(room);

  return (
    <div className="mb-2">
      <div
        className={cls(
          getStatusColor(status),
          "rounded-lg px-3 py-2",
          status !== RoomStatus.FREE && "cursor-pointer",
          "text-white flex justify-between select-none",
          getStatusColor(status, true)
        )}
        onClick={() => setShowEvent(!showEvent)}
      >
        <h4 className="leading-none font-bold text-2xl mr-2">{room.id}</h4>
        <RoomStatusLabel status={status} event={currentEvent} />
      </div>
      {showEvent && currentEvent && <EventDetail event={currentEvent} />}
    </div>
  );
}
