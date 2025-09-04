"use server";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function signInWithGoogle() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) return { authError: "Unable to signin." };
    throw error;
  }
}
export async function logout() {
  await signOut();
}
