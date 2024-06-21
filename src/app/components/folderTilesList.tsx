"use client";
import { Tables } from "@/types/database";
import AddTile from "../dashboard/component/addTile";
import FolderTile from "../dashboard/component/folderTile";
import ScrollableContent from "./scrollContent";
import Input from "./input";
import { useState } from "react";
import { decryptAllFolderData } from "@/crypto/cipher";
interface Props {
  data: Tables<"Folder">[];
}
export default function FolderTilesList({ data }: Props) {
  const [search, setSearch] = useState<string>("");
  const decryptedData = decryptAllFolderData(data);
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
        <AddTile></AddTile>
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
