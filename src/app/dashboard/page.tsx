import { addFolder, getFolders } from "@/server/supabase/actions";
import Input from "../components/input";
import Icon from "./component/icon";
import Link from "next/link";
export default async function Dashboard() {
  const data = await getFolders();

  return (
    <main className="flex flex-col gap-8 px-4">
      <Input
        placeholder="search..."
        type="text"
        className=" w-1/2 self-start"
      ></Input>
      <section className="grid grid-cols-3 place-items-center gap-4">
        <Link href={"./dashboard/addFolder"}>Add new</Link>
        {data?.map((post) => (
          <Icon key={post.id} folderID={post.id} name={post.folder_name} />
        ))}
      </section>
    </main>
  );
}
