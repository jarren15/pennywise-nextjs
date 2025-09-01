"use server";
import { deleteSession, createSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SigninFormSchema, SignupFormSchema } from "@/lib/zod";
import type { SigninFormState, SignupFormState } from "@/types/auth";

export async function signin(state: SigninFormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { fieldErrors: validatedFields.error.flatten().fieldErrors };
  } else {
    const { email } = validatedFields.data;
    const response = await fetch(new URL("/api/auth/signin", process.env.NEXT_PUBLIC_BASE_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.toLocaleLowerCase(), password: formData.get("password") }),
    });
    const data: { message: string; userId?: number; error: boolean } = await response.json();

    if (!response.ok) {
      return { serverError: data.message };
    }

    if (!data.userId) {
      throw new Error("No user ID found.");
    }

    await createSession(data.userId.toString());

    redirect("/dashboard");
  }
}

export async function signup(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { fieldErrors: validatedFields.error.flatten().fieldErrors };
  } else {
    const { name, email, password } = validatedFields.data;
    const response = await fetch(new URL("/api/auth/signup", process.env.NEXT_PUBLIC_BASE_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.toLocaleLowerCase(), email: email.toLocaleLowerCase(), password }),
    });
    const data: { message: string; userId?: number; error: boolean } = await response.json();

    if (!response.ok) {
      return { serverError: data.message };
    }

    if (!data.userId) {
      throw new Error("No user ID found.");
    }

    await createSession(data.userId.toString());

    redirect("/dashboard");
  }
}

export async function signOut() {
  await deleteSession();
  redirect("/");
}
