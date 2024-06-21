"use server";

import { User } from "@prisma/client";
import { redirect } from "next/navigation";

// Login Functions
export const login = async (values: User) => {
  try {
    console.log("Login", values);
  } catch (e) {
    throw new Error("Login values are invalid");
  }
  redirect("/dashboard");
};

// Register Functions
export const register = async (values: User) => {
  try {
    console.log("Register", values);
  } catch (e) {
    throw new Error("Login values are invalid");
  }
};
