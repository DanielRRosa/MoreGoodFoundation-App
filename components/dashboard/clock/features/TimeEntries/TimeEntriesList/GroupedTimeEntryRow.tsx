"use client";

import { formatElapsedTime } from "../../../utils";
import { Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { TimeEntryRow } from "./TimeEntryRow";
import { useState } from "react";
import { TimeEntryText } from "../components/TimeEntryText";
import { ToggleAccordionIcon } from "../../../ui/ToggleAccordionIcon";
import { GroupedTimeEntry, timeEntryAdded } from "../store";
import { Button } from "@/components/ui/button";
import { TimeReportingDialog } from "./TimeReportingDialog";
import { RootState } from "../../../store/store";

interface GroupedTimeEntryRowProps {
  groupedTimeEntry: GroupedTimeEntry;
}

export const GroupedTimeEntryRow: React.FC<GroupedTimeEntryRowProps> = ({
  groupedTimeEntry,
}) => {
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isTimeReportingDialogVisible, setIsTimeReportingDialogVisible] =
    useState(false);
  const isAdjustableTimeReportingEnabled = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.isAdjustableTimeReportingEnabled
  );

  const handleAddTimeEntryClick = () => {
    console.log(groupedTimeEntry);
    dispatch(
      timeEntryAdded({
        text: groupedTimeEntry.text,
        project: groupedTimeEntry.subEntries[0].project,
        startTime: Date.now(),
      })
    );
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((state) => !state);
  };

  return (
    <div className="p-2 border border-neutral rounded-md">
      <div className="full-flex" aria-label="Grouped entry row">
        <SubEntriesCount
          onClick={handleToggleCollapse}
          groupedTimeEntry={groupedTimeEntry}
        />
        <TimeEntryText timeEntryText={groupedTimeEntry.text} />
        <div className="flex flex-grow flex-row items-center justify-end gap-2">
          {isAdjustableTimeReportingEnabled ? (
            <div
              className="flex w-[75px] cursor-default flex-col items-center justify-center"
              onClick={() => {
                setIsTimeReportingDialogVisible(true);
              }}
            >
              <div className="rounded rounded-b-none border border-b-0 px-2 text-center text-xs font-medium tabular-nums text-neutral-800 opacity-60">
                {formatElapsedTime(groupedTimeEntry.elapsedTime)}
              </div>

              <div className="flex items-center text-base font-medium ">
                <span className="flex items-center rounded rounded-t-none border bg-neutral-100 px-2 tabular-nums  text-neutral-700 opacity-50">
                  {formatElapsedTime(groupedTimeEntry.loggedTime)}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-[75px] text-right text-base font-medium text-neutral-800 opacity-60 dark:text-white">
              {formatElapsedTime(groupedTimeEntry.elapsedTime)}
            </div>
          )}
          <Button
            variant="default"
            size="icon"
            onClick={handleAddTimeEntryClick}
          >
            <Play className="size-5" />
          </Button>
          <ToggleAccordionIcon
            onClick={handleToggleCollapse}
            aria-label="Grouped entry accordion"
            isCollapsed={isCollapsed}
          />
        </div>
      </div>

      {isTimeReportingDialogVisible && (
        <TimeReportingDialog
          groupedTimeEntry={groupedTimeEntry}
          setIsVisible={setIsTimeReportingDialogVisible}
          isVisible={isTimeReportingDialogVisible}
        />
      )}

      {!isCollapsed && (
        <div className="flex flex-col">
          {[...groupedTimeEntry.subEntries].reverse().map((entry) => (
            <TimeEntryRow timeEntry={entry} key={entry.id} />
          ))}
        </div>
      )}
    </div>
  );
};

function SubEntriesCount({
  onClick,
  groupedTimeEntry,
}: {
  onClick: () => void;
  groupedTimeEntry: GroupedTimeEntry;
}) {
  return (
    <div
      onClick={onClick}
      className="mr-2 flex h-6 w-6 shrink-0 select-none items-center justify-center rounded border border-neutral-300 bg-neutral-100 text-xs font-medium hover:cursor-pointer hover:bg-neutral-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      {groupedTimeEntry.ids.length}
    </div>
  );
}
