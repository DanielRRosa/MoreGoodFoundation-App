"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDatetime, formatElapsedTime } from "../../../utils";
import { useAppDispatch } from "../../../hooks";
import { useState } from "react";
import { TimeEntryEdit } from "../components/TimeEntryEdit";
import { TimeEntry, timeEntryRemoved } from "../store";
import { Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";

export const TimeEntryRow = ({ timeEntry }: { timeEntry: TimeEntry }) => {
  const dispatch = useAppDispatch();

  const [isEditVisible, setIsEditVisible] = useState(false);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const handleRemoveEntry = () => {
    setRemoveDialogOpen(false);
    dispatch(timeEntryRemoved(timeEntry.id));
  };

  return (
    <div>
      <div className="full-flex py-2" aria-label="Time entry child row">
        <div className="max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium ">
          {timeEntry.text}
        </div>
        <div className="flex flex-grow flex-row items-center justify-end gap-2">
          <div className="w-[75px] text-right text-base font-medium opacity-60">
            {formatElapsedTime(timeEntry.stopTime! - timeEntry.startTime)}
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditVisible((state) => !state)}
            size="icon"
          >
            <Edit2 aria-label="Edit entry" className="size-5" />
          </Button>
          <Button
            variant="destructive"
            onClick={() => setRemoveDialogOpen(true)}
            size="icon"
          >
            <Trash aria-label="Remove entry" className="size-5" />
          </Button>
        </div>
      </div>

      {removeDialogOpen && (
        <RemoveEntryDialog
          removeDialogOpen={removeDialogOpen}
          setRemoveDialogOpen={setRemoveDialogOpen}
          timeEntry={timeEntry}
          handleRemoveEntry={handleRemoveEntry}
        />
      )}

      {isEditVisible && (
        <TimeEntryEdit
          setIsEditVisible={setIsEditVisible}
          timeEntry={timeEntry}
        />
      )}
    </div>
  );
};

function RemoveEntryDialog({
  removeDialogOpen,
  setRemoveDialogOpen,
  timeEntry,
  handleRemoveEntry,
}: {
  removeDialogOpen: boolean;
  setRemoveDialogOpen: (flag: boolean) => void;
  timeEntry: TimeEntry;
  handleRemoveEntry: () => void;
}) {
  return (
    <Dialog open={removeDialogOpen} onClose={() => setRemoveDialogOpen(false)}>
      <DialogContent>
        <DialogHeader className="text-3xl font-bold">
          Delete time record
        </DialogHeader>
        <DialogDescription className="text-base">
          Do you really want to delete entry {timeEntry.text} which started in{" "}
          {formatDatetime(timeEntry.startTime)} and ended in{" "}
          {formatDatetime(timeEntry.stopTime!)}.
          {timeEntry.logged && "This entry was already logged!"}
        </DialogDescription>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => setRemoveDialogOpen(false)}
            aria-label="Cancel entry romoval"
            title="Cancel entry removal"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            variant="destructive"
            className="w-full"
            onClick={handleRemoveEntry}
            aria-label="Confirm entry romoval"
            title="Confirm entry removal"
          >
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
