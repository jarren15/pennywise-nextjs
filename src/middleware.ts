import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "@/lib/auth";
import { checkAuthentication } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;
  const isAuthenticated = await checkAuthentication(sessionToken);

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  await updateSession();

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
