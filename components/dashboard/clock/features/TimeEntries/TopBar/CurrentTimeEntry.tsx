"use client";
import { Square, Plus } from "lucide-react";
import { formatElapsedTime } from "../../../utils";
import { useState, useEffect, useRef } from "react";
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
    <div className="rounded-full border border-neutral min-h-[48px]">
      <div className="full-flex p-1 gap-4">
        <div className="full-flex w-fit px-4">
          <div className="flex justify-center items-center border border-neutral rounded-full w-[30px] h-[30px]">
            <Plus className="size-5" />
          </div>

          <TimeEntryText timeEntryText={currentTimeEntry.text} />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="bg-primary px-4 py-1 rounded-md capitalize">
            {currentTimeEntry.project}
          </div>

          <main
            onClick={() => setIsEditVisible((state) => !state)}
            aria-label="elapsed time"
          >
            <span className="flex justify-end text-lg text-right font-bold w-24">
              {formatElapsedTime(elapsedTime)}
            </span>
          </main>

          <Button
            className="rounded-full min-h-[60px] min-w-[60px]"
            onClick={handleOnStopClick}
            size="icon"
            variant="destructive"
            aria-label="stop timer"
          >
            <p className="sr-only">Stop Watch</p>
            <Square className="size-5" />
          </Button>
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
