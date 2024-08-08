import { getUserData } from "@/supabase/back";
import { redirect } from "next/navigation";
import Input from "@/app/_components/input";
import { signup } from "@/supabase/actionsUser";
import Link from "next/link";

export default async function Register({
  searchParams,
}: {
  searchParams: { invalid: "true" };
}) {
  const { user } = await getUserData();
  if (user) redirect("/dashboard");

  return (
    <div className="flex h-full flex-col">
      <h1 className="my-[8vh] text-center text-5xl">Enigma</h1>
      <Link href="/auth/login" className="absolute right-8 top-[10vh] text-2xl">
        X
      </Link>
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
          <Input placeholder="name" type="text" formID="name" required></Input>
          <button formAction={signup}>Start!</button>
        </form>
        {searchParams.invalid && (
          <p className=" w-3/4 text-center text-xl text-red-700">
            The password must be at least 8 characters long, lowercase and
            uppercase letters and include a digit and a special character.
          </p>
        )}
      </div>
    </div>
  );
}
