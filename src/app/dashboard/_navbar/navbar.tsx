import Link from "next/link";
import LogoutButton from "./components/logoutButton";
import { getUserData } from "@/server/supabase/back";

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
        <p className="flex h-full items-center justify-center text-2xl ">P.G</p>
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
