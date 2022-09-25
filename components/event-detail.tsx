import { format, isToday, isTomorrow } from "date-fns";
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
  if (isTomorrow(props.start)) {
    return (
      <div>
        Demain {format(props.start, "HH:mm")}
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
        Pas d&apos;évènement à venir
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
        <div>
          {eventIdx > 0 && (
            <>
              <button
                className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg"
                onClick={() => setEventIdx(eventIdx - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              <button
                className="ml-3 px-2 py-1 bg-blue-500 text-white rounded-lg"
                onClick={() => setEventIdx(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
        <div>
          {eventIdx < incomingEvents.length - 1 && (
            <button
              className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg"
              onClick={() => setEventIdx(eventIdx + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
