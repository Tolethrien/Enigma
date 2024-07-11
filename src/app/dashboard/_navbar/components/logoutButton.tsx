"use client";

import { LogoutUser } from "@/server/supabase/clientUser";
import { getSessionStorage } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function Logout() {
    const sessStore = getSessionStorage();
    sessStore?.clear();
    await LogoutUser();
    router.refresh();
  }
  return (
    <p onClick={Logout} className="-mr-2 cursor-pointer pt-2 text-lg">
      Logout
    </p>
  );
}
