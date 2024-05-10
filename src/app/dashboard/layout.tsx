import { redirect } from "next/navigation";

import { getUserData } from "@/server/supabase/back";
import NavBar from "./_navbar/navbar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserData();
  if (!user) redirect("/");

  return (
    <>
      <NavBar></NavBar>
      <div className={"w-full flex-grow"}>{children}</div>
      <div className="flex h-8 w-full items-center justify-end bg-black bg-opacity-40 pr-9">
        <p>Enigma</p>
      </div>
    </>
  );
}
