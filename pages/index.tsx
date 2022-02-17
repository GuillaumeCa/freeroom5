import Link from "next/link";
import { BaseLayout } from "../components/layout/base";

function BuildingLink({ name, imageURL }: { name: string; imageURL: string }) {
  return (
    <Link href={`/${name}`}>
      <a className="w-full">
        <div
          className="h-[250px] mb-4 bg-no-repeat bg-cover overflow-hidden rounded-xl shadow-md"
          style={{ backgroundImage: `url(${imageURL})` }}
        >
          <h1 className="m-4 text-white font-bold text-2xl">{name}</h1>
        </div>
      </a>
    </Link>
  );
}

export default function Home() {
  return (
    <BaseLayout>
      <div className="mt-4">
        <BuildingLink name="NDC" imageURL="NDC.jpg" />
        <BuildingLink name="NDL" imageURL="NDL.jpg" />
      </div>
    </BaseLayout>
  );
}
