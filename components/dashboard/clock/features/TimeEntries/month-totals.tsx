"use client";

import { loadState } from "../../store/localStorage";
import { formatElapsedTime } from "@/components/dashboard/clock/utils";

const MonthTotals = () => {
  const data = loadState();
  const arr = Object.entries(data?.timeEntries.entities);
  const test = [];

  arr.forEach((entry) => {
    const total = entry[1].stopTime - entry[1].startTime;
    test.push(total);
  });

  const count = test.reduce(function (total, numero) {
    return total + numero;
  }, 0);

  return (
    <div>
      <span>Month Total</span>
      <span className="text-primary">{formatElapsedTime(count)}</span>
    </div>
  );
};

export default MonthTotals;
