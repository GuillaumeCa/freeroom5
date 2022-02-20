import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-3 mt-4 mx-auto max-w-[800px]">
      <Head>
        <title>FreeRoom - ISEP</title>
        <meta property="og:title" content="Freeroom ISEP" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Trouvez facilement une salle disponible !"
        />
        <meta property="og:url" content="https://free-room-isep.ddns.net" />
        <meta property="og:image" content="%PUBLIC_URL%/NDL.jpg" />
      </Head>
      <Link href="/">
        <a>
          <h1 className="mb-2 text-4xl font-bold text-blue-500">
            FreeRoom ISEP
          </h1>
        </a>
      </Link>
      <p className="text-md text-gray-400">
        Trouvez facilement une salle disponible !
      </p>
      {children}
    </div>
  );
}
