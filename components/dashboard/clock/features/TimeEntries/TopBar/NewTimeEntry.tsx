"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { timeEntryAdded } from "../store";
import { useAppDispatch } from "../../../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatElapsedTime } from "../../../utils";
import CurrentProjectEntry from "./CurrentProjectEntry";

export const NewTimeEntry = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");
  const [project, setProject] = useState<string>("");

  const handleAddClick = () => {
    if (project) {
      dispatch(
        timeEntryAdded({ text: text, project: project, startTime: Date.now() })
      );
    }
  };

  useKeyPress(handleAddClick, ["Enter"], ref);

  return (
    <div
      className={`${
        text === "" ? "border-neutral" : "border-primary"
      } border rounded-full transition-all duration-300 hover:border-primary`}
    >
      <div className="full-flex p-1" ref={ref}>
        <div className="full-flex px-4">
          <CurrentProjectEntry onSelect={(e) => setProject(e)} />

          <Input
            className="w-full rounded-lg px-3 py-2 text-base bg-transparent focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="new entry text"
            placeholder="What are you working on today?"
          />
        </div>

        {project ? (
          <div className="bg-primary px-4 py-1 rounded-md capitalize">
            {project}
          </div>
        ) : (
          <div className="hidden">{project}</div>
        )}

        <span
          className={`${
            text === "" ? "opacity-60" : ""
          } flex justify-end text-lg text-right font-bold w-24`}
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
};
