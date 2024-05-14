"use client";
import Input from "@/app/components/input";
import TemplateTile from "./templateTile";
import CompantyLogo from "./companyLogo";
import ColorIcon, { avalibleIconColors } from "./colorIcon";
import logos, { type Logos } from "@/app/logos";
import React, { useState } from "react";
import { NameToUpper } from "@/utils/helpers";
import { AddFolderIconTypes } from "@/types/types";
import { addFolder, editFolder } from "@/server/supabase/actions";
import { TablesInsert } from "@/types/database";
import Link from "next/link";
interface Props {
  type: "add" | "edit";
  data?: Required<TablesInsert<"Folder">>;
}
export default function SetFolder({ type, data }: Props) {
  const [companyName, setCompanyName] = useState<string>(
    data?.folder_name ?? "",
  );
  const [hashtag, setHashtag] = useState<string>(data?.hashtag ?? "");
  const [logoSearch, setlogoSearch] = useState<string>("");
  const [pickedLogo, setpickedLogo] = useState<AddFolderIconTypes>(
    (data?.icon_name as AddFolderIconTypes | undefined) ?? "red",
  );
  const [error, setError] = useState<string>("");
  const confirmData = () => {
    if (type === "add")
      addFolder({
        custome_sort_order: 0,
        folder_name: companyName,
        hashtag: hashtag,
        icon_name: pickedLogo,
      });
    else {
      if (!data) return;
      else
        editFolder({
          id: data.id,
          folder_name: companyName,
          hashtag: hashtag,
          icon_name: pickedLogo,
        });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <TileInfo />
      <div className="flex w-full flex-grow flex-col justify-around">
        <Logo />
        <div className="flex  items-center justify-center">
          <button className="text-xl" onClick={confirmData}>
            {type === "add" ? "CREATE" : "CONFIRM"}
          </button>
        </div>
      </div>
    </div>
  );

  function TileInfo() {
    return (
      <div className="pt-8">
        <div className="flex justify-between px-8">
          <h2 className="text-2xl">
            {type === "add" ? "Add Tile" : "Edit Tile"}
          </h2>
          <Link href="/dashboard" className="text-2xl">
            X
          </Link>
        </div>
        <div className=" flex justify-between px-8">
          <TemplateTile icon={pickedLogo} name={companyName} />
          <div className="grid pb-4">
            <Input
              placeholder="company..."
              type="text"
              className="h-8 self-end"
              value={companyName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(event.target.value)
              }
            />
            <Input
              placeholder="#group..."
              type="text"
              className="h-8 self-end"
              value={hashtag.length === 0 ? "" : `#${hashtag}`}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setHashtag(
                  hashtag.length > 0
                    ? event.target.value.slice(1)
                    : event.target.value,
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
  function Logo() {
    return (
      <div>
        <p className="py-1 text-center text-xl">Pick Logo</p>
        <div className="flex h-56 flex-col items-center gap-4 overflow-y-scroll rounded-md border-2 border-gray-500 px-2 py-4 ">
          <div className="flex  w-full justify-between">
            <Input
              placeholder="search..."
              value={logoSearch}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setlogoSearch(event.target.value)
              }
              type="text"
              className="ml-4"
            />
            <p className="mr-4">{NameToUpper(pickedLogo)}</p>
          </div>
          <div className="grid w-4/5 grid-cols-5 items-center justify-center gap-2">
            {Object.keys(logos)
              .filter((name) =>
                name.toLowerCase().includes(logoSearch.toLowerCase()),
              )
              .map((name, i) => (
                <CompantyLogo
                  key={i}
                  name={name as Logos}
                  isSelected={pickedLogo === name}
                  onClick={() => setpickedLogo(name as Logos)}
                />
              ))}
          </div>
        </div>
        <p className="py-1 text-center">OR</p>
        <div className="flex justify-center gap-4 py-1">
          {avalibleIconColors.map((color, i) => (
            <ColorIcon
              key={i}
              color={color}
              onClick={() => setpickedLogo(color)}
              isSelected={pickedLogo === color}
            />
          ))}
        </div>
      </div>
    );
  }
}
