import { getCardData, getFolderData } from "@/supabase/actionsDB";
import SetPassCard from "../../_components/setPassCard";
import FolderTitle from "../../_components/folderTitle";

export default async function EditPassCard({
  params,
}: {
  params: { cardID: number; folder: number };
}) {
  const passCard = await getCardData(params.cardID);
  const folderData = await getFolderData(params.folder);

  return (
    <>
      <FolderTitle
        data={folderData}
        closePath={`/dashboard/${params.folder}`}
        withButton={false}
      />
      <SetPassCard type="edit" data={passCard} />
    </>
  );
}
