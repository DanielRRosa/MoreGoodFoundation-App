"use client";

import { useState, useEffect } from "react";
import { EmptyState } from "./EmptyState";
import { formatElapsedTime } from "../../../utils";
import { GroupedTimeEntryRow } from "./GroupedTimeEntryRow";
import { selectTimeEntriesGroupedByDate } from "../store";
import { Button } from "@/components/ui/button";

const DAY_ENTRIES_LIMIT = 3; // Limite de dias a serem exibidos

export const TimeEntriesList = () => {
  // State management using useState hooks
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleDays, setVisibleDays] = useState(DAY_ENTRIES_LIMIT); // Estado para controlar o número de dias visíveis
  const [loadMoreDays, setLoadMoreDays] = useState<number | null>(null); // Estado para controlar o número de dias adicionados ao clicar em "Load More"
  const [visibleMonths, setVisibleMonths] = useState<number>(4); // Definindo o número inicial de meses visíveis

  // Selecting data from Redux store using custom selector
  // const groupedTimeEntries = useAppSelector((state) =>
  //   selectTimeEntriesGroupedByDate(state)
  // );

  // Sorting time entries by date
  const sortedTimeEntries = Array.from(groupedTimeEntries.entries()).sort(
    (a, b) => (a[0] > b[0] ? -1 : 1)
  );

  // Render empty state if there are no time entries
  if (sortedTimeEntries.length === 0) {
    return <EmptyState />;
  }

  // Effect hook to handle initial actions when component mounts
  useEffect(() => {
    handleCurrentMonthClick();
  }, []); // O array vazio assegura que o efeito seja executado apenas uma vez, ao montar o componente

  // Handler to set selected month to the current month and reset visibility settings
  const handleCurrentMonthClick = () => {
    setSelectedMonth(getCurrentYearMonth());
    setVisibleDays(DAY_ENTRIES_LIMIT); // Resetando o número de dias visíveis ao mudar de mês
    setLoadMoreDays(null); // Resetando o número de dias adicionados ao mudar de mês
  };

  // Handler to set selected month and reset visibility settings
  const handlePastMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false);
    setVisibleDays(DAY_ENTRIES_LIMIT); // Resetando o número de dias visíveis ao mudar de mês
    setLoadMoreDays(null); // Resetando o número de dias adicionados ao mudar de mês
  };

  // Handler to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to get the current year and month in "YYYY-MM" format
  const getCurrentYearMonth = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  // Function to generate unique past months based on grouped time entries
  const generatePastMonths = (): string[] => {
    const pastMonths: Set<string> = new Set();
    groupedTimeEntries.forEach((_, date) => {
      const [year, month] = date.split("-");
      pastMonths.add(`${year}-${month}`);
    });
    return Array.from(pastMonths);
  };

  // Array of unique past months
  const pastMonths = generatePastMonths();

  // Filter and limit time entries based on selected month and visibility settings
  const filteredTimeEntries = selectedMonth
    ? sortedTimeEntries.filter(([date]) => date.includes(selectedMonth))
    : sortedTimeEntries;

  // Determine the visible time entries based on visibility settings
  const limitedTimeEntries = filteredTimeEntries.slice(
    0,
    visibleDays + (loadMoreDays || 0)
  ); // Limitando o número de dias visíveis

  // Handler to load more time entries
  const handleLoadMore = () => {
    setLoadMoreDays(
      (prevLoadMoreDays) => (prevLoadMoreDays || 0) + DAY_ENTRIES_LIMIT
    ); // Aumentando o número de dias adicionados ao clicar em "Load More"
  };

  // Render the component UI
  return (
    <div className="mt-4 flex flex-col space-y-6">
      <div className="flex justify-end">
        <div className="flex items-center mr-4">
          {/* Button to show current month */}
          <Button className="mr-2" onClick={handleCurrentMonthClick}>
            {/* SVG icon for current month */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "0.5rem" }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Current Month
          </Button>

          {/* Dropdown button to show past months */}
          <div className="relative">
            <Button
              onClick={toggleDropdown}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              {/* SVG icon for dropdown */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Past Month
            </Button>
            {/* Dropdown menu for past months */}
            {isDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md dark:bg-zinc-700 dark:text-white"
                style={{ zIndex: 999 }}
              >
                {/* Render past months in dropdown */}
                {pastMonths.slice(0, visibleMonths).map((month) => (
                  <div
                    key={month}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-400"
                    onClick={() => handlePastMonthSelect(month)}
                  >
                    {month}
                  </div>
                ))}
                {/* Show "Load More" button if more months are available */}
                {visibleMonths < pastMonths.length && (
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-blue-400 bg-primary text-white	"
                    onClick={() => setVisibleMonths((prev) => prev + 4)}
                  >
                    Load More
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render limited time entries */}
      {limitedTimeEntries.map(([date, groupedTimeEntriesPerDate]) => {
        // Calculate total elapsed and logged time for the day
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
            {/* Render day header */}
            <DayHeader
              date={date}
              elapsedTimePerDay={elapsedTimePerDay}
              reportedTimePerDay={reportedTimePerDay}
            />
            {/* Render grouped time entries for the day */}
            {groupedTimeEntriesPerDate.map((groupedTimeEntries) => (
              <GroupedTimeEntryRow
                groupedTimeEntry={groupedTimeEntries}
                key={groupedTimeEntries.text}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

// DayHeader component to render day information
function DayHeader({
  date,
  elapsedTimePerDay,
  reportedTimePerDay,
}: {
  date: string;
  elapsedTimePerDay: number;
  reportedTimePerDay: number;
}) {
  return (
    <div className="flex items-center">
      {/* Display date */}
      <span className="mr-2 text-lg font-semibold">{date}</span>
      {/* Display elapsed time */}
      <span className="mr-2 text-lg font-semibold opacity-50">
        {formatElapsedTime(elapsedTimePerDay)}
      </span>
    </div>
  );
}

export default TimeEntriesList;
