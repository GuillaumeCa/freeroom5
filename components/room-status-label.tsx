import { formatDistance } from "date-fns";
import fr from "date-fns/locale/fr";
import { Event, RoomStatus } from "../lib/rooms";

export function RoomStatusLabel({
  status,
  event,
}: {
  status: RoomStatus;
  event: Event | null;
}) {
  switch (status) {
    case RoomStatus.FREE:
      return <p>Disponible</p>;
    case RoomStatus.FREE_FOR:
      if (!event) return null;
      return (
        <p>
          Disponible pour{" "}
          <b>
            {formatDistance(new Date(event.time.start), new Date(), {
              locale: fr,
            })}
          </b>
        </p>
      );
    case RoomStatus.NOT_FREE:
      if (!event) return null;
      return (
        <p>
          Indisponible pour{" "}
          <b>
            {formatDistance(new Date(event.time.end), new Date(), {
              locale: fr,
            })}
          </b>
        </p>
      );
  }
}
