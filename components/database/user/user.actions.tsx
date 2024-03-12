import { Role } from "@prisma/client";
import prisma from "../prisma-database";

// Admin Users Functions
export async function getAllAdminUsers() {
  const user = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });
  console.log("All admin users", user);
  return user;
}

// General Users Functions
export async function getUserThat({
  email,
  role,
}: {
  email: string;
  role?: Role;
}) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      role: role,
    },
  });
  console.log("Founded unique user", user);
  return user;
}
