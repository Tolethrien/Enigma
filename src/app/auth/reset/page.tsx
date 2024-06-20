import Input from "@/app/components/input";
import { sendPasswordReset } from "@/server/supabase/actionsUser";
import { getUserData } from "@/server/supabase/back";
import { redirect } from "next/navigation";

export default async function Reset() {
  const { user } = await getUserData();

  if (user) redirect("/dashboard");

  return (
    <div className="grid w-4/5 flex-grow grid-flow-row grid-rows-3 place-items-center text-xl text-white sm:w-96">
      <h1 className="text-center text-5xl">Enigma</h1>
      <div className="grid gap-12">
        <p>
          Please, enter your email adress. You will receive a link to create a
          new password.
        </p>
        <form className="flex w-full flex-col items-center gap-8">
          <Input
            placeholder="email"
            type="email"
            formID="email"
            required
          ></Input>
          <button formAction={sendPasswordReset}>Send!</button>
        </form>
      </div>
    </div>
  );
}
