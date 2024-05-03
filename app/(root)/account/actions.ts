"use server";

import prisma from "@/database/serverStorage/Database";
import { redirect } from "next/navigation";

export const login = async (values: any) => {
  try {
    await console.log(values);
    // const user = prisma.user.findUnique({
    //   where: {
    //     email: values.email,
    //   },
    // });
    // return user;
  } catch (e) {
    throw new Error("Login values are invalid");
  }
  redirect("/dashboard");
};
