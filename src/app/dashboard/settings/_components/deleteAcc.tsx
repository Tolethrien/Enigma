"use client";

import Dialog from "@/app/_components/dialog";
import { deleteUser } from "@/supabase/actionsUser";
import { getLocalStorage, getSessionStorage } from "@/utils/helpers";
import { useState } from "react";

interface Props {
  id: string;
}
export default function DeleteAccount({ id }: Props) {
  const [open, setOpen] = useState(false);
  const [inputDel, setInputDel] = useState("");
  const [inputDelError, setInputDelError] = useState(false);
  const deleteAcc = async () => {
    if (inputDel !== "delete") {
      setInputDelError(true);
      return;
    }
    const localStore = getLocalStorage();
    const sessStore = getSessionStorage();
    localStore?.removeItem(`badge-${id}`);
    sessStore?.removeItem("enigmaKey");
    sessStore?.removeItem("enigmaIv");
    await deleteUser();
  };
  const clearDialog = () => {
    setInputDelError(false);
    setInputDel("");
    setOpen(false);
  };
  return (
    <>
      <button
        className="text-xl text-red-700"
        onClick={() => setOpen(true)}
        disabled
      >
        {"Delete Account (Disabled in Demo)"}
      </button>
      {open && (
        <Dialog>
          <div className="flex w-full justify-end px-4 pb-8 pt-4">
            <button className="text-2xl text-slate-50" onClick={clearDialog}>
              X
            </button>
          </div>
          <p className="py-4 text-center text-3xl text-slate-50">
            Are you sure you want to delete your account?
          </p>
          <p className="py-4 text-center text-2xl text-slate-300">
            all data will be lost for ever, we do not store any copies and
            backups!
          </p>
          <p className="py-4 text-center text-2xl text-slate-300">
            {'type "delete" to confirm you understand!'}
          </p>
          <input
            value={inputDel}
            onChange={(e) => setInputDel(e.target.value)}
            placeholder="delete"
            className={`border-b-2 bg-transparent  text-center text-2xl font-bold text-red-500 placeholder-gray-400 outline-none ${inputDelError && "border-2 border-red-500"} `}
          ></input>
          <div className="flex flex-col items-center gap-8 py-8">
            <button
              className={`flex w-fit rounded-md border-2 border-emerald-800 px-4 py-1 text-2xl text-emerald-500`}
              onClick={clearDialog}
            >
              Go back!
            </button>
            <button
              className={`flex w-fit rounded-md border-2 border-red-800 px-4 py-1 text-2xl text-red-500`}
              onClick={deleteAcc}
            >
              Delete!
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
