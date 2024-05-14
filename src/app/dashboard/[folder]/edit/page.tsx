import { getFolderData } from "@/server/supabase/actions";
import SetFolder from "../components/setFolder";

export default async function EditFolder({
  params,
}: {
  params: { folder: number };
}) {
  const folder = await getFolderData(params.folder);
  return <SetFolder type="edit" data={folder} />;
}
