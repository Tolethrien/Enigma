import { getAllFolders } from "@/server/supabase/actionsDB";
import FolderTilesList from "../components/folderTilesList";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const data = await getAllFolders();
  return <FolderTilesList data={data} />;
}
