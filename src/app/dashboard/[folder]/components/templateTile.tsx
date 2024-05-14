import Image from "next/image";
import { AvalibleIconColorsT, COLORS } from "./colorIcon";
import logos, { type Logos } from "@/app/logos";
import { NameToUpper } from "@/utils/helpers";
import { AddFolderIconTypes } from "@/types/types";
interface Props {
  name: string;
  icon: AddFolderIconTypes;
}
export default function TemplateTile({ icon, name }: Props) {
  const isIcon = icon in logos ? true : false;
  return (
    <div className=" flex h-24 w-24 flex-col items-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow">
      <div className="h-1/5 w-full"></div>
      {isIcon ? (
        <Image
          src={logos[icon as Logos]}
          alt=""
          className="flex h-1/2 w-1/2  shadow-iconImgShadow"
        ></Image>
      ) : (
        <div
          className={`flex h-1/2 w-1/2 shadow-iconImgShadow ${COLORS[icon as AvalibleIconColorsT].bg} items-center justify-center text-4xl`}
        >
          {NameToUpper(name.charAt(0))}
        </div>
      )}
      <p className="inline-block h-[30%] max-w-24 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center leading-[175%] text-white">
        {name === "" ? "Name" : NameToUpper(name)}
      </p>
    </div>
  );
}
