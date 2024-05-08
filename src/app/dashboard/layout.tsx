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
      <div className="h-8 pr-9 text-right">enigma</div>
    </>
  );
}
