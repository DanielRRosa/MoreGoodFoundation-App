"use server";

import { Team } from "@prisma/client";
import prisma from "../Database";

// Create new projects
export async function createTeam({ ...newEntry }) {
  const team: Team = await prisma.team.create({
    data: {
      name: newEntry.name,
      users: newEntry.users,
    },
  });
  return team;
}
