"use client";
import { Tables } from "@/types/database";
import Image from "next/image";
import FolderTile from "../dashboard/_component/folderTile";
import ScrollableContent from "./scrollContent";
import Input from "./input";
import { useEffect, useState } from "react";
import { decipherData } from "@/crypto/cipher";
import Link from "next/link";
import plusIco from "@/app/assets/plusIco.svg";
interface Props {
  data: Tables<"Folder">[];
}
export default function FolderTilesList({ data }: Props) {
  const [search, setSearch] = useState<string>("");
  const [decryptedData, setdecryptedData] = useState<
    Omit<Tables<"Folder">, "user_id">[]
  >([]);
  useEffect(() => {
    setdecryptedData(data.map((folder) => decipherData("folder", folder)));
  }, [data]);
  return (
    <>
      <form>
        <Input
          placeholder="search by name or #"
          type="text"
          className="my-4 ml-4 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      </form>
      <ScrollableContent className="grid auto-rows-min grid-cols-3 items-start gap-y-2">
        <Link
          className=" flex h-20 w-20 flex-col items-center justify-self-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow mini:h-28 mini:w-28 sm:h-36 sm:w-36 md:h-48 md:w-48"
          href={`./dashboard/add`}
        >
          <div className="h-1/5 w-full"></div>
          <div className="flex h-1/2 w-1/2 items-center justify-center bg-[#434F64] shadow-iconImgShadow">
            <Image src={plusIco} alt="" className="h-1/2 w-1/2"></Image>
          </div>
          <p className="flex h-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-white">
            Add New
          </p>
        </Link>
        {decryptedData
          .filter(
            (tile) =>
              tile.folder_name.toLowerCase().includes(search.toLowerCase()) ||
              (search.startsWith("#") &&
                tile.hashtag
                  .toLowerCase()
                  .includes(search.toLowerCase().slice(1))),
          )
          .map((post) => (
            <FolderTile key={post.id} data={post} />
          ))}
      </ScrollableContent>
    </>
  );
}
