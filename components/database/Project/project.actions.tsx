"use server";

import { Project } from "@prisma/client";
import prisma from "../Database";

// Create new projects
export async function createProject({ ...newEntry }) {
  const project: Project = await prisma.project.create({
    data: {
      name: newEntry.name,
    },
  });
  return project;
}

// Get all projects saved on the database
export async function getAllProjects() {
  const projects: Project = await prisma.project.findMany();
  return projects;
}
