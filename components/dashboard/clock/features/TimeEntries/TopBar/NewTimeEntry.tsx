"use client";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { timeEntryAdded } from "../store";
import { useAppDispatch } from "../../../hooks";
import { Button } from "@/components/ui/button";

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
    <div className="rounded-full border border-blue-500 transition-none min-h-[48px]">
      <div className="flex items-center p-1 gap-4" ref={ref}>
        <div className="flex-grow">
          <input
            className="w-full rounded-lg px-3 py-2 text-base bg-transparent focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="new entry text"
            placeholder="What are you working on?"
          />
        </div>
        <div className=" text-green-400">
          <Button
            className="rounded-full"
            onClick={handleAddClick}
            size="icon"
            color="inherit"
            aria-label="add entry"
            disabled={text === ""}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};
