"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GeneratedFolderIcon from "@/app/_components/generatedIcon";
import ContextMenu from "@/app/_components/contextMenu";
import { removeFolder } from "@/supabase/actionsDB";
import { Tables } from "@/types/database";
import { NameToUpper } from "@/utils/helpers";
interface Props {
  data: Omit<Tables<"Folder">, "user_id">;
}
export default function FolderTile({
  data: { id, icon_name, folder_name },
}: Props) {
  const router = useRouter();

  return (
    <Link
      className="flex h-20 w-20 flex-col items-center justify-self-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow mini:h-28 mini:w-28 sm:h-36 sm:w-36 md:h-48 md:w-48"
      href={`./dashboard/${id}`}
    >
      <div className="flex h-1/5 items-center justify-center self-end ">
        <ContextMenu
          onEdit={() => router.push(`./dashboard/edit/${id}`)}
          onDelete={async () => await removeFolder(id)}
          name={NameToUpper(folder_name)}
        />
      </div>
      <GeneratedFolderIcon folderIcon={icon_name} folderName={folder_name} />
      <div className="flex h-[30%] w-full items-center justify-center px-1  text-white">
        <p className="overflow-hidden text-ellipsis text-nowrap">
          {NameToUpper(folder_name)}
        </p>
      </div>
    </Link>
  );
}
