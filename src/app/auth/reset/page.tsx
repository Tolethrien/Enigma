import Input from "@/app/components/input";
import { sendPasswordReset } from "@/server/supabase/actionsUser";
import { getUserData } from "@/server/supabase/back";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Reset() {
  const { user } = await getUserData();

  if (user) redirect("/dashboard");

  return (
    <div className="flex h-full flex-col">
      <h1 className="my-[10vh] text-center text-5xl">Enigma</h1>
      <Link href="/auth/login" className="absolute right-8 top-[10vh] text-2xl">
        X
      </Link>
      <div className="mt-[10vh] flex w-full flex-grow flex-col items-center gap-8">
        <p className="px-8 text-center text-2xl">
          Please, enter your email adress. You will receive a link to create a
          new password.
        </p>
        <form className="flex flex-col gap-8 *:text-2xl *:placeholder:text-lg">
          <Input
            placeholder="Email"
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
