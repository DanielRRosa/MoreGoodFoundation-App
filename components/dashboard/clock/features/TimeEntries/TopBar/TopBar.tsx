"use client";
import { useAppSelector } from "../../../hooks";
import { selectCurrentTimeEntry } from "../store";
import { CurrentTimeEntry } from "./CurrentTimeEntry";
import { NewTimeEntry } from "./NewTimeEntry";

export const TopBar = () => {
  const currentTimeEntry = useAppSelector(selectCurrentTimeEntry);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex-1">{currentTimeEntry ? <CurrentTimeEntry currentTimeEntry={currentTimeEntry} /> : <NewTimeEntry />}</div>
      </div>
    </div>
  );
};
