import { createServerClient } from "@/server/supabase/back";
import { login } from "../actions/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Login() {
  const supabase = createServerClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex w-3/4 flex-grow flex-col items-center justify-evenly text-xl text-white sm:w-96">
      <h1 className="py-8 text-5xl">Enigma</h1>
      <form className="flex w-full flex-col items-center gap-8 ">
        <label htmlFor="email" className="hidden">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          required
          className="w-full border-b-2 bg-transparent  text-center placeholder-gray-400 outline-none"
        />
        <label htmlFor="password" className="hidden">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
          className="w-full border-b-2 bg-transparent   text-center placeholder-gray-400 outline-none"
        />
        <button formAction={login}>Login</button>
        <Link href={"./register"}>Register</Link>
      </form>
      <Link href={"./register"} className="self-end">
        forgot again?
      </Link>
    </div>
  );
}
