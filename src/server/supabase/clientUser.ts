import { createFrontEndClient } from "./front";

export async function LogoutUser() {
  const supabase = createFrontEndClient();
  await supabase.auth.signOut();
}

export async function GetUserID() {
  const supabase = createFrontEndClient();
  const user = await supabase.auth.getUser();
  return user.data.user?.id;
}
