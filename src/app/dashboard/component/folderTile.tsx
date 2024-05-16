"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeFolderonClient } from "@/server/supabase/callbacks";
import { AddFolderIconTypes } from "@/types/types";
import GeneratedFolderIcon from "@/app/components/generatedIcon";
import ContextMenu from "@/app/components/contextMenu";
interface Props {
  folderName: string;
  folderID: number;
  folderIcon: AddFolderIconTypes;
  folderHash: string;
}
export default function FolderTile({
  folderIcon,
  folderName,
  folderID,
}: Props) {
  const router = useRouter();

  return (
    <Link
      className="flex h-28 w-28 flex-col items-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow"
      href={`./dashboard/${folderID}`}
    >
      <div className="flex h-1/5 items-center justify-center self-end ">
        <ContextMenu
          onEdit={() => router.push(`./dashboard/${folderID}/edit`)}
          onDelete={async () => await removeFolderonClient(folderID)}
        />
      </div>
      <GeneratedFolderIcon folderIcon={folderIcon} folderName={folderName} />
      <p className="flex h-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-white">
        {folderName}
      </p>
    </Link>
  );
}
