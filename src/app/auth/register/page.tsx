import { createServerClient } from "@/server/supabase/back";
import { signup } from "../actions/actions";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = createServerClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <p>REGISTER</p>
      <form className="flex flex-col items-center text-slate-700">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={signup}>sign up</button>
      </form>
    </>
  );
}
