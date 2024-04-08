import { Role, User } from "@prisma/client";
import prisma from "../prisma-database";

// Admin Users Functions
export async function getAllAdminUsers() {
  const user: User = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });
  return user;
}

// General Users Functions
export async function getUserThatRole({
  email,
  role,
}: {
  email: string;
  role?: Role;
}) {
  const user: User = await prisma.user.findUnique({
    where: {
      email,
      role: role,
    },
  });
  // console.log("Get user that role: ", user.id);
  return user;
}

export async function getUserThat({ email }: { email: string }) {
  const user: User = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // console.log("Get user that: ", user.id);
  return user;
}
