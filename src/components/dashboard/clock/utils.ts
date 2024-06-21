const addLeadingZeros = (num, totalLength) => {
  return String(num).padStart(totalLength, "0");
};

export const formatElapsedTime = (timeDiff) => {
  timeDiff /= 1000;
  const seconds = Math.round(timeDiff % 60);
  timeDiff /= 60;
  const minutes = Math.round(timeDiff % 60);
  timeDiff /= 60;
  const hours = Math.round(timeDiff);
  return `${addLeadingZeros(hours, 2)} : ${addLeadingZeros(
    minutes,
    2
  )} : ${addLeadingZeros(seconds, 2)}`;
};

export const parseElapsedTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  return totalMilliseconds;
};

export const formatDayMonthYear = (datetime) => {
  const dateObj = new Date(datetime);

  return dateObj.toISOString().slice(0, 10);
};

export const formatDatetime = (datetime) => {
  const dateObj = new Date(datetime);

  return dateObj.toLocaleString();
};

export const formatTime = (datetime) => {
  const dateObj = new Date(datetime);

  const hours = addLeadingZeros(dateObj.getHours(), 2);
  const minutes = addLeadingZeros(dateObj.getMinutes(), 2);
  const seconds = addLeadingZeros(dateObj.getSeconds(), 2);

  return `${hours}:${minutes}:${seconds}`;
};

export const generateId = () => {
  return (1 + Math.random()).toString(16).substring(1);
};
