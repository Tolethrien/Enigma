import { getCards, getFolderData } from "@/server/supabase/actions";
import Link from "next/link";

export default async function Folder({
  params,
}: {
  params: { folder: number };
}) {
  const folder = await getFolderData(params.folder);
  const data = await getCards(params.folder);
  return (
    <div>
      <p>My Post: {folder.folder_name}</p>
      <div className="grid grid-cols-4 gap-4 ">
        <form>
          <input
            id="name"
            name="name"
            type="number"
            defaultValue={folder.id}
            className="hidden"
          />
          <Link href={`./${params.folder}/addPassword`}>add new</Link>
        </form>
        {data?.map((card) => <p key={card.id}>{card.card_name}</p>)}
      </div>
    </div>
  );
}
