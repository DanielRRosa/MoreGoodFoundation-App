import NextAuth from "next-auth";
import type { NextAuthConfig, Profile, Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/components/database/prisma-database";
import { validateUser } from "./actions";

// Providers
import Google from "next-auth/providers/google";
import type { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "E-mail",
      placeholder: "E-mail",
      type: "email",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
  },
  // async authorize(credentials) {
  //   const user = await db.user.findUnique({
  //     where: {
  //       email: credentials?.email,
  //     },
  //   });

  //   if (!user) throw new Error("Email or Password is incorrect");
  //   if (!credentials.password) throw new Error("Password is incorrect");

  //   const passwordCorrect = await bcrypt.compare(
  //     credentials.password,
  //     user.password
  //   );

  //   if (!passwordCorrect) throw new Error("Email or Password is incorrect");

  //   const { password, ...userWithoutPassword } = user;

  //   return userWithoutPassword;
  // },
});

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Google({
      profile(profile: GoogleProfile) {
        return {
          // Provider information
          provider: "google",

          // Name information
          firstName: profile.given_name as string,
          lastName: profile.family_name as string,
          username: `${profile.given_name.toLowerCase() as string}-${
            profile.family_name?.toLowerCase() as string
          }`,

          // Email and image information
          email: profile.email as string,
          emailVerified: false,
          image: profile.picture as string,

          // User type information
          role: "member",
        };
      },
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    credentialsConfig,
  ],
  pages: {
    signIn: "/auth/login",
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

    async session({ session }: { session: Session }) {
      return session;
    },
  },
  debug: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
