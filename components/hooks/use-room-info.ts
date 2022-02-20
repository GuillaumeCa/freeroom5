import { useEffect, useState } from "react";
import { Room, roomStatus, RoomStatusInfo } from "../../lib/rooms";

export function useRoomStatus(room: Room): RoomStatusInfo {
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
