"use server";

import prisma from "../Database";
import { timedTask } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/(Settings)/auth";

// Create Timed Tasks Functions
export async function createTimedTask(newEntry: timedTask) {
  try {
    const createdTask: timedTask = await prisma.timedTask.create({
      data: {
        ...newEntry,
      },
    });
    return createdTask;
  } catch (err) {
    console.error("Error when creating the time task", err);
  }
}

// Update Timed Tasks Functions
export async function updateTimedTask(currentEntry: timedTask) {
  const stopTime = new Date();

  const updatedTask = await prisma.timedTask.update({
    where: {
      id: currentEntry.id,
    },
    data: {
      stopTime: stopTime,
    },
  });
  return updatedTask;
}

export async function editTimedTask(currentEntry: timedTask) {
  const editedTask = await prisma.timedTask.update({
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
export async function findAllUserTimedTasks() {
  const session = await auth();
  const findedTask = await prisma.timedTask.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return findedTask;
}
