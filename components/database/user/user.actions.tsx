import { Role, User } from "@prisma/client";
import prisma from "../Database";

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
  return user;
}

export async function getUserThat({ email }: { email: string }) {
  const user: User = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getAllUsers() {
  const user: User = await prisma.user.findMany();
  return user;
}
