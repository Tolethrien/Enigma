import { getAllFolders } from "@/server/supabase/actionsDB";
import FolderTilesList from "../_components/folderTilesList";
export default async function Dashboard() {
  const data = await getAllFolders();
  return <FolderTilesList data={data} />;
}
