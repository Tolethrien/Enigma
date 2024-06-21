import OptionSlot from "./_components/optionSlot";
import Modal from "./_components/modal";
import ScrollableContent from "@/app/components/scrollContent";
import Link from "next/link";
export type ParamType =
  | "name"
  | "email"
  | "stegano"
  | "password"
  | "avatar"
  | "delete"
  | "upload";
interface Props {
  searchParams: { option: ParamType };
}
export default function UserSettings({ searchParams }: Props) {
  return (
    <>
      {searchParams.option && <Modal modalType={searchParams.option} />}
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
          <OptionSlot optionName="Name" optionValue="Pavel" param={"name"} />
          <OptionSlot
            optionName="Email"
            optionValue="some@some.pl"
            param={"email"}
          />
          <OptionSlot
            optionName="Password"
            optionValue="********"
            param={"password"}
          />
          <OptionSlot
            optionName="Avatar"
            optionValue="ava.png"
            param={"avatar"}
          />
        </div>
        {/* persona */}
        <div className="w-full px-4">
          <p className="w-full border-b text-center text-2xl">
            Personalization
          </p>
          <p className="text-center">--------</p>
          {/* <OptionSlot
              optionName="Use Stegano..."
              optionValue="true"
              param={"stegano"}
              /> */}
        </div>
        {/* Denger zone */}
        <div className="w-full px-4 text-center *:py-2">
          <p className="w-full border-b text-2xl">Danger Zone</p>
          <p className="text-xl text-red-700">Delete Account</p>
          <p className="text-xl text-violet-700">Upload Badge</p>
        </div>
      </ScrollableContent>
    </>
  );
}
