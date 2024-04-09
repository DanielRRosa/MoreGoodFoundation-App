"use server";

import prisma from "../prisma-database";
import { timedTask } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/(logic)/auth";

// Create Timed Tasks Functions
export async function createTimedTask({ ...newEntry }) {
  const session = await auth();
  const createdTask: timedTask = await prisma.timedTask.create({
    data: {
      id: newEntry.id,
      name: newEntry.text,
      startTime: newEntry.startTime,
      userId: session?.user.id,
    },
  });
  return createdTask;
}

// Update Timed Tasks Functions
export async function updateTimedTask({ ...currentEntry }) {
  const updatedTask: timedTask = await prisma.timedTask.update({
    where: {
      id: currentEntry.id,
    },
    data: {
      stopTime: currentEntry.changes.stopTime,
    },
  });
  return updatedTask;
}

export async function editTimedTask({ ...currentEntry }) {
  const editedTask: timedTask = await prisma.timedTask.update({
    where: {
      id: currentEntry.id,
    },
    data: {
      name: currentEntry.text,
      startTime: currentEntry.startTime,
      stopTime: currentEntry.stopTime,
    },
  });
  return editedTask;
}

// Delete Timed Tasks Functions
export async function deleteTimedTask({ ...currentEntry }) {
  const updatedTask: timedTask = await prisma.timedTask.delete({
    where: {
      id: currentEntry.id,
    },
  });
  return updatedTask;
}

// Find Timed Tasks Functions
export async function findAllTimedTasks() {
  const session = await auth();
  const findedTask: timedTask = await prisma.timedTask.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return findedTask;
}
