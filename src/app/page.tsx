import { getUserData } from "@/server/supabase/back";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await getUserData();
  user ? redirect("/dashboard") : redirect("auth/login");
}
