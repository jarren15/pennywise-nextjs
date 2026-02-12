"use server";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

type AuthState =
  | {
      error?: boolean;
      message?: string;
    }
  | undefined;

export async function signInWithGoogle(_state: AuthState) {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) return { error: true, message: "Unable to signin." };
    throw error;
  }
}

export async function signInWithResend(_state: AuthState, formData: FormData) {
  try {
    await signIn("resend", formData);
  } catch (error) {
    if (error instanceof AuthError) return { error: true, message: "Unable to signin." };
    throw error;
  }
}

export async function logout() {
  await signOut();
}