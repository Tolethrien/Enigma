import { getFolderData } from "@/supabase/actionsDB";
import SetFolder from "../../[folder]/_components/setFolder";

export default async function EditFolder({
  params,
}: {
  params: { folderID: number };
}) {
  const folder = await getFolderData(params.folderID);
  return <SetFolder type="edit" data={folder} />;
}
