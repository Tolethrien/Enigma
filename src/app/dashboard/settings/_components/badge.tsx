"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetUserID } from "@/server/supabase/clientUser";
import { loadImage, readBadge } from "@/crypto/stegano";
interface Props {
  id: string;
}
export default function Badge({ id }: Props) {
  const [badge, setBadge] = useState(localStorage.getItem(`badge-${id}`));
  //   const base64 = localStorage.getItem(`badge-${id}`);
  const router = useRouter();
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      localStorage.setItem(`badge-${id}`, base64);
      const img = await loadImage(base64);
      const { iv, key } = readBadge(img);
      sessionStorage.setItem("enigmaKey", key);
      sessionStorage.setItem("enigmaIv", iv);
      setBadge(base64);
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
          <Image src={badge} alt="img" width={280} height={320} unoptimized />
        )}
      </div>
    </>
  );
}
