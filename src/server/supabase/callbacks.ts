import { createFrontEndClient } from "./front";
import { AddFolderIconTypes } from "@/types/types";

export const removeFolderonClient = async (folderName: string) => {
  const supabase = createFrontEndClient();
  await supabase.from("Folder").delete().eq("folder_name", folderName);
};

export const addFolderonClient = async ({
  folder,
  hashtag,
  iconName,
}: {
  folder: string;
  hashtag: string;
  iconName: AddFolderIconTypes;
}) => {
  const supabase = createFrontEndClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("user not found");
  await supabase.from("Folder").insert({
    custome_sort_order: 0,
    folder_name: folder,
    user_id: user.id,
    hashtag: hashtag,
    icon_name: iconName,
  });
};
