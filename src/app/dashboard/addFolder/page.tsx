"use client";
import Input from "@/app/components/input";
import TemplateTile from "./components/templateTile";
import CompantyLogo from "./components/companyLogo";
import ColorIcon, { avalibleIconColors } from "./components/colorIcon";
import logos, { type Logos } from "@/app/logos";
import React, { useState } from "react";
import { NameToUpper } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { addFolderonClient } from "@/server/supabase/callbacks";
import { AddFolderIconTypes } from "@/types/types";

export default function AddFolder() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [logoSearch, setlogoSearch] = useState<string>("");
  const [pickedLogo, setpickedLogo] = useState<AddFolderIconTypes>("red");
  const [error, setError] = useState<string>("");

  const validateFolder = async () => {
    await addFolderonClient({
      folder: NameToUpper(companyName),
      hashtag,
      iconName: pickedLogo,
    });
    router.push("/");
  };
  return (
    <div className="flex h-full flex-col">
      <div className="pt-8">
        <div className="flex justify-between px-8">
          <h2 className="text-2xl">New Tile</h2>
          <p className="text-2xl">X</p>
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
      <div className="flex w-full flex-grow flex-col justify-around">
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
                .filter((name) => name.includes(logoSearch))
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
        <div className="flex  items-center justify-center">
          <button className="text-xl" onClick={validateFolder}>
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}
