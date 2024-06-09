import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Leddle",
  description: "Led Zeppelin Heardle",
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
                Led Zeppelin Heardle
              </p>
              <p className="flex-1 flex-grow text-2xl text-center">
                Leddle
              </p>
              <p className="flex-1 text-l text-end">
                Made by Ryan
              </p>
            </header>
          </div>
        </div>
        {children}
      </body>
    </html >
  );
}
