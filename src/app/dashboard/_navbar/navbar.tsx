import Link from "next/link";
import LogoutButton from "./components/logoutButton";
import { getUserData } from "@/server/supabase/back";

export default async function NavBar() {
  const { meta } = await getUserData();
  return (
    <div className="flex justify-between gap-2 self-end pr-2 pt-2 text-white">
      <div className="flex flex-col gap-2 text-right">
        <p className="text-base">Welcome {meta?.display_name ?? "User"}</p>
        <LogoutButton />
      </div>
      <Link
        href={"./dashboard/settings"}
        className="h-12 w-12 rounded-full bg-black"
      >
        {/* <Image
          src={nextImg}
          alt="user avatar"
          className="h-full w-full"
        ></Image> */}
      </Link>
    </div>
  );
}
