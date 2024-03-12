"use client";
import { Square } from "lucide-react";
import { formatElapsedTime } from "../../../utils";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useAppDispatch } from "../../../hooks";
import { TimeEntryEdit } from "../components/TimeEntryEdit";
import { TimeEntryText } from "../components/TimeEntryText";
import { TimeEntry, timeEntryStopped } from "../store";
import { Button } from "@/components/ui/button";

interface CurrentTimeEntryProps {
  currentTimeEntry: TimeEntry;
}

export const CurrentTimeEntry: React.FC<CurrentTimeEntryProps> = ({
  currentTimeEntry,
}) => {
  const dispatch = useAppDispatch();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const elapsedTime = useElapsedTimeForEntry(currentTimeEntry);

  const handleOnStopClick = () => {
    dispatch(timeEntryStopped(currentTimeEntry.id));
  };

  return (
    <div
      className={`rounded-full border border-blue-500 min-h-[48px] ${
        isEditVisible
          ? "shadow-lg transition-all duration-200"
          : "border-transparent transition-none"
      }`}
    >
      <div className="flex items-center p-1 gap-4">
        <div className="w-full">
          <TimeEntryText timeEntryText={currentTimeEntry.text} />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <main
            onClick={() => setIsEditVisible((state) => !state)}
            className="w-[68px]"
            aria-label="elapsed time"
          >
            <span>{formatElapsedTime(elapsedTime)}</span>
          </main>
          <div className=" text-red-300">
            <Button
              className="rounded-full"
              onClick={handleOnStopClick}
              size="icon"
              color="inherit"
              aria-label="stop timer"
            >
              <Square className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      {isEditVisible && (
        <div className="px-2">
          <TimeEntryEdit
            timeEntry={currentTimeEntry}
            setIsEditVisible={setIsEditVisible}
          />
        </div>
      )}
    </div>
  );
};

const useElapsedTimeForEntry = (currentTimeEntry: TimeEntry) => {
  const [elapsedTime, setElapsedTime] = useState<number>(
    currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
  );
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setElapsedTime(
      currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
    );
  }, [currentTimeEntry]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime(
        currentTimeEntry ? Date.now() - currentTimeEntry.startTime : 0
      );
    }, 500);

    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return elapsedTime;
};
