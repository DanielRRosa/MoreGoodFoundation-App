"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { testId } from "../../../../testUtils/testId";
import { TimeEntry, timeEntryUpdated } from "../../store";
import { Button } from "@/components/ui/button";
import { formatElapsedTime } from "@/components/dashboard/clock/utils";

interface TimeEntryEditProps {
  timeEntry: TimeEntry;
  setIsEditVisible: (flag: boolean) => void;
}

export const TimeEntryEdit: React.FC<TimeEntryEditProps> = ({
  timeEntry,
  setIsEditVisible,
}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsEditVisible(false);
  };

  const handleSave = () => {
    dispatch(
      timeEntryUpdated({
        id: timeEntry.id,
        changes: {
          startTime: startTimeValue,
          stopTime: stopTimeValue,
          text: entryText,
        },
      })
    );
    setIsEditVisible(false);
  };

  const [startTimeValue, setStartTimeValue] = useState<number>(
    timeEntry.startTime
  );
  const [stopTimeValue, setStopTimeValue] = useState<number | undefined>(
    timeEntry.stopTime
  );
  const [entryText, setEntryText] = useState<string>(timeEntry.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryText(event.target.value);
  };

  return (
    <div className="full-flex flex-grow items-center">
      <div className="full-flex ">
        <Input
          placeholder={entryText}
          value={entryText}
          onChange={handleTextChange}
          className="border rounded-md"
        />
        <div data-testid={testId.startTime}>
          <DatePicker
            className="rounded border "
            selected={new Date(startTimeValue)}
            onChange={(date: Date) =>
              date && setStartTimeValue(date?.getTime())
            }
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
        -
        <div data-testid={testId.stopTime}>
          <DatePicker
            className="rounded bg-transparent"
            disabled={!stopTimeValue}
            selected={
              stopTimeValue ? new Date(stopTimeValue) : new Date(Date.now())
            }
            onChange={(date: Date) => date && setStopTimeValue(date?.getTime())}
            timeInputLabel="Time:"
            dateFormat="HH:mm"
            showTimeInput
          />
        </div>
      </div>
      <span>
        {stopTimeValue
          ? formatElapsedTime(stopTimeValue - startTimeValue)
          : formatElapsedTime(0)}
      </span>
      <div className="flex flex-row justify-end gap-2">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="default" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};
