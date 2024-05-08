"use server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "./back";
export async function getFolders() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("Folder").select("*");
  if (error) throw new Error(`${error}`);
  return data;
}
export async function getFolderData(folderID: number) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("Folder")
    .select("*")
    .eq("id", folderID);
  if (error) throw new Error(`${error}`);
  return data[0];
}
export async function getCards(folderID: number) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("Cards")
    .select("*")
    .eq("at_folder", folderID);
  if (error) console.error("error to: ", error.message);
  return data;
}
export async function addFolder() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("no user found to add folder to");
  await supabase.from("Folder").insert({
    custome_sort_order: 0,
    folder_name: String(Math.random().toFixed(4)),
    user_id: user.id,
  });
  revalidatePath("/", "layout");
}
export async function addCard(form: FormData) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("no user found to add folder to");

  await supabase.from("Cards").insert({
    user_id: user.id,
    at_folder: form.get("name") as unknown as number,
    card_name: String(Math.random().toFixed(4)),
    login: "",
  });
  revalidatePath("/", "layout");
}

export async function removeFolder(form: FormData) {
  const supabase = createServerClient();
  await supabase
    .from("Folder")
    .delete()
    .eq("folder_name", form.get("name") as unknown as string);
  console.log(form.get("name"));
  revalidatePath("/", "layout");
}
