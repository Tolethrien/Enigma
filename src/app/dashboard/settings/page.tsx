import OptionSlot from "./_components/optionSlot";
import ScrollableContent from "@/app/_components/scrollContent";
import Link from "next/link";
import { getUserData } from "@/server/supabase/back";
import Badge from "./_components/badge";
import { assertion } from "@/utils/helpers";
import ClearBadge from "./_components/clearBadge";
import DeleteAccount from "./_components/deleteAcc";

export default async function UserSettings() {
  const { meta, user } = await getUserData();
  const id = user?.id;
  assertion(id);
  if (!meta) return <div>something went wrong...</div>;
  return (
    <>
      <div className="flex justify-between px-4 pb-8 pt-4">
        <h2 className="w-full text-center text-2xl">Options</h2>
        <Link href="/dashboard" className="text-2xl">
          X
        </Link>
      </div>
      <ScrollableContent>
        {/* user */}
        <div className="w-full px-4">
          <p className="w-full border-b text-center text-2xl">User</p>
          <OptionSlot
            optionName="Name"
            optionValue={meta.display_name}
            param={"name"}
          />
          <OptionSlot
            optionName="Email"
            optionValue={meta.email}
            param={"email"}
          />
          <OptionSlot
            optionName="Password"
            optionValue="********"
            param={"password"}
          />

          {/* <OptionSlot
            optionName="Avatar"
            optionValue="ava.png"
            param={"avatar"}
          /> */}
        </div>
        {/* persona */}
        <div className="w-full px-4">
          <p className="w-full border-b text-center text-2xl">
            Personalization
          </p>
          <p className="py-4 text-center">Nothing to personlize yet :) </p>
          {/* <OptionSlot
              optionName="Use Stegano..."
              optionValue="true"
              param={"stegano"}
              /> */}
        </div>
        {/* Badge */}
        <div className="flex w-full flex-col items-center px-4 text-center *:py-2">
          <p className="w-full border-b text-2xl">Badge</p>
          <Badge id={id} />
        </div>
        {/* Denger zone */}
        <div className="flex w-full flex-col px-4 text-center *:py-2">
          <p className="mb-2 w-full border-b text-2xl">Danger Zone</p>
          <DeleteAccount id={id} />
          <ClearBadge id={id} />
        </div>
      </ScrollableContent>
    </>
  );
}
