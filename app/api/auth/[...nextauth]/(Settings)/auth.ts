import type { Profile } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/components/database/Database";

import { validateUser } from "./validate-actions";

import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { getUserThat } from "@/components/database/User/user.actions";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET as string,
  ...authConfig,

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/unauthorized",
  },

  callbacks: {
    async signIn({ profile }: { profile: Profile }) {
      const isValid = await validateUser(profile);

      if (isValid) {
        return true;
      }
      return false;
    },

    async session({ token, session }) {
      if (session.user) {
        const email = session.user.email;
        const uniqueUser = await getUserThat({ email });

        session.user.id = token.sub as string;
        session.user.firstName = uniqueUser.firstName;
        session.user.lastName = uniqueUser.lastName;
        session.user.role = uniqueUser.role;
      }
      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
  // logger: {
  //   error(code, ...message) {
  //     log.error(code, message);
  //   },
  //   warn(code, ...message) {
  //     log.warn(code, message);
  //   },
  //   debug(code, ...message) {
  //     log.debug(code, message);
  //   },
  // },
  // debug: true,
});
