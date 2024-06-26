"use client";
import { loadImage, readBadge } from "@/crypto/stegano";
import { GetUserID } from "@/server/supabase/clientUser";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
interface Props {
  children: React.ReactNode;
}
interface AppProvider {}
// zmienic na layout dashbordu nie apki calej

export const AppContext = createContext<AppProvider>({});
export default function AppProvider({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const getCreds = async () => {
      //TODO: error handler tu bo moze go nie byc
      //TODO: dodac ze poki effekt sie nie skonczy bedzie jakis spinner ze sie dzieje
      console.log("provider");
      const id = await GetUserID();
      const img = await loadImage(localStorage.getItem(`badge-${id}`)!);
      const { iv, key } = readBadge(img);
      sessionStorage.setItem("enigmaKey", key);
      sessionStorage.setItem("enigmaIv", iv);
      router.refresh();
    };
    getCreds();
  }, []);
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
