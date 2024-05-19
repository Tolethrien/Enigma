"use client";
import GeneratedFolderIcon from "@/app/components/generatedIcon";
import { decryptFolderData } from "@/crypto/cipher";
import { Tables } from "@/types/database";
interface Props {
  data: Tables<"Folder">;
}
export default function CompanyBar({ data }: Props) {
  const { folder_name, icon_name, hashtag } = decryptFolderData(data);
  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl">{folder_name}</h2>
        <GeneratedFolderIcon
          folderIcon={icon_name}
          folderName={folder_name}
          className="h-7 w-7 text-xl"
        />
      </div>
      <p className="text-gray-300">#{hashtag}</p>
    </div>
  );
}
