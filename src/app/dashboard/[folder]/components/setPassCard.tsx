"use client";

import Input from "@/app/components/input";
import Image from "next/image";
import unfold from "@/app/assets/unfold.svg";
import log from "@/app/assets/log.svg";
import lock from "@/app/assets/lock.svg";
import dice from "@/app/assets/dice.svg";
import { addCard, editCard } from "@/server/supabase/actionsDB";
import { useRef, useState } from "react";
import { Tables } from "@/types/database";
import { NameToUpper } from "@/utils/helpers";
import {
  cryptAddCardData,
  cryptEditCardData,
  decryptCardData,
} from "@/crypto/cipher";
import { generateStrongPassword } from "@/crypto/generatePassword";
type SetPassCardProps =
  | { type: "add"; folderID: number }
  | { type: "edit"; data: Tables<"Cards"> };

export default function SetPassCard(props: SetPassCardProps) {
  const data = props.type === "edit" ? decryptCardData(props.data) : undefined;
  const [pass, setPass] = useState<string>(data?.password ?? "");
  const [notes, setNotes] = useState<string>(data?.notes ?? "");
  const [cardName, setCardName] = useState<string>(data?.card_name ?? "");
  const [link, setLink] = useState<string>(data?.link ?? "");
  const [isPassword, setIsPassword] = useState<boolean>(
    data?.is_password ?? true,
  );
  const [login, setLogin] = useState<string>(data?.login ?? "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    window.addEventListener("mousedown", handleOutSideClick);
  };

  const handleOutSideClick = (event: MouseEvent) => {
    if (!ref.current?.contains(event.target as Node)) {
      window.removeEventListener("mousedown", handleOutSideClick);
      setIsOpen(false);
    }
  };
  const changePasswordType = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.removeEventListener("mousedown", handleOutSideClick);
    setPass("");
    setIsOpen(false);
    setIsPassword(!isPassword);
  };

  const confirmData = async () => {
    if (props.type === "add")
      await addCard(
        cryptAddCardData({
          at_folder: props.folderID,
          card_name: cardName,
          login,
          notes,
          is_password: isPassword,
          link,
          password: pass,
        }),
      );
    else if (props.type === "edit") {
      await editCard(
        cryptEditCardData({
          id: props.data.id,
          at_folder: props.data.at_folder,
          card_name: cardName,
          login,
          notes,
          is_password: isPassword,
          link,
          password: pass,
        }),
      );
    }
  };

  return (
    <>
      <div className="flex w-full flex-grow flex-col justify-around">
        <div className="grid  justify-center gap-6">
          <div className="flex flex-col items-center">
            <p className="pb-4 text-center text-2xl">New Password</p>
            <Input
              placeholder="Dispay Name"
              type="text"
              className="mb-4 w-3/4"
              value={NameToUpper(cardName)}
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
                  placeholder={isPassword ? "Password" : "PIN"}
                  type={isPassword ? "text" : "pin"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="relative flex gap-1" onClick={openMenu} ref={ref}>
                <p>{isPassword ? "Password" : "PIN"}</p>
                <Image
                  alt=""
                  src={unfold}
                  className={`${isOpen && "rotate-180"}`}
                />
                {isOpen && (
                  <div
                    className="absolute top-full"
                    onClick={changePasswordType}
                  >
                    {isPassword ? "PIN" : "Password"}
                  </div>
                )}
              </div>
            </div>
            <div
              className={` flex gap-2 ${isOpen && "mt-4"}`}
              onClick={() => setPass(generateStrongPassword())}
            >
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
    </>
  );
}
