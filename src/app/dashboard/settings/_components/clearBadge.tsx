"use client";

import Dialog from "@/app/_components/dialog";
import { getLocalStorage, getSessionStorage } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string;
}
export default function ClearBadge({ id }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const clearData = () => {
    const localStore = getLocalStorage();
    const sessStore = getSessionStorage();
    localStore?.removeItem(`badge-${id}`);
    sessStore?.removeItem("enigmaKey");
    sessStore?.removeItem("enigmaIv");
    router.refresh();
    setOpen(false);
  };
  return (
    <>
      <button
        className="text-xl text-red-700"
        onClick={() => setOpen(true)}
        disabled
      >
        {"Clear Badge (Disabled in Demo)"}
      </button>
      {open && (
        <Dialog>
          <div className="flex w-full justify-end px-4 pb-8 pt-4">
            <button
              className="text-2xl text-slate-50"
              onClick={() => setOpen(false)}
            >
              X
            </button>
          </div>
          <p className="py-4 text-center text-3xl text-slate-50">
            Are you sure you want to clear your badge?
          </p>
          <p className="py-8 text-center text-2xl text-slate-300">
            This action can lead to unexpected errors and prevent you from
            decrypt your data
          </p>
          <div className="flex flex-col gap-8 py-8">
            <button
              className={`flex w-fit rounded-md border-2 border-emerald-800 px-12 py-1 text-3xl text-emerald-500`}
              onClick={() => setOpen(false)}
            >
              Back!
            </button>
            <button
              className={`flex w-fit rounded-md border-2 border-red-800 px-12 py-1 text-3xl text-red-500`}
              onClick={clearData}
            >
              Clear!
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
