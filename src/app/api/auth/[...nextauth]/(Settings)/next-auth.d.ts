import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    provider?: string;
    emailVerified: boolean | null;
    image?: string;
    name: string;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    password?: string | null;
    createdAt: Date;
    role: "member" | "supervisor" | "admin" | "master";
    teamId: string | string[] | null;
    projectId: string | string[] | null;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
