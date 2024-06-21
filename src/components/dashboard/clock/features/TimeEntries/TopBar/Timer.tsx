import React, { useEffect, useState } from "react";

interface TimerProps {
  startTime: string; // Start time as an ISO 8601 date string
}

const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    // Convert startTime string to Date object
    const startDate = new Date(startTime);

    const timerInterval = setInterval(() => {
      const currentTimestamp = Date.now();
      const elapsed = currentTimestamp - startDate.getTime(); // Calculate elapsed time in milliseconds
      setElapsedTime(elapsed);
    }, 1000); // Update every second

    return () => clearInterval(timerInterval);
  }, [startTime]); // Re-run effect if startTime prop changes

  // Calculate hours, minutes, and seconds from elapsed time
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  return (
    <span className="flex justify-end text-lg text-nowrap text-right font-bold w-[100px]">
      {`${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`}
    </span>
  );
};

export default Timer;
