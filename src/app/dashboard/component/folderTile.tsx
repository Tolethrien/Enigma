"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GeneratedFolderIcon from "@/app/components/generatedIcon";
import ContextMenu from "@/app/components/contextMenu";
import { removeFolder } from "@/server/supabase/actionsDB";
import { Tables } from "@/types/database";
interface Props {
  data: Omit<Tables<"Folder">, "user_id">;
}
export default function FolderTile({
  data: { id, icon_name, folder_name },
}: Props) {
  const router = useRouter();

  return (
    <Link
      className="flex h-28 w-28 flex-col items-center justify-self-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow"
      href={`./dashboard/${id}`}
    >
      <div className="flex h-1/5 items-center justify-center self-end ">
        <ContextMenu
          onEdit={() => router.push(`./dashboard/editFolder/${id}`)}
          onDelete={async () => await removeFolder(id)}
        />
      </div>
      <GeneratedFolderIcon folderIcon={icon_name} folderName={folder_name} />
      <p className="flex h-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-white">
        {folder_name}
      </p>
    </Link>
  );
}
