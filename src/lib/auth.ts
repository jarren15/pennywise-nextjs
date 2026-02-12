import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/lib/auth.config";
import prisma from "@/lib/prisma";
import Resend from "next-auth/providers/resend";

// Avoids resend provider to run in middleware (edge runtime)
const combinedProviders = [
  ...authConfig.providers,
  Resend({
    from: "auth@resend.dev",
  }),
];

const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: combinedProviders,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});

export { handlers, signIn, signOut, auth };
