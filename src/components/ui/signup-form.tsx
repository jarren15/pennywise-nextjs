"use client";
import React, { useActionState } from "react";
import { signup } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [state, action, isPending] = useActionState(signup, undefined);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form action={action}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input id="name" type="text" name="name" placeholder="Name" required />
                  {state?.fieldErrors?.name && <p className="text-destructive">{state.fieldErrors.name}</p>}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                  {state?.fieldErrors?.email && <p className="text-destructive">{state.fieldErrors.email}</p>}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" name="password" required />
                  {state?.fieldErrors?.password && (
                    <div className="text-destructive">
                      <p>Password must:</p>
                      <ul>
                        {state.fieldErrors.password.map((error) => (
                          <li key={error}>- {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {state?.serverError && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to sign in.</AlertTitle>
                    <AlertDescription>
                      <p>{state.serverError}</p>
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {!isPending ? (
                    "Sign up"
                  ) : (
                    <>
                      Signing up
                      <Spinner />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
