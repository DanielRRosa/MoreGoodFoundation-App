"use client";

import { Play, Square, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useKeyPress } from "../../../../../hooks/useKeyPress";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { formatElapsedTime } from "../../../utils";
import { v4 as uuid } from "uuid";
import CurrentProjectEntry from "./CurrentProjectEntry";
import {
  createTimedTask,
  updateTimedTask,
} from "@/src/database/serverStorage/TimedTasks/timedtasks.actions";
import { Project, timedTask } from "@prisma/client";
import {
  deleteFromLocalStorage,
  saveTemporarilyToLocalStorage,
} from "@/src/database/clientStorage/localstorage.actions";
import { Session } from "next-auth";
import Timer from "./Timer";

export const NewTimeEntry = ({
  projects,
  session,
}: {
  projects: Array<Project>;
  session: Session | null;
}) => {
  // Universal Keys of the project
  const localStorageTimedTaskKey: string = "currentTimedTask";

  const ref = useRef(null);

  const [text, setText] = useState<string>("");
  const [project, setProject] = useState<Project | null>(null);
  const [currentTimeEntry, setCurrentTimeEntry] = useState<timedTask | null>(
    null
  );

  useEffect(() => {
    try {
      const queriedCurrentEntry = localStorage.getItem(
        localStorageTimedTaskKey
      );

      if (queriedCurrentEntry) {
        setCurrentTimeEntry(queriedCurrentEntry);
      }
    } catch (err) {
      console.error(err);
    }
  }, [currentTimeEntry]);

  const handleAddClick = async () => {
    if (project) {
      const startTime = new Date();

      const data = {
        id: uuid(),
        name: text,
        userId: session?.user.id,
        projectId: project.id,
        startTime: startTime,
      };
      try {
        // Try to create a new task on the database
        const createServerTimeTask = await createTimedTask(data);

        if (createServerTimeTask) {
          // If gets to create the new timed task on the batabase, then creates a temporarily one on the local storage
          saveTemporarilyToLocalStorage(localStorageTimedTaskKey, data);

          // Then, send sets the currentTimeEntry variable to the new data
          setCurrentTimeEntry(JSON.stringify(localStorageTimedTaskKey, data));
        }
      } catch (err) {
        console.error(
          "Error when trying to save time task on server and localstorage",
          err
        );
      }
    }
  };

  const handleOnStopClick = async (currentEntry: timedTask) => {
    const data = {
      id: currentEntry.id,
      name: currentEntry.name,
      userId: currentEntry.userId,
      projectId: currentEntry.projectId,
    };

    try {
      const updatedServerTimeEntry = await updateTimedTask(data);

      if (updatedServerTimeEntry) {
        deleteFromLocalStorage(localStorageTimedTaskKey);
        setCurrentTimeEntry(null);
        setProject(null);
      }
    } catch (err) {
      console.error("Error when trying to update time task on server", err);
    }
  };

  useKeyPress(handleAddClick, ["Enter"], ref);

  if (!currentTimeEntry) {
    return (
      <div
        className={`${
          text === "" ? "border-neutral" : "border-primary"
        } border rounded-full transition-all duration-300 ${
          !project && "hover:border-primary"
        }`}
      >
        <div className="full-flex p-1" ref={ref}>
          <div className="full-flex px-4">
            <CurrentProjectEntry
              projects={projects}
              onSelect={(selectedProject: Project) => {
                // On clicked the project data will be sended to the backend that may be stored on the database
                setProject(selectedProject); // Set the entire project data object
              }}
            />

            {project ? (
              <Input
                className="w-full rounded-lg px-3 py-2 text-base bg-transparent placeholder:opacity-60 focus:outline-none"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="new entry text"
                placeholder="What are you working on today?"
              />
            ) : (
              <div className="px-3 py-2 opacity-40 text-base cursor-default">
                Click + to select the project you will work today
              </div>
            )}
          </div>

          {project && (
            <div className="bg-primary px-4 py-1 rounded-md capitalize">
              {project.name}
            </div>
          )}

          <span
            className={`${
              text === "" ? "opacity-60" : ""
            } flex justify-end text-lg text-right text-nowrap font-bold w-[100px]`}
          >
            {formatElapsedTime(0)}
          </span>

          <Button
            className="rounded-full min-h-[60px] min-w-[60px]"
            onClick={handleAddClick}
            size="icon"
            variant="default"
            aria-label="Add entry"
            title="Add Entry"
            disabled={text === ""}
          >
            <p className="sr-only">Start time tracker</p>
            <Play />
          </Button>
        </div>
      </div>
    );
  }

  if (currentTimeEntry) {
    const currentTimeEntryData: timedTask = JSON.parse(currentTimeEntry);

    return (
      <div className="rounded-full border border-neutral min-h-[48px]">
        <div className="full-flex p-1 gap-4">
          <div className="full-flex w-fit px-4">
            <div className="flex justify-center items-center border border-neutral rounded-full w-[30px] h-[30px]">
              <Plus className="size-5" />
            </div>
            <p className="text-white">{currentTimeEntryData.name}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="bg-primary px-4 py-1 rounded-md capitalize">
              {project?.name}
            </div>

            <main aria-label="elapsed time">
              <span className="flex justify-end text-lg text-right font-bold">
                <Timer startTime={currentTimeEntryData.startTime} />
              </span>
            </main>

            <Button
              className="rounded-full min-h-[60px] min-w-[60px]"
              onClick={() => handleOnStopClick(currentTimeEntryData)}
              size="icon"
              variant="destructive"
              aria-label="stop timer"
            >
              <p className="sr-only">Stop Watch</p>
              <Square className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
