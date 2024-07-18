import OptionTitle from "../_components/optionTitle";
import ScrollableContent from "@/app/_components/scrollContent";
import { updateUserName } from "@/server/supabase/actionsUser";
import { assertion, NameToUpper } from "@/utils/helpers";
import Input from "@/app/_components/input";
import { getUserData } from "@/server/supabase/back";

export default async function ChangeName() {
  const { meta } = await getUserData();
  assertion(meta);
  return (
    <div className="flex flex-grow flex-col">
      <OptionTitle title="Change Name" />
      <ScrollableContent>
        <div className="h-full w-full py-6">
          <form className="flex h-full flex-col items-center  gap-6">
            <p className="text-2xl text-slate-300">
              Currenty you are known as:
            </p>
            <p className="text-3xl">{NameToUpper(meta.display_name)}</p>
            <p className="text-2xl text-slate-300">
              how you want to be name from now?
            </p>
            <Input
              placeholder="new name"
              formID="name"
              type="text"
              className="my-5 w-3/4 text-3xl"
            />
            <button
              formAction={updateUserName}
              className="mb-5 mt-auto text-3xl"
            >
              Change Name!
            </button>
          </form>
        </div>
      </ScrollableContent>
    </div>
  );
}
