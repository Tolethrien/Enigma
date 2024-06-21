import { getUserData } from "@/server/supabase/back";
import { redirect } from "next/navigation";
import Link from "next/link";
import Input from "@/app/components/input";
import { login } from "@/server/supabase/actionsUser";

export default async function Login() {
  const { user } = await getUserData();
  if (user) redirect("/dashboard");
  return (
    <div className="flex h-full flex-col">
      <h1 className="my-[10vh] text-center text-5xl">Enigma</h1>
      <div className="mt-[10vh] flex w-full flex-grow flex-col items-center gap-8">
        <form className="flex flex-col gap-8 *:text-2xl *:placeholder:text-lg">
          <Input
            placeholder="Email"
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
        <Link
          href={"./register"}
          className="flex w-full items-center justify-center text-2xl"
        >
          Register
        </Link>
      </div>
      <Link href={"./reset"} className="my-[15vh] mr-6 text-right text-2xl">
        forgot again?
      </Link>
    </div>
  );
}
