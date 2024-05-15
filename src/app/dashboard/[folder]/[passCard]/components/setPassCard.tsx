"use client";

import Input from "@/app/components/input";
import Image from "next/image";
import unfold from "@/app/assets/unfold.svg";
import log from "@/app/assets/log.svg";
import lock from "@/app/assets/lock.svg";
import dice from "@/app/assets/dice.svg";
import { addCard } from "@/server/supabase/actions";
import { useState } from "react";
import { TablesUpdate } from "@/types/database";
type SetPassCardProps =
  | { type: "add"; folderID: number; data?: TablesUpdate<"Cards"> }
  | { type: "edit"; data: TablesUpdate<"Cards"> };

export default function SetPassCard(props: SetPassCardProps) {
  const [pass, setPass] = useState<string>(props.data?.password ?? "");
  const [notes, setNotes] = useState<string>(props.data?.notes ?? "");
  const [cardName, setCardName] = useState<string>(props.data?.card_name ?? "");
  const [link, setLink] = useState<string>(props.data?.link ?? "");
  const [isPassword, seIsPassword] = useState<boolean>(
    props.data?.is_password ?? true,
  );
  const [login, setLogin] = useState<string>(props.data?.login ?? "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const confirmData = async () => {
    if (props.type === "add")
      await addCard({
        at_folder: props.folderID,
        card_name: cardName,
        login,
        notes,
        is_password: isPassword,
        link,
        password: pass,
      });
    else {
      //   if (!data) return;
      //   else
      //     await editFolder({
      //       id: data.id,
      //       folder_name: companyName,
      //       hashtag: hashtag,
      //       icon_name: pickedLogo,
      //     });
    }
  };

  return (
    <div className="flex w-full flex-grow flex-col justify-around">
      <div className="grid justify-center gap-6">
        <div className="flex flex-col items-center">
          <p className="pb-4 text-center text-2xl">New Password</p>
          <Input
            placeholder="Dispay Name"
            type="text"
            className="mb-4 w-3/4"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <div className="flex gap-2">
            <p className="text-center">Website</p>
            <Image alt="" src={unfold} className="" />
          </div>
          <Input
            placeholder="url"
            type="text"
            className="w-3/4"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex ">
            <Image alt="" src={log} />
            <Input
              placeholder="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex">
              <Image alt="" src={lock} />
              <Input
                placeholder="password"
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              <p>{isPassword ? "Password" : "PIN"}</p>
              <Image alt="" src={unfold} />
            </div>
          </div>
          <div className="flex gap-2">
            <Image alt="" src={dice} className="rotate-45" />
            <p className="text-center text-xl">Generate Safe Pass</p>
            <Image alt="" src={dice} className=" -rotate-45" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="pb-1 text-center text-xl">Notes</p>
        <textarea
          className="min-h-24 w-full bg-transparent p-1 outline"
          placeholder="need context? you have 255 char for that!..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <div className="self-center">
        <button onClick={async () => await confirmData()}>
          {props.type === "add" ? "CREATE" : "UPDATE"}
        </button>
      </div>
    </div>
  );
}
