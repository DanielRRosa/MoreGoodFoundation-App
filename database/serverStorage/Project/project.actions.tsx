"use server";

import { Project } from "@prisma/client";
import prisma from "../Database";
import { auth } from "@/app/api/auth/[...nextauth]/(Settings)/auth";

// Create new projects
export async function createProject({ ...data }) {
  const session = await auth();
  console.log(data);
  const project: Project = await prisma.project.create({
    data: {
      name: data.name,
      teamId: session?.user.teamId as string,
      userId: session?.user.id as string,
    },
  });
  return project;
}

// Get all projects saved on the database
export async function getAllProjects() {
  const session = await auth();
  const projects: Project = await prisma.project.findMany({
    where: {
      teamId: session?.user.teamId as string,
    },
  });
  return projects;
}
