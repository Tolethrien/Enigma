"use server";
import { createServerClient } from "./back";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateUserEmail = async (formData: FormData) => {
  const data = {
    email: formData.get("name") as string,
  };
  const supabase = createServerClient();
  const { error } = await supabase.auth.updateUser({
    email: data.email,
  });
  if (error) throw new Error(error.message);
};
export const updateUserName = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
  };
  const supabase = createServerClient();
  const { error } = await supabase.auth.updateUser({
    data: { display_name: data.name },
  });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/dashboard/settings");
};

export async function login(formData: FormData) {
  const supabase = createServerClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === "Invalid login credentials") {
      redirect("./login?invalid=true");
    } else {
      console.log("error to: ", error.message);
      redirect("./error");
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function sendPasswordReset(formData: FormData) {
  const supabase = createServerClient();
  const data = {
    email: formData.get("email") as string,
  };
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `http://localhost:3000/auth/changePass`,
  });
  if (error) {
    console.log(error);
    redirect("./error");
  }
  await supabase.auth.signOut();
}
export async function setNewPassword(formData: FormData) {
  //TODO: resetowanie dziala tylko z tej samej przegladarki - supabase problem
  const supabase = createServerClient();
  const form = {
    password: formData.get("password") as string,
    code: formData.get("code") as string,
  };
  try {
    await supabase.auth.exchangeCodeForSession(form.code);
  } catch (error) {
    console.log("error z logowania Otp", error);
  }
  const { error } = await supabase.auth.updateUser({ password: form.password });
  if (error) console.log("reset update user err", error.message);
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function signup(formData: FormData) {
  const supabase = createServerClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { display_name: data.name, email: data.email } },
  });
  if (error) {
    console.log("error to", error);
    redirect("./register?invalid=true");
  }

  revalidatePath("/", "layout");
  redirect("/auth/getBadge");
}
// export async function uploadAvatar(formData: FormData) {
//   //TODO: require S3 to ssr
//   const supabase = createServerClient();
//   const data = {
//     file: formData.get("file") as string,
//   };
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) throw new Error("no user");

//   const { error } = await supabase.storage
//     .from("avatars")
//     .upload("pobrane.jpeg", data.file, {
//       cacheControl: "3600",
//       upsert: false,
//     });
// }
export async function deleteUser() {
  const supabase = createServerClient();
  await supabase.rpc("delete_user_account");
  await supabase.auth.signOut();
}
