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
    <html lang="en" className="h-full max-w-[900px]">
      <body
        className={`${blinker.className} bg-primeBG flex h-full flex-col items-center`}
      >
        {children}
      </body>
    </html>
  );
}
