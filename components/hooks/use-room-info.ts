import { useEffect, useState } from "react";
import { Room, RoomStatus, roomStatus, RoomStatusInfo } from "../../lib/rooms";

export function useRoomStatus(room?: Room): RoomStatusInfo {
  const [statusInfo, setStatusInfo] = useState<RoomStatusInfo>(() =>
    room
      ? roomStatus(new Date(), room.events)
      : { status: RoomStatus.FREE, currentEvent: null }
  );

  useEffect(() => {
    let timer = setInterval(() => {
      if (room) {
        setStatusInfo(roomStatus(new Date(), room.events));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [room]);

  return statusInfo;
}
