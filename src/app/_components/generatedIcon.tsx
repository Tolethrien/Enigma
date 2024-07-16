import { NameToUpper } from "@/utils/helpers";
import logos, { Logos } from "../../utils/logos";
import Image from "next/image";
import {
  AvalibleIconColorsT,
  COLORS,
} from "../dashboard/[folder]/_components/colorIcon";
export default function GeneratedFolderIcon({
  folderIcon,
  folderName,
  className,
}: {
  folderIcon: string;
  folderName: string;
  className?: string;
}) {
  const isLogo = folderIcon in logos ? true : false;
  return (
    <>
      {isLogo ? (
        <Image
          src={logos[folderIcon as Logos]}
          alt="logo"
          className={`flex h-1/2 w-1/2  shadow-iconImgShadow ${className}`}
        ></Image>
      ) : (
        <div
          className={`flex h-1/2 w-1/2 shadow-iconImgShadow ${COLORS[folderIcon as AvalibleIconColorsT]?.bg ?? "bg-red-300"} ${className} items-center justify-center text-4xl`}
        >
          {NameToUpper(folderName.charAt(0))}
        </div>
      )}
    </>
  );
}
