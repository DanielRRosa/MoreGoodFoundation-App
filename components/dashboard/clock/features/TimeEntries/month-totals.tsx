"use client"

import React, { useState } from "react";
import { EmptyState } from "./TimeEntriesList/EmptyState";
import { useAppSelector } from "../../hooks";
import { formatElapsedTime } from "../../utils";
import { selectTimeEntriesGroupedByDate, selectTimeEntriesCount } from "./store";
import { format, isToday, isYesterday, startOfMonth, endOfMonth } from "date-fns";

const TIME_ENTRIES_LIMIT = 50;

const TimeEntriesList = () => {
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

export default TimeEntriesList;
