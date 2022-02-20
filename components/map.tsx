import React, { CSSProperties } from "react";
import {
  BuildingConfig,
  PolyFloor,
  RectFloor,
  RoomPosition,
} from "../lib/map.conf";
import { Room, RoomStatus } from "../lib/rooms";
import { useRoomStatus } from "./hooks/use-room-info";

export const PRIMARY_COLOR = "rgb(59 130 246)";
export const SECONDARY_COLOR = "#A8A8A8";

function Rect(props: { w: number; h: number; color: string }) {
  return (
    <rect x={0} y={0} width={props.w} height={props.h} fill={props.color} />
  );
}

function Poly(props: { transform?: string; color: string; path: string }) {
  if (props.transform) {
    return (
      <path d={props.path} transform={props.transform} fill={props.color} />
    );
  }
  return <path d={props.path} fill={props.color} />;
}

function RoomMap(props: {
  roomID: string;
  room?: Room;
  pos: RoomPosition;
  text?: { x: string; y: string; fontSize?: string };
  fill: string;
  floor: PolyFloor | RectFloor;
  stroke: string;
}) {
  if (!props.room) {
    return null;
  }

  const { status } = useRoomStatus(props.room);
  const color =
    status === RoomStatus.NOT_FREE ? SECONDARY_COLOR : PRIMARY_COLOR;

  const pos = props.pos;
  const style: CSSProperties = {
    zIndex: 1,
    top: pos.top,
    left: pos.left,
    width: pos.width,
    height: pos.height,
    position: "absolute",
  };

  return (
    <svg style={style}>
      {props.floor.type === "RECT" ? (
        <Rect w={pos.width} h={pos.height} color={color} />
      ) : (
        <Poly
          path={props.floor.path}
          transform={props.floor.transform}
          color={color}
        />
      )}
      {props.text && (
        <text
          x={props.text.x}
          y={props.text.y}
          fill={props.fill}
          textAnchor="middle"
          fontSize={props.text.fontSize || "15"}
          stroke={props.stroke}
        >
          {props.roomID}
        </text>
      )}
    </svg>
  );
}

function FloorMap(props: {
  pos: { width: number; height: number };
  path: string;
}) {
  const style = {
    zIndex: -1,
    height: props.pos.height,
    width: props.pos.width,
    filter: "drop-shadow(0 8px 15px #ccc)",
  };
  return (
    <svg style={style}>
      <path d={props.path} fill="#f3f3f3" />
    </svg>
  );
}

function floorName(floor: number): string {
  if (floor === 0) {
    return "RDC";
  } else if (floor === 1) {
    return "1er";
  } else {
    return floor + "e";
  }
}

export function BuildingMap({
  config,
  rooms,
}: {
  config: BuildingConfig[0];
  rooms: Room[];
}) {
  let building = [...config];
  building.reverse();

  const floorStyle: CSSProperties = {
    position: "relative",
    transform: "rotateX(55deg)",
  };
  const floorWrapperStyle: CSSProperties = {
    perspective: 500,
    height: 170,
    marginTop: -50,
  };

  const floorNameStyle: CSSProperties = {
    position: "relative",
    left: -100,
    top: 50,
    color: "#d2d2d2",
  };

  return (
    <div>
      {building.map((b) => (
        <div
          key={b.floor}
          style={{ width: b.pos.width, height: b.pos.height, marginTop: -60 }}
        >
          <span className="font-bold text-5xl" style={floorNameStyle}>
            {floorName(b.floor)}
          </span>
          <div style={floorWrapperStyle}>
            <div style={floorStyle}>
              {b.rooms.map((r) => {
                return (
                  <RoomMap
                    key={r.id}
                    roomID={r.id}
                    pos={r.pos}
                    text={r.text}
                    floor={r.floor}
                    room={rooms.find((room) => room.id === r.id)}
                    fill="#FFF"
                    stroke="#FFF"
                  />
                );
              })}
              <FloorMap path={b.ground} pos={b.pos} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
