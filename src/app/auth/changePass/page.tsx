import Input from "@/app/_components/input";
import { setNewPassword } from "@/supabase/actionsUser";

export default function NewPass({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return (
    <div className="flex-grow text-xl text-white">
      <h1 className="py-16 text-center text-5xl">Enigma</h1>
      <div className="grid">
        <p className="text-center">set new password</p>
        <p className="px-8 py-8 text-center text-base text-red-700">
          {
            "NOTE! Due to an error beyond my control, this password change page must be set on the same device and browser that you used to send request. Otherwise, you won't be able to change the password."
          }
        </p>
        <form className="flex w-full flex-col items-center gap-8">
          <Input
            placeholder=""
            type="text"
            defaultValue={searchParams.code}
            formID="code"
            required
            className="hidden"
          ></Input>
          <Input
            placeholder="new password"
            type="password"
            formID="password"
            required
          ></Input>
          <button formAction={setNewPassword}>change Password!</button>
        </form>
      </div>
    </div>
  );
}
