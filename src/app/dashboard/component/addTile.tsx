import Image from "next/image";
import Link from "next/link";
import plusIco from "@/app/assets/plusIco.svg";
export default function AddTile() {
  return (
    <Link
      className=" mini:h-28 mini:w-28 flex h-20 w-20 flex-col items-center justify-self-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow sm:h-36 sm:w-36 md:h-48 md:w-48"
      href={`./dashboard/addFolder`}
    >
      <div className="h-1/5 w-full"></div>
      <div className="flex h-1/2 w-1/2 items-center justify-center bg-[#434F64] shadow-iconImgShadow">
        <Image src={plusIco} alt="" className="h-1/2 w-1/2"></Image>
      </div>
      <p className="flex h-[30%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-white">
        Add New
      </p>
    </Link>
  );
}
