import { createFrontEndClient } from "./front";

export async function LogoutUser() {
  const supabase = createFrontEndClient();
  await supabase.auth.signOut();
}
