import { redirect } from "next/navigation";

import { getUserData } from "@/supabase/back";
import NavBar from "./_component/navbar";
import CreedsVerification from "./_component/creedsVerification";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUserData();
  if (!user) redirect("/");

  return (
    <div className="flex h-dvh flex-col">
      <NavBar></NavBar>
      <CreedsVerification>{children}</CreedsVerification>
      <div className="flex h-8 w-full items-center justify-end bg-black bg-opacity-40 pr-9">
        <p>Enigma (Demo version - no encryption)</p>
      </div>
    </div>
  );
}
