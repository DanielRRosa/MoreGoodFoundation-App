"use server";

import { Team, User } from "@prisma/client";
import prisma from "../Database";
import { updateUserById } from "../User/user.actions";
import { v4 as uuid } from "uuid";

// Create new projects
export async function createTeam(data) {
  try {
    const createdTeamId = uuid();

    const team: Team = await prisma.team.create({
      data: {
        id: createdTeamId,
        name: data.name,
      },
    });

    const users: User = data.users;
    users.forEach(async (user) => {
      const userId = user;
      const teamId = createdTeamId;

      await updateUserById(userId, teamId);
    });
    return team;
  } catch (err) {
    console.error("Error creating a new team", err);
  }
}
