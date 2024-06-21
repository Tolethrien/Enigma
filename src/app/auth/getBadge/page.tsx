"use client";
import { generateBadge, loadImage, readBadge } from "@/crypto/stegano";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function GetBadge() {
  const [data, setData] = useState<string>("");
  const keys = {
    1: "8550d48bcd29b9ad478fde832d8fb7fb5293b8922db0be15344fd8b9e2e56f73",
    2: "4e793c8c44771631bd73b5f50807eaeaa8968047146c92f610709ccce2140f70",
    3: "7aef4716c4768e9b8a36d739b848a27122f23378041feb9b8afe023694d687d1",
    4: "a1987e6e2a9d4a77900bec4d055c8aa78a68b6b0862a24b00afa2a3eb15752e3",
    5: "637f9cf5801b4e3bcbd2ae0af6766b42309320cb9fae37c74a207fea17d93c44",
    6: "f9db09f72a3ea1643d5bb44abbb6edd6",
    7: "98a90bbfc61694adef7cca71bb062f86",
    8: "863c3457013eae92bae3cae1a8b5cbe4",
    9: "0aa4fd8d8baaec9baa34d0d3b0c9d866",
    10: "486a29d4fe44d48a785ff7674bd94dd3",
  };
  useEffect(() => {
    const createBadge = async () => {
      const data = await generateBadge({ key: keys[2], iv: keys[8] });
      setData(data);
      localStorage.setItem("badge", data);
      //   const img = await loadImage(localStorage.getItem("badge")!);
      //   const { iv, key } = readBadge(img);
      //   console.log(iv, key);
    };
    createBadge();
  }, []);
  return (
    <div className="flex h-full flex-col">
      <h1 className="mt-[8vh] text-center text-5xl">Enigma</h1>
      <div className="mt-[5vh] flex w-full flex-grow flex-col items-center gap-4">
        {data.length === 0 ? (
          <>
            <p className="text-2xl">Geenerating Badge...</p>
            <div className="h-8 w-8 animate-spin bg-violet-300"></div>
          </>
        ) : (
          <img src={data} alt="img" width={280} height={320} />
        )}
        <p className="px-8 text-center text-2xl">
          Save this Badge as image and keep it safe! It is your decryption key!
        </p>
        <button className={`flex w-fit gap-2 rounded-md border-2 px-4 py-1`}>
          <p>Save!</p>
        </button>
      </div>
      <Link
        href="/dashboard"
        className="my-[10vh] text-center text-2xl text-violet-200"
      >
        Start App!
      </Link>
    </div>
  );
}
