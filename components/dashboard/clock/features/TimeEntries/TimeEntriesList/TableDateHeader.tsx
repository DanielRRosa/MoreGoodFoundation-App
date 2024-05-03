import React from "react";

// Define the Entry type
type Entry = {
  id: number;
  entryDate: string; // Assuming entryDate is a string in ISO format (e.g., "2024-05-01")
  title: string;
  content: string;
};

// Define props type for EntryList component
type EntryListProps = {
  entries: Entry[];
};

export const TableDateHeader: React.FC<EntryListProps> = ({ entries }) => {
  // Function to determine the display text for the entry date

  console.log(entries);
  const getDateDisplay = (entryDate: string): string => {
    const today = new Date();
    const date = new Date(entryDate);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (
      isSameDay(date, new Date(today.getTime() - 24 * 60 * 60 * 1000))
    ) {
      return "Yesterday";
    } else {
      return formatDate(entryDate); // Custom function to format other dates
    }
  };

  // Function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Function to format the entry date (if it's not today or yesterday)
  const formatDate = (entryDate: string): string => {
    const date = new Date(entryDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Group entries by display date ("Today", "Yesterday", formatted date)
  const groupedEntries: { [key: string]: Entry[] } = entries.reduce(
    (acc, entry) => {
      const displayDate = getDateDisplay(entry.entryDate);

      // Initialize array for the display date if it doesn't exist
      if (!acc[displayDate]) {
        acc[displayDate] = [];
      }

      // Push the entry to the corresponding display date group
      acc[displayDate].push(entry);
      return acc;
    },
    {}
  );

  // Render grouped entries with headers for each date
  return (
    <div>
      {Object.keys(groupedEntries).map((date) => (
        <div key={date}>
          <h2>{date}</h2>
        </div>
      ))}
    </div>
  );
};
