// import { LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { signOut } from "@/actions/auth";
// import LoadingOverlay from "@/components/ui/loading-overlay";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  // const [_, signOutAction, isSignOutPending] = useActionState(signOut, undefined);
  // const loadingOverlayclassNames = cn([
  //   "absolute",
  //   "bg-background",
  //   "z-9999",
  //   "inset-0",
  //   "hidden",
  //   "items-center",
  //   "justify-center",
  //   "text-center",
  //   "overflow-hidden",
  //   "h-screen",
  //   "gap-2",
  //   "text-lg",
  //   isSignOutPending && "flex",
  // ]);
  const session = await auth()
  console.log(session)
  return (
    <main>
      {/* <form action={signOutAction}>
        <Button variant="outline" size="sm" disabled={isSignOutPending}>
          <LogOut /> Sign out
        </Button>
      </form>
      <LoadingOverlay className={loadingOverlayclassNames} message="Signing out" /> */}
      {session?.user?.email}
    </main>
  );
}
