import { getCards, getFolderData } from "@/server/supabase/actions";
import Link from "next/link";
import CardTile from "./[passCard]/components/cardTile";

export default async function Folder({
  params,
}: {
  params: { folder: number };
}) {
  const folder = await getFolderData(params.folder);
  const data = await getCards(params.folder);
  return (
    <div className="my-4 grid h-full outline">
      {data?.map((card) => <CardTile key={card.id} />)}
    </div>
  );
}
