"use client";

import { useState } from "react";
import { EmptyState } from "./EmptyState";
import { useAppSelector } from "../../../hooks";
import { formatElapsedTime } from "../../../utils";
import {
  selectTimeEntriesGroupedByDate,
  selectTimeEntriesCount,
} from "../store";
import { Button } from "@/components/ui/button";
import { RootState } from "../../../store/store";
import {
  format,
  isToday,
  isYesterday,
  startOfMonth,
  endOfMonth,
} from "date-fns"; // Importando funções do date-fns
import { GroupedTimeEntryRow } from "./GroupedTimeEntryRow";

const TIME_ENTRIES_LIMIT = 50;

export const TimeEntriesList = () => {
  const [timeEntriesLimit, setTimeEntriesLimit] = useState(TIME_ENTRIES_LIMIT);
  const groupedTimeEntries = useAppSelector((state) =>
    selectTimeEntriesGroupedByDate(state, timeEntriesLimit)
  );

  const sortedTimeEntries = Array.from(groupedTimeEntries.entries()).sort(
    (a, b) => (a[0] > b[0] ? -1 : 1)
  );

  if (sortedTimeEntries.length === 0) {
    return <EmptyState />;
  }

  // Calculando o total do mês
  const totalMonth = calculateTotalMonth(sortedTimeEntries);

  return (
    <div className="mt-4 flex flex-col space-y-6">
      {/* Exibindo o total do mês */}
      <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 my-4 flex justify-end items-center">
        <span className="mr-2">Month's Total:</span>
        <span className="text-2xl font-bold text-blue-500 dark:text-blue-300">
          {formatElapsedTime(totalMonth)}
        </span>
      </div>

      {sortedTimeEntries.map(([date, groupedTimeEntriesPerDate]) => {
        const [elapsedTimePerDay, reportedTimePerDay] =
          groupedTimeEntriesPerDate.reduce(
            (acc: number[], groupedTimeEntries) => [
              acc[0] + groupedTimeEntries.elapsedTime,
              acc[1] + groupedTimeEntries.loggedTime,
            ],
            [0, 0]
          );

        return (
          <div key={date}>
            <DayHeader
              date={date}
              elapsedTimePerDay={elapsedTimePerDay}
              reportedTimePerDay={reportedTimePerDay}
            />
            {groupedTimeEntriesPerDate.map((groupedTimeEntries) => (
              <TimeEntryCard
                groupedTimeEntry={groupedTimeEntries}
                key={groupedTimeEntries.text}
              />
            ))}
          </div>
        );
      })}

      <PaginationButtons
        timeEntriesLimit={timeEntriesLimit}
        setTimeEntriesLimit={setTimeEntriesLimit}
      />
    </div>
  );
};

function calculateTotalMonth(sortedTimeEntries: [string, any[]][]) {
  let totalMonth = 0;

  sortedTimeEntries.forEach(([_, groupedTimeEntriesPerDate]) => {
    groupedTimeEntriesPerDate.forEach((groupedTimeEntries) => {
      totalMonth += groupedTimeEntries.elapsedTime;
    });
  });

  return totalMonth;
}

function DayHeader({
  date,
  elapsedTimePerDay,
  reportedTimePerDay,
}: {
  date: string;
  elapsedTimePerDay: number;
  reportedTimePerDay: number;
}) {
  const formattedDate = formatDate(date);

  return (
    <div className="mb-4">
      <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
        {formattedDate}
      </span>
      <span className="mr-2 text-lg font-semibold text-neutral-700 dark:text-neutral-200 opacity-50">
        {formatElapsedTime(elapsedTimePerDay)}
      </span>
    </div>
  );
}

function TimeEntryCard({ groupedTimeEntry }: { groupedTimeEntry: any }) {
  return (
    <div className="rounded-lg mb-2 border p-4 shadow-[-2px_5px_20px_0px_#0000001A] border-blue-500 dark:bg-gray-0 ">
      <GroupedTimeEntryRow groupedTimeEntry={groupedTimeEntry} />
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isToday(date)) {
    return "Today: ";
  } else if (isYesterday(date)) {
    return "Yesterday: ";
  } else {
    return format(date, "MMMM dd: "); // Formato personalizado: mês completo e dia
  }
}

type PaginationButtonsProps = {
  timeEntriesLimit: number;
  setTimeEntriesLimit: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationButtons = ({
  timeEntriesLimit,
  setTimeEntriesLimit,
}: PaginationButtonsProps) => {
  const timeEntriesCount = useAppSelector(selectTimeEntriesCount);

  const handleLoadMore = () => {
    setTimeEntriesLimit((state) => state + TIME_ENTRIES_LIMIT);
  };

  const handleLoadAll = () => {
    setTimeEntriesLimit(Infinity);
  };

  if (timeEntriesCount < timeEntriesLimit) {
    return null;
  }

  return (
    <div className="flex flex-row justify-end gap-[10px] pt-[10px]">
      <Button variant={"outline"} onClick={handleLoadAll}>
        Load All
      </Button>
      <Button onClick={handleLoadMore}>Load More</Button>
    </div>
  );
};
