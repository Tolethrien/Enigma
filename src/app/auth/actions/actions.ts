"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerClient } from "@/server/supabase/back";

export async function login(formData: FormData) {
  const supabase = createServerClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("./error");
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

  revalidatePath("/", "layout");
  // redirect("/login");
}
export async function setNewPassword(formData: FormData) {
  const supabase = createServerClient();
  const form = {
    password: formData.get("password") as string,
    code: formData.get("code") as string,
  };
  const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(
    form.code,
  );
  if (exchangeErr) console.log("error z logowania Otp", exchangeErr.message);

  const { error } = await supabase.auth.updateUser({ password: form.password });
  if (error) console.log(error.message);
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
    options: { data: { display_name: data.name } },
  });
  if (error) {
    console.log(error);
    redirect("./error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
