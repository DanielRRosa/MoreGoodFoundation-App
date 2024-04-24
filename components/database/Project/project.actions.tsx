"use server";

import { Project } from "@prisma/client";
import prisma from "../Database";
import { auth } from "@/app/api/auth/[...nextauth]/(Settings)/auth";

// Create new projects
export async function createProject({ ...newEntry }) {
  const session = await auth();
  const project: Project = await prisma.project.create({
    data: {
      name: newEntry.name,
      teamId: session?.user.teamId as string,
    },
  });
  return project;
}

// Get all projects saved on the database
export async function getAllProjects({ ...data }) {
  const session = await auth();
  const projects: Project = await prisma.project.findMany({
    where: {
      teamId: session?.user.teamId as string,
    },
  });
  return projects;
}
