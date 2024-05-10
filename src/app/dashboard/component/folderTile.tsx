"use client";
import Link from "next/link";
import menuIco from "@/app/assets/menuIco.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { removeFolderonClient } from "@/server/supabase/callbacks";
import logos, { Logos } from "@/app/logos";
import { AddFolderIconTypes } from "@/types/types";
import { NameToUpper } from "@/utils/helpers";
import { AvalibleIconColorsT, COLORS } from "../addFolder/components/colorIcon";
interface Props {
  name: string;
  folderID: number;
  icon: AddFolderIconTypes;
}
export default function FolderTile({ folderID, name, icon }: Props) {
  const isLogo = icon in logos ? true : false;
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

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
  const editTile = () => {
    window.removeEventListener("mousedown", handleOutSideClick);
    router.push(`./dashboard/${folderID}/edit`);
  };
  const deleteTile = async () => {
    window.removeEventListener("mousedown", handleOutSideClick);
    await removeFolderonClient(name);
    router.refresh();
  };

  return (
    <Link
      className="flex h-28 w-28 flex-col items-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow"
      href={`./dashboard/${folderID}`}
    >
      <button
        className="relative flex h-1/5 w-full items-center justify-end"
        onClick={openMenu}
        ref={ref}
      >
        <Image src={menuIco} alt="menu" className="mr-2"></Image>
        {isOpen && (
          <div className="absolute right-1 top-1/2 rounded-md bg-[#313640] px-6 py-1 shadow-iconShadow">
            <p className="hover:bg-slate-200" onClick={editTile}>
              Edit
            </p>
            <p className="hover:bg-slate-200" onClick={deleteTile}>
              Delete
            </p>
          </div>
        )}
      </button>
      {isLogo ? (
        <Image
          src={logos[icon as Logos]}
          alt="logo"
          className="flex h-1/2 w-1/2  shadow-iconImgShadow"
        ></Image>
      ) : (
        <div
          className={`flex h-1/2 w-1/2 shadow-iconImgShadow ${COLORS[icon as AvalibleIconColorsT].bg} items-center justify-center text-4xl`}
        >
          {NameToUpper(name.charAt(0))}
        </div>
      )}
      <p className="flex h-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-white">
        {name}
      </p>
    </Link>
  );
}
