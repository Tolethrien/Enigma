import Image from "next/image";
import menuIco from "@/app/assets/menuIco.svg";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}
export default function ContextMenu({ onEdit, onDelete, className }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    window.addEventListener("mousedown", handleOutSideClick);
  };

  const handleOutSideClick = (event: MouseEvent) => {
    if (!ref.current?.contains(event.target as Node)) {
      window.removeEventListener("mousedown", handleOutSideClick);
      setIsOpen(false);
    }
  };
  const editTile = () => {
    window.removeEventListener("mousedown", handleOutSideClick);
    onEdit();
  };
  const deleteTile = async () => {
    window.removeEventListener("mousedown", handleOutSideClick);
    onDelete();
    router.refresh();
  };
  return (
    <button className={`relative ${className} `} ref={ref} onClick={openMenu}>
      <Image src={menuIco} alt="menu" className="mr-2" />
      {isOpen && (
        <div className="*:mini:text-xl absolute right-1 top-1/2  rounded-md bg-[#313640] py-1 shadow-iconShadow *:px-6 *:text-base sm:*:text-2xl">
          <p className="hover:bg-slate-700" onClick={editTile}>
            Edit
          </p>
          <p className="hover:bg-slate-700" onClick={deleteTile}>
            Delete
          </p>
        </div>
      )}
    </button>
  );
}
