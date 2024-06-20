import Input from "@/app/components/input";
import { setNewPassword } from "@/server/supabase/actionsUser";

export default async function NewPass({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return (
    <div className="grid w-4/5 flex-grow grid-flow-row grid-rows-3 place-items-center text-xl text-white sm:w-96">
      <h1 className="text-center text-5xl">Enigma</h1>
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
