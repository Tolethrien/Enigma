import { getAllCards, getFolderData } from "@/supabase/actionsDB";
import CardTile from "./_components/cardTile";
import ScrollableContent from "@/app/_components/scrollContent";
import FolderTitle from "./_components/folderTitle";
import AddNewButton from "./_components/addNewButton";

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
      <ScrollableContent
        className={`flex flex-col items-center gap-2 ${cardsData?.length === 0 && "justify-center"}`}
      >
        {cardsData && cardsData.length !== 0 ? (
          cardsData.map((card) => <CardTile data={card} key={card.id} />)
        ) : (
          <>
            <p className="text-2xl">No Cards yet</p>
            <AddNewButton pathID={folderData.id} center />
          </>
        )}
      </ScrollableContent>
    </>
  );
}
