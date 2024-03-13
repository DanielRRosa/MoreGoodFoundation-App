import {
  getAllAdminUsers,
  getUserThat,
} from "@/components/database/user/user.actions";
import { Profile, User } from "next-auth";

export const validateUser = async (profile: Profile) => {
  console.log("Validate User", profile);
  return true // Retirar no fim do projeto
  if (!profile.email?.endsWith("moregoodfoundation.org")) {
    const uniqueUser = await getUserThat({
      email: profile.email as string,
      role: "admin",
    });

    if (uniqueUser) return true;

    const adminUsers = await getAllAdminUsers();

    adminUsers.map(async (adminUser) => {
      await sendAdminAccessEmail(adminUser);
      await sendUserRequestEmail(profile);
    });
  }
  return false;
};

export const sendUserRequestEmail = async (profile: Profile) => {
  try {
    await fetch("http://localhost:3000/api/email/user-request", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ ...profile }),
    });
    console.log("User request email has been sent");
  } catch (error) {
    console.error("Didn't get to send the user request email");
  }
};

export const sendAdminAccessEmail = async (admin: User) => {
  try {
    await fetch("http://localhost:3000/api/email/access-request", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ ...admin }),
    });
    console.log("User request email has been sent");
  } catch (error) {
    console.error("Didn't get to send the user request email");
  }
};
