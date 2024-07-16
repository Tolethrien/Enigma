import { NameToUpper } from "@/utils/helpers";
import { AddFolderIconTypes } from "@/types/types";
import GeneratedFolderIcon from "@/app/_components/generatedIcon";
interface Props {
  name: string;
  icon: AddFolderIconTypes;
}
export default function TemplateTile({ icon, name }: Props) {
  return (
    <div className=" flex h-24 w-24 flex-col items-center rounded-md border-2 border-[#565656] bg-iconColor shadow-iconShadow">
      <div className="h-1/5 w-full"></div>
      <GeneratedFolderIcon folderIcon={icon} folderName={name} />
      <p className="inline-block h-[30%] max-w-24 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center leading-[175%] text-white">
        {name === "" ? "Name" : NameToUpper(name)}
      </p>
    </div>
  );
}
