import Image from "next/image";
import menuIco from "@/app/assets/menuIco.svg";
import Link from "next/link";
import { ParamType } from "../page";
interface Props {
  optionName: string;
  optionValue: string;
  param: ParamType;
}
export default function OptionSlot({ param, optionName, optionValue }: Props) {
  return (
    <div className="flex w-full  text-nowrap py-2 text-xl">
      <p className="w-[35%]">{optionName}</p>
      <p className="flex-grow">{optionValue}</p>
      <Link
        href={`./settings/${param}`}
        className="flex items-center justify-center"
      >
        <Image src={menuIco} alt="options" />
      </Link>
    </div>
  );
}
