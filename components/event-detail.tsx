import { format, isToday } from "date-fns";
import fr from "date-fns/locale/fr";
import { useState } from "react";
import { Event } from "../lib/rooms";

function EventDate(props: { start: Date; end: Date }) {
  if (isToday(props.start)) {
    return (
      <div>
        {format(props.start, "HH:mm")}
        {" - "}
        {format(props.end, "HH:mm")}
      </div>
    );
  }
  return (
    <div>
      {format(props.start, "d MMMM HH:mm", { locale: fr })}
      {" - "}
      {format(props.end, "HH:mm")}
    </div>
  );
}

export function EventDetail({
  events,
  currentEvent,
}: {
  events: Event[];
  currentEvent: Event | null;
}) {
  const [eventIdx, setEventIdx] = useState(0);
  const currentEventIdx = currentEvent ? events.indexOf(currentEvent) : -1;
  const incomingEvents = events
    .sort((a, b) => (a.time.start > b.time.start ? 1 : -1))
    .filter((_, i) => i >= currentEventIdx);
  const event = incomingEvents[eventIdx];

  if (incomingEvents.length === 0) {
    return (
      <div className="rounded-lg bg-gray-200 text-gray-500 px-3 py-2 mt-1">
        Pas d'évènement à venir
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-200 text-gray-500 px-3 py-2 mt-1">
      <h3 className="text-gray-700 text-xl font-semibold">{event.name}</h3>
      <p>
        {event.description
          .split("\n")
          .filter((t) => t.length > 0)
          .map((text, i) => (
            <span key={i}>
              {text}
              <br />
            </span>
          ))}
      </p>
      <div className="flex text-blue-500">
        <div className="mr-3">{event.location}</div>
        <EventDate
          start={new Date(event.time.start)}
          end={new Date(event.time.end)}
        />
      </div>
      <div className="flex justify-between mt-2">
        {eventIdx > 0 && (
          <button
            className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg"
            onClick={() => setEventIdx(eventIdx - 1)}
          >
            Précédent
          </button>
        )}
        {eventIdx < incomingEvents.length - 1 && (
          <button
            className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg"
            onClick={() => setEventIdx(eventIdx + 1)}
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
}
