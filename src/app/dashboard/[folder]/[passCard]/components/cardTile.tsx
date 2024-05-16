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

export default function CardTile() {
  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="shadow-cardTopShadow z-10 h-[2px] w-full bg-gray-500"></div>
      <div className="bg-card-linear h-fit  w-[96%] text-center">
        <div className="flex h-1/4 justify-between">
          <Image src={starDark} alt="favorite icon" className="ml-2 w-5" />
          <div className="flex gap-4">
            <p className=" relative text-2xl">
              Main Accout
              <Image
                src={dateValid}
                alt="time validation icon"
                className="absolute left-[110%] top-1/4"
              />
            </p>
          </div>
          <ContextMenu
            onDelete={() => console.log()}
            onEdit={() => console.log()}
            className="mr-4"
          />
        </div>
        <div>
          <div className="flex  gap-6 py-1 pl-[20%] text-xl">
            <div className="flex gap-1">
              <Image alt="" src={log} className="" />
              <p className="w-20 text-start">login:</p>
            </div>
            <p>sosadasdsd</p>
          </div>
          <div className="flex gap-6 py-1 pl-[20%] text-xl">
            <div className="flex gap-1">
              <Image alt="" src={lock} className="" />
              <p className="w-20 text-start">Password:</p>
            </div>
            <p>sosadasdsd</p>
            <Image alt="" src={passwordHidden} className="" />
          </div>
        </div>
        <div className="flex justify-center gap-2 py-2">
          <p>More Detail</p>
          <Image alt="" src={unfold} className="" />
        </div>
      </div>
      <div className="shadow-cardBottomShadow z-10 h-[2px] w-full bg-gray-500"></div>
    </div>
  );
}
