"use client";
import { generateBadge } from "@/crypto/stegano";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateCreds } from "@/crypto/cipher";
import { getLocalStorage, saveBadge } from "@/utils/helpers";
import { GetUserID } from "@/server/supabase/clientUser";

type BadgeState = "unverified" | "haveBadge" | "needBadge";
export default function GeneratedBadge() {
  const localStore = getLocalStorage();
  const [data, setData] = useState<string>("");
  const [badgeState, setBadgeState] = useState<BadgeState>("unverified");

  const route = useRouter();
  const { iv, key } = generateCreds();

  useEffect(() => {
    //NOTE: reactStrictMode renders this 2 times so it not work as it should on dev mode but it works on prod
    const createBadge = async () => {
      const userID = await GetUserID();
      const haveBadge = localStore?.getItem(`badge-${userID}`) ? true : false;
      if (haveBadge) {
        setBadgeState("haveBadge");
        route.push("/dashboard");
      } else {
        const data = await generateBadge({ key, iv });
        localStore?.setItem(`badge-${userID}`, data);
        setData(data);
        setBadgeState("needBadge");
      }
    };
    createBadge();
  }, []);

  if (badgeState === "unverified")
    return <p className=" text-2xl">verifying</p>;
  return (
    <>
      {badgeState === "haveBadge" ? (
        <>
          <p className="text-2xl">Redirecting...</p>
          <p className="text-xl">Badge already generated</p>
        </>
      ) : (
        <>
          {data.length === 0 ? (
            <>
              <p className="text-2xl">Geenerating Badge...</p>
              <div className="h-8 w-8 animate-spin bg-violet-300"></div>
            </>
          ) : (
            <Image src={data} alt="img" width={280} height={320} unoptimized />
          )}
          <p className="px-8 text-center text-2xl">
            Save this Badge as image and keep it safe! It is your decryption
            key!
          </p>
          <button
            className={`flex w-fit gap-2 rounded-md border-2 px-4 py-1`}
            onClick={() => saveBadge(data)}
          >
            <p>Save!</p>
          </button>
          <Link
            href="/dashboard"
            className="mt-6 text-center text-2xl text-violet-200"
          >
            Start App!
          </Link>
        </>
      )}
    </>
  );
}
