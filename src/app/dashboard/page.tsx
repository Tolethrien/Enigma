import { getFolders } from "@/server/supabase/actions";
import Input from "../components/input";
import AddTile from "./component/addTile";
import FolderTile from "./component/folderTile";
import { AddFolderIconTypes } from "@/types/types";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const data = await getFolders();

  return (
    <main className="flex flex-col gap-8 px-4">
      <Input
        placeholder="search..."
        type="text"
        className=" w-1/2 self-start"
      ></Input>
      <section className="grid grid-cols-3 place-items-center gap-y-2 overflow-y-scroll">
        <AddTile></AddTile>
        {data?.map((post) => (
          <FolderTile
            key={post.id}
            folderID={post.id}
            folderName={post.folder_name}
            folderIcon={post.icon_name as AddFolderIconTypes}
            folderHash=""
          />
        ))}
      </section>
    </main>
  );
}
