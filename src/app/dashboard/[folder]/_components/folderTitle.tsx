"use client";
import Link from "next/link";
import GeneratedFolderIcon from "@/app/_components/generatedIcon";
import { Tables } from "@/types/database";
import AddNewButton from "./addNewButton";
import { decipherData } from "@/crypto/cipher";
interface Props {
  data: Omit<Tables<"Folder">, "user_id">;
  withButton?: boolean;
  closePath: string;
}
export default function FolderTitle({
  data,
  closePath,
  withButton = true,
}: Props) {
  const { folder_name, icon_name, hashtag } = decipherData("folder", data);
  return (
    <>
      <div className="flex flex-col px-6">
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl">{folder_name}</h2>
            <GeneratedFolderIcon
              folderIcon={icon_name}
              folderName={folder_name}
              className="h-7 w-7 flex-grow text-xl"
            />
          </div>
          <Link href={closePath} className="text-2xl">
            X
          </Link>
        </div>
        <div className={`flex ${withButton && "py-2 "}`}>
          <p
            className={`${withButton ? "-mt-3" : "pb-2"} flex flex-grow items-start text-gray-300`}
          >
            #{hashtag}
          </p>
          {withButton && <AddNewButton pathID={data.id} />}
        </div>
      </div>
    </>
  );
}
