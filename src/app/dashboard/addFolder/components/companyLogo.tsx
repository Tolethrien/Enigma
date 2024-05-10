import type { Logos } from "@/app/logos";
import logos from "@/app/logos";
import Image from "next/image";

interface Props {
  name: Logos;
  isSelected: boolean;
  onClick: () => void;
}
export default function CompantyLogo({ name, isSelected, onClick }: Props) {
  return (
    <Image
      src={logos[name]}
      alt="logo icon"
      className={`${isSelected && "scale-110 shadow-iconShadow"}`}
      onClick={onClick}
    />
  );
}
