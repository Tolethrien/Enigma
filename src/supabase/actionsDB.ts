"use server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "./back";
import { redirect } from "next/navigation";
import { TablesInsert } from "@/types/database";
//GET
export async function getAllFolders() {
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
    .eq("id", folderID)
    .single();
  if (error) throw new Error(`${error}`);
  return data;
}
export async function getAllCards(folderID: number) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("Cards")
    .select("*")
    .eq("at_folder", folderID)
    .order("favorite", { ascending: false })
    .order("card_name", { ascending: true });
  if (error) console.error("error to: ", error.message);
  return data;
}
export async function getCardData(cardID: number) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("Cards")
    .select("*")
    .eq("id", cardID)
    .single();
  if (error) throw new Error(`${error}`);
  return data;
}
//FOLDER
export async function addFolder({
  folder_name,
  hashtag,
  icon_name,
}: Omit<TablesInsert<"Folder">, "user_id" | "id" | "custome_sort_order">) {
  const { supabase, user } = await getStoreWithUser();
  await supabase.from("Folder").insert({
    hashtag,
    icon_name,
    custome_sort_order: 0,
    folder_name: folder_name.toLowerCase(),
    user_id: user.id,
  });
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function removeFolder(folderID: number) {
  const supabase = createServerClient();
  await supabase.from("Folder").delete().eq("id", folderID);
  revalidatePath("/", "layout");
}
export async function editFolder({
  folder_name,
  hashtag,
  icon_name,
  id,
}: Omit<TablesInsert<"Folder">, "user_id" | "custome_sort_order"> & {
  id: number;
}) {
  const { supabase, user } = await getStoreWithUser();
  await supabase
    .from("Folder")
    .update({
      hashtag,
      icon_name,
      folder_name: folder_name.toLowerCase(),
      user_id: user.id,
    })
    .eq("id", id);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
//CARD
export async function addCard({
  at_folder,
  card_name,
  login,
  is_password,
  notes,
  password,
  link,
}: Omit<TablesInsert<"Cards">, "created_at" | "favorite" | "user_id" | "id">) {
  const { supabase, user } = await getStoreWithUser();
  await supabase.from("Cards").insert({
    at_folder,
    card_name: card_name.toLowerCase(),
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
export async function editCard({
  card_name,
  login,
  is_password,
  notes,
  password,
  link,
  at_folder,
  id,
}: Omit<TablesInsert<"Cards">, "created_at" | "favorite" | "user_id"> & {
  id: number;
}) {
  const { supabase, user } = await getStoreWithUser();
  await supabase
    .from("Cards")
    .update({
      card_name: card_name.toLowerCase(),
      login,
      user_id: user.id,
      is_password,
      notes,
      password,
      link,
    })
    .eq("id", id);
  revalidatePath(`/dashboard/${at_folder}`, "layout");
  redirect(`/dashboard/${at_folder}`);
}
export async function setCardFavorite(cardID: number, favorite: boolean) {
  const supabase = createServerClient();
  await supabase.from("Cards").update({ favorite }).eq("id", cardID);
  revalidatePath("./", "layout");
}

export async function removeCard(cardID: number) {
  const { supabase, user } = await getStoreWithUser();
  await supabase.from("Cards").delete().eq("id", cardID);
  revalidatePath("/", "layout");
}
//UTILS
const getStoreWithUser = async (errorMsg?: string) => {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error(errorMsg ?? "no user found");
  return { supabase, user };
};
