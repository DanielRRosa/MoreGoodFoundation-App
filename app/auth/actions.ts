"use server";

import db from "@/components/database/prisma-database";
import { redirect } from "next/navigation";

export const login = async (values: any) => {
  try {
    await console.log(values);
    // const user = db.user.findUnique({
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
