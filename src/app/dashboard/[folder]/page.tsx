import { getAllCards } from "@/server/supabase/actions";
import Link from "next/link";
import CardTile from "./components/cardTile";

export default async function Folder({
  params,
}: {
  params: { folder: number };
}) {
  const data = await getAllCards(params.folder);

  return (
    <>
      <Link
        className="-mt-4 mr-8 flex w-fit gap-2 self-end rounded-md border-2 px-4 py-1"
        href={`./${params.folder}/addPassCard`}
      >
        <p>+</p>
        <p>Add New</p>
      </Link>
      <div className="my-4 flex h-full flex-col gap-2 py-2 outline">
        {data?.map((card) => <CardTile data={card} key={card.id} />)}
      </div>
    </>
  );
}
