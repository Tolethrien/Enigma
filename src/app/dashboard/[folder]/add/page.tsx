import { getFolderData } from "@/server/supabase/actionsDB";
import FolderTitle from "../_components/folderTitle";
import SetPassCard from "../_components/setPassCard";

export default async function addPassCard({
  params,
}: {
  params: { folder: number };
}) {
  const folderData = await getFolderData(params.folder);

  return (
    <>
      <FolderTitle
        data={folderData}
        closePath={`/dashboard/${folderData.id}`}
        withButton={false}
      />
      <SetPassCard folderID={params.folder} type="add" />
    </>
  );
}
