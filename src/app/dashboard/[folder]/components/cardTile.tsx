"use client";
import Image from "next/image";
import starDark from "@/app/assets/notFavorite.svg";
import starLight from "@/app/assets/favorite.svg";
import dateValid from "@/app/assets/passValid.svg";
import ContextMenu from "@/app/components/contextMenu";
import log from "@/app/assets/log.svg";
import lock from "@/app/assets/lock.svg";
import unfold from "@/app/assets/unfold.svg";
import passwordHidden from "@/app/assets/passHide.svg";
import passwordVisible from "@/app/assets/passShow.svg";
import { Tables } from "@/types/database";
import { useState } from "react";
import { removeCard, setCardFavorite } from "@/server/supabase/actions";
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
    <div
      className="flex h-fit flex-col items-center"
      onClick={() => navigator.clipboard.writeText(password)}
    >
      <div className="z-10 h-[2px] w-full bg-gray-500 shadow-cardTopShadow"></div>
      <div className="h-fit w-[96%]  bg-card-linear text-center">
        <div className="flex h-1/4 justify-between">
          <Image
            src={favorite ? starLight : starDark}
            alt="favorite icon"
            className="ml-2 w-5"
            onClick={async () => setCardFavorite(id, !favorite)}
          />
          <div className="flex gap-4">
            <p className=" relative text-2xl">
              {NameToUpper(card_name)}
              <Image
                src={dateValid}
                alt="time validation icon"
                className="absolute left-[110%] top-1/4"
              />
            </p>
          </div>
          <ContextMenu
            onDelete={async () => await removeCard(id)}
            onEdit={() => router.push(`./${at_folder}/editPassCard/${id}`)}
            className="mr-4"
          />
        </div>
        {showMore && <p className="w-full">{link}</p>}
        <div>
          <div className="flex  gap-6 py-1 pl-[20%] text-xl">
            <div className="flex gap-1">
              <Image alt="" src={log} className="" />
              <p className="w-20 text-start">Login:</p>
            </div>
            <p>{login}</p>
          </div>
          <div className="flex gap-6 py-1 pl-[20%] text-xl">
            <div className="flex gap-1">
              <Image alt="" src={lock} className="" />
              <p className="w-20 text-start">
                {is_password ? "Password" : "PIN"}:
              </p>
            </div>
            <p>{showPass ? password : "**********"}</p>
            <Image
              alt=""
              src={showPass ? passwordVisible : passwordHidden}
              className=""
              onClick={() => setShowPass(!showPass)}
            />
          </div>
        </div>
        {showMore && (
          <div className="mt-2 w-full">
            <p className="pb-1 text-center text-xl">Notes</p>
            <p className="min-h-24 w-full bg-transparent p-1 text-left outline">
              {notes ?? "no notes :("}
            </p>
          </div>
        )}
        <div
          className="flex justify-center gap-2 py-2"
          onClick={() => setShowMore(!showMore)}
        >
          <p>More Detail</p>
          <Image alt="" src={unfold} className="" />
        </div>
      </div>
      <div className="z-10 h-[2px] w-full bg-gray-500 shadow-cardBottomShadow"></div>
    </div>
  );
}
