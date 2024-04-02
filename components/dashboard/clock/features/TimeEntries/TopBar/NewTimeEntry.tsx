"use client";

import { Play, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { timeEntryAdded } from "../store";
import { useAppDispatch } from "../../../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatElapsedTime } from "../../../utils";

export const NewTimeEntry = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("");

  const handleAddClick = () => {
    dispatch(timeEntryAdded({ text: text, startTime: Date.now() }));
    console.log({ text: text, startTime: Date.now() });
  };

  useKeyPress(handleAddClick, ["Enter"], ref);

  return (
    <div
      className={`${
        text === "" ? "border-neutral" : "border-primary"
      } border rounded-full transition-all duration-300`}
    >
      <div className="full-flex p-1" ref={ref}>
        <div className="full-flex px-4">
          <div className="flex items-center justify-center border border-neutral rounded-full min-w-[30px] min-h-[30px]">
            <Plus className="size-5" />
          </div>
          <Input
            className="w-full rounded-lg px-3 py-2 text-base bg-transparent focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="new entry text"
            placeholder="What are you working on today?"
          />
        </div>

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
