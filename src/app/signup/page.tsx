import React from "react";
import SignupForm from "@/components/ui/signup-form";
import { cookies } from "next/headers";
import { checkAuthentication } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const isAuthenticated = await checkAuthentication(sessionToken);

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <main>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
