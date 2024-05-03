"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatElapsedTime } from "../../../utils";
import { TimeEntryEdit } from "../components/TimeEntryEdit";
import { Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTimedTask } from "@/database/serverStorage/TimedTasks/timedtasks.actions";
import { timedTask } from "@prisma/client";

export const TimeEntryRow = ({ timeEntry }: { timeEntry: timedTask }) => {
  const dispatch = useAppDispatch();

  const [isEditVisible, setIsEditVisible] = useState(false);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const handleRemoveEntry = async () => {
    setRemoveDialogOpen(false);
    dispatch(timeEntryRemoved(timeEntry.id));
    await deleteTimedTask(timeEntry);
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
    <Dialog
      open={removeDialogOpen}
      onOpenChange={() => setRemoveDialogOpen(false)}
    >
      <DialogContent>
        <DialogHeader className="text-3xl font-bold text-destructive flex flex-row items-center gap-4">
          Delete time record
          <Trash />
        </DialogHeader>
        <DialogDescription className="text-base">
          Are you sure you want to delete this time record? This cannot be
          undone.
          {timeEntry.logged && "This entry was already logged!"}
        </DialogDescription>
        <div className="flex flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="destructive"
            className="w-full"
            onClick={handleRemoveEntry}
            aria-label="Confirm entry romoval"
            title="Confirm entry removal"
          >
            Delete
          </Button>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
