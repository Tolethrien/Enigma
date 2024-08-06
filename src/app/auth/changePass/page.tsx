import Input from "@/app/_components/input";
import { setNewPassword } from "@/server/supabase/actionsUser";

export default async function NewPass({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  console.log("params", searchParams.code);
  return (
    <div className="flex-grow text-xl text-white">
      <h1 className="py-16 text-center text-5xl">Enigma</h1>
      <div className="grid">
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
