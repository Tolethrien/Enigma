"use client";
import { loadImage, readBadge } from "@/crypto/stegano";
import { GetUserID } from "@/server/supabase/clientUser";
import { getLocalStorage, getSessionStorage } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}
interface AppProvider {}
// zmienic na layout dashbordu nie apki calej

// export const AppContext = createContext<AppProvider>({});
export default function CreedsVerification({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const getCreds = async () => {
      const sessStore = getSessionStorage();
      const localStore = getLocalStorage();
      //TODO: error handler tu bo moze go nie byc
      //TODO: dodac ze poki effekt sie nie skonczy bedzie jakis spinner ze sie dzieje
      const id = await GetUserID();
      const badgeID = localStore?.getItem(`badge-${id}`);
      if (!badgeID) return; // TODO: fallback to error
      const img = await loadImage(badgeID);
      const { iv, key } = readBadge(img);
      sessStore?.setItem("enigmaKey", key);
      sessStore?.setItem("enigmaIv", iv);
      router.refresh();
    };
    getCreds();
  }, []);
  return <>{children}</>;
}
