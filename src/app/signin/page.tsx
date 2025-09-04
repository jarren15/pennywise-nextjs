import React from "react";
import SigninForm from "@/components/ui/signin-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await auth();

  if (session) redirect("/dashboard");

  return (
    <main>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <SigninForm />
        </div>
      </div>
    </main>
  );
}
