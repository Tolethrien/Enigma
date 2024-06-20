import { getUserData } from "@/server/supabase/back";
import { redirect } from "next/navigation";
import Input from "@/app/components/input";
import { signup } from "@/server/supabase/actionsUser";

export default async function Login() {
  const { user } = await getUserData();

  if (user) redirect("/dashboard");

  return (
    <div className="grid w-4/5 flex-grow grid-flow-row grid-rows-3 place-items-center text-xl text-white sm:w-96">
      <h1 className="text-center text-5xl">Enigma</h1>
      <div className="grid">
        <form className="flex w-full flex-col items-center gap-8">
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
          <Input placeholder="name" type="text" formID="name" required></Input>
          <button formAction={signup}>Start!</button>
        </form>
      </div>
    </div>
  );
}
