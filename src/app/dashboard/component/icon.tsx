import Link from "next/link";
import menuIco from "@/app/assets/menuIco.svg";
import Image from "next/image";
interface Props {
  name?: string;
  folderID: number;
  isNewButton?: boolean;
}
export default function Icon({ folderID, name }: Props) {
  return (
    <div className="flex h-24 w-24 flex-col rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow">
      <Link href={`./dashboard/${folderID}/edit`}>
        <Image
          src={menuIco}
          alt="menu"
          className=" mb-1 mr-1 h-4 w-4 self-end"
        ></Image>
      </Link>
      <Link
        href={`./dashboard/${folderID}`}
        className="h-1/2 w-1/2 self-center bg-black shadow-iconImgShadow"
      ></Link>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-white">
        {name ?? "undefined"}
      </p>
    </div>
  );
}
