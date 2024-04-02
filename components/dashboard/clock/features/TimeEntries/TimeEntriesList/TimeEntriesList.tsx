import { useState } from "react";
import { EmptyState } from "./EmptyState";
import { useAppSelector } from "../../../hooks";
import { formatElapsedTime } from "../../../utils";
import { GroupedTimeEntryRow } from "./GroupedTimeEntryRow";
import {
  selectTimeEntriesGroupedByDate,
  selectTimeEntriesCount,
} from "../store";
import { Button } from "@/components/ui/button";
import { RootState } from "../../../store/store";

const TIME_ENTRIES_LIMIT = 10;

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

  return (
    <div className="mt-4 flex flex-col space-y-6">
      {/* Exibindo o total do mês */}
      {/* <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 my-4 flex justify-end items-center">
        <span className="mr-2">Month's Total:</span>
        <span className="text-2xl font-bold text-blue-500 dark:text-blue-300">
          {formatElapsedTime(totalMonth)}
        </span>
      </div> */}

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
          <div key={date} className="full-col-flex">
            <DayHeader
              date={date}
              elapsedTimePerDay={elapsedTimePerDay}
              reportedTimePerDay={reportedTimePerDay}
            />
            {groupedTimeEntriesPerDate.map((groupedTimeEntries) => (
              <GroupedTimeEntryRow
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

function DayHeader({
  date,
  elapsedTimePerDay,
  reportedTimePerDay,
}: {
  date: string;
  elapsedTimePerDay: number;
  reportedTimePerDay: number;
}) {
  const isAdjustableTimeReportingEnabled = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.isAdjustableTimeReportingEnabled
  );

  if (isAdjustableTimeReportingEnabled) {
    return (
      <div className="flex items-center">
        <span className="mr-2 text-lg font-semibold">{date}</span>
        <span className="mr-2 text-lg font-semibold opacity-50">
          {formatElapsedTime(elapsedTimePerDay)}
        </span>

        <div className="flex items-center text-xs font-semibold">
          <span className="rounded rounded-r-none border border-neutral bg-neutral2 pr-1">
            Logged
          </span>
          <span className="flex items-center rounded rounded-l-none border bg-neutral-100 pl-1 pr-2 text-neutral opacity-50">
            {formatElapsedTime(reportedTimePerDay)}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span className="text-lg font-semibold ">{date}</span> &nbsp;
        <span className="text-lg font-semibold opacity-50">
          {formatElapsedTime(elapsedTimePerDay)}
        </span>
      </div>
    );
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
      <Button variant="outline" onClick={handleLoadAll}>
        Load All
      </Button>
      <Button onClick={handleLoadMore}>Load More</Button>
    </div>
  );
};
