import { getAllCards, getFolderData } from "@/server/supabase/actionsDB";
import Link from "next/link";
import CardTile from "./components/cardTile";
import ScrollableContent from "@/app/components/scrollContent";
import FolderTitle from "./components/folderTitle";

export default async function Folder({
  params,
}: {
  params: { folder: number };
}) {
  const cardsData = await getAllCards(params.folder);
  const folderData = await getFolderData(params.folder);

  return (
    <>
      <FolderTitle data={folderData} closePath="./" />
      <ScrollableContent>
        {cardsData && cardsData.length !== 0 ? (
          cardsData.map((card) => <CardTile data={card} key={card.id} />)
        ) : (
          <div>No Cards yet</div>
        )}
      </ScrollableContent>
    </>
  );
}
