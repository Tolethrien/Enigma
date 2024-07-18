import OptionTitle from "../_components/optionTitle";
import ScrollableContent from "@/app/_components/scrollContent";
import {
  sendPasswordReset,
  updateUserEmail,
} from "@/server/supabase/actionsUser";
import { assertion, NameToUpper } from "@/utils/helpers";
import Input from "@/app/_components/input";
import { getUserData } from "@/server/supabase/back";

export default async function ChangePassword() {
  const { meta } = await getUserData();
  assertion(meta);
  return (
    <div className="flex flex-grow flex-col">
      <OptionTitle title="Change Email" />
      <ScrollableContent>
        <div className="h-full w-full px-4 py-6">
          <form className="flex h-full flex-col items-center  gap-6">
            <p className="text-2xl text-slate-300">
              Currenty your password is:
            </p>
            <p className="text-3xl">**********</p>
            <div className="-mt-6 *:text-center *:text-sm *:text-slate-300 ">
              <p>{"C'mon!"}</p>
              <p>
                {
                  "we're not gonna show you your password just like that, obviously :)"
                }
              </p>
            </div>
            <p className="mt-4 text-2xl text-slate-300">
              please provide us with your email address so that we can send you
              a link to reset your password
            </p>
            {/* TODO: dodac guzik pokaz hasło */}
            <Input
              placeholder="current email"
              formID="email"
              type="email"
              className="my-5 w-3/4 text-3xl"
            />
            <button
              formAction={sendPasswordReset}
              className="mb-5 mt-auto text-3xl"
            >
              Send Email!
            </button>
          </form>
        </div>
      </ScrollableContent>
    </div>
  );
}
