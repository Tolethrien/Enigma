import Link from "next/link";
import LogoutButton from "./logoutButton";
import { getUserData } from "@/supabase/back";
import { NameToUpper } from "@/utils/helpers";

export default async function NavBar() {
  const { meta } = await getUserData();
  return (
    <div className="my-2 flex items-center justify-between gap-4 self-end pr-4 text-white">
      <div className="flex flex-col  text-right">
        <p className="text-2xl">Welcome {meta?.display_name ?? "User"}</p>
        <LogoutButton />
      </div>
      <Link
        href={"/dashboard/settings"}
        className="h-12 w-12 rounded-full bg-violet-400"
      >
        <p className="flex h-full items-center justify-center text-2xl ">
          {`${NameToUpper(meta?.display_name[0] ?? "X")}...${meta?.display_name.at(-1)}`}
        </p>
        {/* TODO: dodac jakas ikone usera */}
        {/* <Image
          src={nextImg}
          alt="user avatar"
          className="h-full w-full"
        ></Image> */}
      </Link>
    </div>
  );
}
