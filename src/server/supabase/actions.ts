"use server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "./back";
import { redirect } from "next/navigation";
import { Database, TablesInsert } from "@/types/database";
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
export async function getCardData(cardID: number) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("Cards")
    .select("*")
    .eq("id", cardID);
  if (error) throw new Error(`${error}`);
  return data[0];
}
export async function addFolder({
  custome_sort_order,
  folder_name,
  hashtag,
  icon_name,
}: Omit<TablesInsert<"Folder">, "user_id" | "id">) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("no user found to add folder to");
  await supabase.from("Folder").insert({
    hashtag,
    icon_name,
    custome_sort_order,
    folder_name,
    user_id: user.id,
  });
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function editFolder({
  folder_name,
  hashtag,
  icon_name,
  id,
}: Omit<TablesInsert<"Folder">, "user_id" | "custome_sort_order"> & {
  id: number;
}) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("no user found to add folder to");
  await supabase
    .from("Folder")
    .update({
      hashtag,
      icon_name,
      folder_name,
      user_id: user.id,
    })
    .eq("id", id);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function addCard({
  at_folder,
  card_name,
  login,
  is_password,
  notes,
  password,
  link,
}: Omit<TablesInsert<"Cards">, "created_at" | "favorite" | "user_id" | "id">) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("no user found to add folder to");
  await supabase.from("Cards").insert({
    at_folder,
    card_name,
    login,
    user_id: user.id,
    is_password,
    notes,
    password,
    link,
  });
  revalidatePath(`/dashboard/${at_folder}`, "layout");
  redirect(`/dashboard/${at_folder}`);
}

export async function removeFolder(form: FormData) {
  const supabase = createServerClient();
  await supabase
    .from("Folder")
    .delete()
    .eq("folder_name", form.get("name") as unknown as string);
  revalidatePath("/", "layout");
}
