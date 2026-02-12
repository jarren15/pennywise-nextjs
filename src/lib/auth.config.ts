import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export default {
  providers: [Google],
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    authorized: async ({ auth, request }) => {
      if (!auth) return NextResponse.redirect(new URL("/signin", request.url));

      return !!auth;
    },
  },
} satisfies NextAuthConfig;
