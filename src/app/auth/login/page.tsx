import { getUserData } from "@/server/supabase/back";
import { redirect } from "next/navigation";
import Link from "next/link";
import Input from "@/app/components/input";
import { login } from "@/server/supabase/actionsUser";

export default async function Login() {
  const { user } = await getUserData();
  if (user) redirect("/dashboard");
  return (
    <div className="grid w-4/5 flex-grow grid-flow-row grid-rows-3 place-items-center text-xl text-white sm:w-96">
      <h1 className="text-center text-5xl">Enigma</h1>
      <div className="grid gap-8">
        <form className="flex w-full flex-col items-center gap-4">
          <Input
            placeholder="email"
            type="email"
            formID="email"
            required
          ></Input>
          <Input
            placeholder="password"
            type="password"
            formID="password"
            required
          ></Input>
          <button formAction={login}>Login</button>
        </form>
        <Link href={"./register"} className="text-center">
          Register
        </Link>
      </div>
      <Link href={"./reset"} className="justify-self-end">
        forgot again?
      </Link>
    </div>
  );
}
