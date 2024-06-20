import { getUserData } from "@/server/supabase/back";
import Link from "next/link";
import { ParamType } from "../page";
import { NameToUpper } from "@/utils/helpers";
import {
  setNewPassword,
  updateUserEmail,
  updateUserName,
  uploadAvatar,
} from "@/server/supabase/actionsUser";

interface Props {
  modalType: ParamType;
}
export default function Modal({ modalType }: Props) {
  return (
    <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="m-auto bg-white p-8">
        <div className="flex flex-col items-center">
          {(modalType === "email" || modalType === "name") && (
            <NameAndEmailModal type={modalType} />
          )}
          {modalType === "password" && <PasswordReset />}
          {modalType === "avatar" && <FileInput />}
        </div>
        <Link href={{ pathname: "./settings" }}>Close Modal</Link>
      </div>
    </dialog>
  );
}
async function NameAndEmailModal({ type }: { type: "name" | "email" }) {
  const { meta } = await getUserData();
  const currentValue = type === "name" ? meta?.display_name : meta?.email;
  return (
    <div>
      <form>
        <h3>Change {NameToUpper(type)}</h3>
        <p>Current: {currentValue}</p>
        <p>new {NameToUpper(type)}</p>
        <input placeholder="new" name={"name"}></input>
        <br />
        {type === "name" ? (
          <button formAction={updateUserName}>change Name!</button>
        ) : (
          <button formAction={updateUserEmail}>change Email!</button>
        )}
      </form>
    </div>
  );
}
async function PasswordReset() {
  return (
    <div>
      <form>
        <h3>Change Password</h3>
        <p>Please, provide a email to send a password reset link</p>
        <input placeholder="new" type="email" name={"name"}></input>
        <br />
        <button formAction={setNewPassword}>send Email!</button>
      </form>
    </div>
  );
}
async function FileInput() {
  return (
    <div>
      <form>
        <h3>Change Avatar</h3>
        <p>current file: {"file.png"}</p>
        <input placeholder="new" type="file" name={"file"}></input>
        <br />
        <button formAction={uploadAvatar}>send Email!</button>
      </form>
    </div>
  );
}
