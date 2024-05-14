import SetFolder from "../[folder]/components/setFolder";
import { removeFolder } from "@/server/supabase/actions";

export default function AddFolder() {
  return <SetFolder type="add" />;
}
