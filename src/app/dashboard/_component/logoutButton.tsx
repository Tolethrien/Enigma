"use client";

import Dialog from "@/app/_components/dialog";
import { LogoutUser } from "@/supabase/clientUser";
import { getSessionStorage } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function Logout() {
    const sessStore = getSessionStorage();
    sessStore?.clear();
    await LogoutUser();
    router.refresh();
  }
  return (
    <>
      <p
        onClick={() => setIsOpen(true)}
        className="-mr-2 cursor-pointer pt-2 text-lg"
      >
        Logout
      </p>
      {isOpen && (
        <Dialog>
          <div className="flex w-full justify-end px-4 pb-8 pt-4">
            <button
              className="text-2xl text-slate-50"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
          <p className="py-4 text-center text-2xl text-slate-50">
            Are you sure you want to logout?
          </p>
          <div className="flex flex-col items-center gap-8 py-8">
            <button
              className={`flex w-fit rounded-md border-2 border-emerald-800 px-12 py-1 text-2xl text-emerald-500`}
              onClick={() => setIsOpen(false)}
            >
              Back!
            </button>
            <button
              className={`flex w-fit rounded-md border-2 border-red-800 px-12 py-1 text-2xl text-red-500`}
              onClick={Logout}
            >
              Logout!
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
