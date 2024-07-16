"use client";

import { getLocalStorage, getSessionStorage } from "@/utils/helpers";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}
export default function ClearBadge({ id }: Props) {
  const router = useRouter();
  const clearData = () => {
    const localStore = getLocalStorage();
    const sessStore = getSessionStorage();
    localStore?.removeItem(`badge-${id}`);
    sessStore?.removeItem("enigmaKey");
    sessStore?.removeItem("enigmaIv");
    router.refresh();
  };
  return (
    <button className="text-xl text-red-700" onClick={clearData}>
      Clear Badge
    </button>
  );
}
