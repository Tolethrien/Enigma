import OptionTitle from "../_components/optionTitle";
import ScrollableContent from "@/app/_components/scrollContent";
import { updateUserEmail } from "@/server/supabase/actionsUser";
import { assertion, NameToUpper } from "@/utils/helpers";
import Input from "@/app/_components/input";
import { getUserData } from "@/server/supabase/back";

export default async function ChangeEmail() {
  const { meta } = await getUserData();
  assertion(meta);
  return (
    <>
      <div className="flex flex-col">
        <OptionTitle title="Change Email" />
      </div>
      <ScrollableContent>
        <div className="h-full w-full py-6">
          <form className="flex h-full flex-col items-center  gap-6">
            <p className="text-2xl text-slate-300">Currenty your email is:</p>
            <p className="text-3xl">{meta.email}</p>
            <p className="text-2xl text-slate-300">
              what email you want to use from now?
            </p>
            <Input
              placeholder="new email"
              formID="email"
              type="email"
              className="my-5 w-3/4 text-3xl"
            />
            <button
              formAction={updateUserEmail}
              className="mb-5 mt-auto text-3xl"
            >
              Change Email!
            </button>
          </form>
        </div>
      </ScrollableContent>
    </>
  );
}
