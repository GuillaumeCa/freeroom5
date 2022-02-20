import { Building } from "../components/building";
import { BaseLayout } from "../components/layout/base";
import { fetchRoomMock, fetchRooms } from "../lib/fetch-rooms";
import { Room } from "../lib/rooms";
import { ROOM_CONFIG } from "../lib/rooms-config";

export default function NDL({ rooms }: { rooms: Room[] }) {
  return (
    <BaseLayout>
      <Building id="NDL" rooms={rooms} />
    </BaseLayout>
  );
}

export async function getStaticProps() {
  const conf = ROOM_CONFIG.NDL;
  let rooms: Room[] = [];

  if (process.env.NODE_ENV === "development") {
    rooms = await fetchRoomMock({
      L012: conf.L012,
      L016: conf.L016,
      L108: conf.L108,
    });
  } else {
    rooms = await fetchRooms(conf);
  }

  return {
    props: {
      rooms,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 12 * 3600, // 1h (In seconds)
  };
}
