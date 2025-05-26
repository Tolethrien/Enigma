import type { Metadata } from "next";
import { Blinker } from "next/font/google";
import "./globals.css";
const blinker = Blinker({ weight: ["400", "600"], subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Enigma",
  description: "personal Passworder",
  creator: "Milfinity",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${blinker.className} m-auto h-full max-w-screen-md bg-primeBG`}
      >
        {children}
      </body>
    </html>
  );
}
