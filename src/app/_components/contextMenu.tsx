import Image from "next/image";
import menuIco from "@/app/_assets/menuIco.svg";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from "./dialog";
interface Props {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
  name: string;
}
export default function ContextMenu({
  onEdit,
  onDelete,
  className,
  name,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
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
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModal(false);
  };
  return (
    <>
      <button
        className={`relative ${className} flex h-full w-full items-center justify-end `}
        ref={ref}
        onClick={openMenu}
      >
        <Image src={menuIco} alt="menu" className="mr-2" />
        {isOpen && (
          <div className="absolute right-1 top-1/2 rounded-md  bg-[#313640] py-1 shadow-iconShadow *:px-6 *:text-base *:mini:text-xl sm:*:text-2xl">
            <p className="hover:bg-slate-700" onClick={editTile}>
              Edit
            </p>
            <p className="hover:bg-slate-700" onClick={() => setIsModal(true)}>
              Delete
            </p>
          </div>
        )}
      </button>
      {isModal && (
        <Dialog>
          <div className="flex w-full justify-end px-4 pb-8 pt-4">
            <button className="text-2xl text-slate-50" onClick={closeModal}>
              X
            </button>
          </div>
          <p className="py-4 text-center text-2xl text-slate-50">
            Are you sure you want to delete this?
          </p>
          <p className="w-full pb-8 text-center text-xl text-slate-300">
            Note! This action will delete every data about{" "}
          </p>
          <p className=" max-w-[80%] overflow-hidden   text-ellipsis text-nowrap text-xl text-slate-50">
            {name}
          </p>
          <div className="flex flex-col items-center gap-8 py-8">
            <button
              className={`flex w-fit rounded-md border-2 border-emerald-800 px-12 py-1 text-2xl text-emerald-500`}
              onClick={closeModal}
            >
              Back!
            </button>
            <button
              className={`flex w-fit rounded-md border-2 border-red-800 px-12 py-1 text-2xl text-red-500`}
              onClick={deleteTile}
            >
              Delete!
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
