import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Heardle",
  description: "Its a Heardle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className="flex flex-col h-screen">
        <div>
          <div className="max-w-screen-lg mx-auto">
            <header className="p-5 flex items-center justify-center justify-evenly">
              <p className="flex-1 text-l">
                Random Songs
              </p>
              <Link href="/" className="flex-1 flex-grow text-2xl text-center" >
                Ryandle
              </Link>
              <p className="flex-1 text-l text-end">
                Made by Ryan <Link href="/credits">ⓘ</Link>
              </p>
            </header>
          </div>
        </div>
        <main className="grow">
          <div className="p-3 max-w-screen-sm h-full mx-auto flex flex-col justify-between">
            {children}
          </div>
        </main>
      </body>
    </html >
  );
}
