"use client";
import { useAppSelector } from "../../../hooks";
import { selectCurrentTimeEntry } from "../store";
import { CurrentTimeEntry } from "./CurrentTimeEntry";
import { NewTimeEntry } from "./NewTimeEntry";

export const TopBar = () => {
  const currentTimeEntry = useAppSelector(selectCurrentTimeEntry);

  return (
    <div className="w-full">
      {currentTimeEntry ? (
        <CurrentTimeEntry currentTimeEntry={currentTimeEntry} />
      ) : (
        <NewTimeEntry />
      )}
    </div>
  );
};
