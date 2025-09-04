import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ auth, request }) => {
      if (!auth) NextResponse.redirect(new URL("/signin", request.url));

      return !!auth;
    },
  },
} satisfies NextAuthConfig;
