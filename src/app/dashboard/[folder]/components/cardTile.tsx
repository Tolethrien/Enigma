"use client";
import Image from "next/image";
import starDark from "@/app/assets/notFavorite.svg";
import starLight from "@/app/assets/favorite.svg";
import dateValid from "@/app/assets/passValid.svg";
import ContextMenu from "@/app/components/contextMenu";
import copyIco from "@/app/assets/copy.svg";
import log from "@/app/assets/log.svg";
import lock from "@/app/assets/lock.svg";
import unfold from "@/app/assets/unfold.svg";
import passwordHidden from "@/app/assets/passHide.svg";
import passwordVisible from "@/app/assets/passShow.svg";
import { Tables } from "@/types/database";
import { useState } from "react";
import { removeCard, setCardFavorite } from "@/server/supabase/actionsDB";
import { useRouter } from "next/navigation";
import { NameToUpper } from "@/utils/helpers";
import { decryptCardData } from "@/crypto/cipher";
interface Props {
  data: Tables<"Cards">;
}
export default function CardTile({ data }: Props) {
  const {
    favorite,
    card_name,
    id,
    password,
    at_folder,
    link,
    login,
    notes,
    is_password,
  } = decryptCardData(data);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="w-[98%]">
      <div className="z-10 h-[2px] w-full bg-gray-500 shadow-cardTopShadow"></div>
      <div className="bg-card-linear">
        <div className="flex w-full py-2">
          <div className="relative flex w-24 items-center">
            {favorite && (
              <Image
                src={starLight}
                alt=""
                className="absolute ml-2 w-6 blur-sm"
              />
            )}
            <Image
              src={favorite ? starLight : starDark}
              alt="favorite icon"
              className="z-10 ml-2 w-6"
              onClick={async () => setCardFavorite(id, !favorite)}
            />
          </div>
          <div className="flex-grow border-b-2 border-white text-center text-2xl">
            {NameToUpper(card_name)}
          </div>
          <div className="flex w-24 justify-between">
            <Image
              src={dateValid}
              alt="time validation icon"
              className="ml-2 w-5"
            />
            <ContextMenu
              onDelete={async () => await removeCard(id)}
              onEdit={() => router.push(`./${at_folder}/editPassCard/${id}`)}
              className="mr-4"
            />
          </div>
        </div>
        {showMore && <p className="-mt-2 text-center">{link}</p>}
        <div className="flex flex-col gap-4 py-2 text-xl">
          <div className="flex w-full pl-8">
            <div className="flex gap-1">
              <Image alt="" src={log} className="w-5" />
              <p className="w-24 text-center">Login:</p>
            </div>
            <p className="flex-grow">{login}</p>
            <Image
              alt=""
              src={copyIco}
              className="mr-8 w-6"
              onClick={() => navigator.clipboard.writeText(login)}
            />
          </div>
          <div className="flex w-full pl-8">
            <div className="flex gap-1">
              <Image alt="" src={lock} className="-ml-[2px] w-5" />
              <p className="w-24 text-center">
                {is_password ? "Password:" : "PIN:"}
              </p>
            </div>
            <p className="flex-grow pl-[2px]">
              {showPass ? password : "**********"}
            </p>
            <Image
              alt=""
              src={showPass ? passwordVisible : passwordHidden}
              className="mr-6 w-6"
              onClick={() => setShowPass(!showPass)}
            />
            <Image
              alt=""
              src={copyIco}
              className="mr-8 w-6"
              onClick={() => navigator.clipboard.writeText(login)}
            />
          </div>
        </div>
        {showMore && (
          <div className="py-2">
            <p className="text-center text-xl">Notes</p>
            <p className="min-h-24 w-full border-b border-t border-gray-500 border-opacity-50 p-1">
              {notes ?? "no notes :("}
            </p>
          </div>
        )}
        <div
          className="flex justify-center gap-2 py-2"
          onClick={() => setShowMore(!showMore)}
        >
          <p>{showMore ? "Less Details" : "More Details"}</p>
          <Image
            alt=""
            src={unfold}
            className={`${showMore && "rotate-180"}`}
          />
        </div>
      </div>
      <div className="z-10 h-[2px] w-full bg-gray-500 shadow-cardBottomShadow"></div>
    </div>
  );
}
