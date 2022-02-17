import { format } from "date-fns";
import { Event } from "../lib/rooms";

export function EventDetail({ event }: { event: Event }) {
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
        <div>
          {format(new Date(event.time.start), "HH:mm")}
          {" - "}
          {format(new Date(event.time.end), "HH:mm")}
        </div>
      </div>
    </div>
  );
}
