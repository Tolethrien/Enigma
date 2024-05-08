"use client";

import { createFrontEndClient } from "@/server/supabase/front";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createFrontEndClient();
  const router = useRouter();
  async function Logout() {
    await supabase.auth.signOut();
    router.refresh();
  }
  return (
    <p onClick={Logout} className="cursor-pointer">
      Logout
    </p>
  );
}
