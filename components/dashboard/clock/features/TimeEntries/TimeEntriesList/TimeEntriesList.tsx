"use client";
import React, { useState, useEffect } from "react";
import { EmptyState } from "./EmptyState";
import { useAppSelector } from "../../../hooks";
import { formatElapsedTime } from "../../../utils";
import { GroupedTimeEntryRow } from "./GroupedTimeEntryRow";
import {
  selectTimeEntriesGroupedByDate,
  selectTimeEntriesCount
} from "../store";
import { Button } from "@/components/ui/button";
import { RootState } from "../../../store/store";

const DAY_ENTRIES_LIMIT = 3; // Limite de dias a serem exibidos

export const TimeEntriesList = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleDays, setVisibleDays] = useState(DAY_ENTRIES_LIMIT); // Estado para controlar o número de dias visíveis
  const [loadMoreDays, setLoadMoreDays] = useState<number | null>(null); // Estado para controlar o número de dias adicionados ao clicar em "Load More"
  const [visibleMonths, setVisibleMonths] = useState<number>(4); // Definindo o número inicial de meses visíveis

  const groupedTimeEntries = useAppSelector((state) =>
    selectTimeEntriesGroupedByDate(state)
  );

  const sortedTimeEntries = Array.from(groupedTimeEntries.entries()).sort(
    (a, b) => (a[0] > b[0] ? -1 : 1)
  );

  if (sortedTimeEntries.length === 0) {
    return <EmptyState />;
  }

  useEffect(() => {
    // Executa handleCurrentMonthClick() quando o componente for montado
    handleCurrentMonthClick();
  }, []); // O array vazio assegura que o efeito seja executado apenas uma vez, ao montar o componente

  const handleCurrentMonthClick = () => {
    setSelectedMonth(getCurrentYearMonth());
    setVisibleDays(DAY_ENTRIES_LIMIT); // Resetando o número de dias visíveis ao mudar de mês
    setLoadMoreDays(null); // Resetando o número de dias adicionados ao mudar de mês
  };

  const handlePastMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false);
    setVisibleDays(DAY_ENTRIES_LIMIT); // Resetando o número de dias visíveis ao mudar de mês
    setLoadMoreDays(null); // Resetando o número de dias adicionados ao mudar de mês
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getCurrentYearMonth = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const generatePastMonths = (): string[] => {
    const pastMonths: Set<string> = new Set();
    groupedTimeEntries.forEach((_, date) => {
      const [year, month] = date.split("-");
      pastMonths.add(`${year}-${month}`);
    });
    return Array.from(pastMonths);
  };

  const pastMonths = generatePastMonths();

  const filteredTimeEntries = selectedMonth ? sortedTimeEntries.filter(([date]) => date.includes(selectedMonth)) : sortedTimeEntries;

  const limitedTimeEntries = filteredTimeEntries.slice(0, visibleDays + (loadMoreDays || 0)); // Limitando o número de dias visíveis

  const timeEntriesCount = useAppSelector(selectTimeEntriesCount);

  const handleLoadMore = () => {
    setLoadMoreDays((prevLoadMoreDays) => (prevLoadMoreDays || 0) + DAY_ENTRIES_LIMIT); // Aumentando o número de dias adicionados ao clicar em "Load More"
  };

  const handleLoadAll = () => {
    setVisibleDays(timeEntriesCount); // Definindo o número de dias visíveis como o total de entradas ao clicar em "Load All"
  };

  return (
    <div className="mt-4 flex flex-col space-y-6">
      <div className="flex justify-end">
        <div className="flex items-center mr-4">
          <Button className="mr-2" onClick={handleCurrentMonthClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Current Month
          </Button>

          <div className="relative">
            <Button
              onClick={toggleDropdown}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
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
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md dark:bg-zinc-700 dark:text-white" style={{ zIndex: 999 }}>
                {pastMonths.slice(0, visibleMonths).map((month) => (
                  <div
                    key={month}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-400"
                    onClick={() => handlePastMonthSelect(month)}
                  >
                    {month}
                  </div>
                ))}
                {visibleMonths < pastMonths.length && (
                  <div className="px-4 py-2 cursor-pointer hover:bg-blue-400 bg-primary text-white	" onClick={() => setVisibleMonths(prev => prev + 4)}>
                    Load More
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {limitedTimeEntries.map(([date, groupedTimeEntriesPerDate]) => {
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

      {/* Botões de paginação */}
      {visibleDays < timeEntriesCount && (
        <div className="flex justify-end space-x-4">
          <Button onClick={handleLoadMore}>Load More</Button>
          <Button variant="outline" onClick={handleLoadAll}>Load All</Button>
        </div>
      )}
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
  return (
    <div className="flex items-center">
      <span className="mr-2 text-lg font-semibold">{date}</span>
      <span className="mr-2 text-lg font-semibold opacity-50">
        {formatElapsedTime(elapsedTimePerDay)}
      </span>
      {/* Verificando se o tempo reportado é habilitado */}
      {reportedTimePerDay !== undefined && (
        <div className="flex items-center text-xs font-semibold">
          {/* <span className="rounded rounded-r-none border border-neutral bg-neutral2 pr-1">
            Logged
          </span> */}
          {/* <span className="flex items-center rounded rounded-l-none border bg-neutral-100 pl-1 pr-2 text-neutral opacity-50">
            {formatElapsedTime(reportedTimePerDay)}
          </span> */}
        </div>
      )}
    </div>
  );
}

export default TimeEntriesList;
