"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loadImage, readBadge } from "@/crypto/stegano";
import { getLocalStorage, getSessionStorage, saveBadge } from "@/utils/helpers";
import { DEMO_BADGE } from "@/crypto/demo";
interface Props {
  id: string;
}
export default function Badge({ id }: Props) {
  const localStore = getLocalStorage();
  const router = useRouter();
  //DEMO VERSION - Hardcoded badge image
  const badge = DEMO_BADGE;
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const sessStore = getSessionStorage();
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      localStore?.setItem(`badge-${id}`, base64);
      const img = await loadImage(base64);
      const { iv, key } = readBadge(img);
      sessStore?.setItem("enigmaKey", key);
      sessStore?.setItem("enigmaIv", iv);
      router.refresh();
    };
  };

  return (
    <>
      {!badge && (
        <p>
          There is no Badge uploaded, you cannot decrypt your data without it!
        </p>
      )}
      <div className="relative my-8 flex h-[328px] w-[288px] items-center justify-center rounded-md border-2 border-gray-500">
        {!badge ? (
          <label className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap rounded-md border-2 border-gray-400 px-4  py-2 text-xl ">
            Upload Badge
            <input
              className="hidden"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            ></input>
          </label>
        ) : (
          <>
            <Image src={badge} alt="img" width={280} height={320} unoptimized />
            <div className="absolute flex h-[320px] w-[280px] items-center justify-center bg-black bg-opacity-15">
              <button
                className="rounded-md border-2 border-gray-400 bg-primeBG  px-4 py-2 text-xl"
                onClick={() => saveBadge(badge)}
              >
                Save Badge
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
