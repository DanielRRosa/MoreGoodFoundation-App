"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { timedTask } from "@prisma/client";
import { deleteTimedTask } from "@/src/database/serverStorage/TimedTasks/timedtasks.actions";
import { useState } from "react";

import TableInputCell from "./TableInputCell";
import EditCell from "./EditCell";

export const columns: ColumnDef<timedTask>[] = [
  {
    accessorKey: "name",
    header: "Name",
    sortDescFirst: true,
    cell: TableInputCell,
    meta: {
      type: "text",
    },
  },
  {
    id: "project",
    accessorKey: "projectId",
    header: "Project",
    cell: TableInputCell,
    meta: {
      type: "select",
      options: [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Communications", label: "Communications" },
        { value: "Business", label: "Business" },
        { value: "Psychology", label: "Psychology" },
      ],
    },
  },
  {
    id: "worked time",
    header: "Worked Time",
    cell: ({ row }) => {
      const startTime = row.original.startTime;
      const stopTime = row.original.stopTime;

      if (!stopTime) {
        return <p>Tracking on progress...</p>;
      }

      const updatedStartTime = `${startTime
        .getHours()
        .toString()
        .padStart(2, "0")} : ${startTime
        .getMinutes()
        .toString()
        .padStart(2, "0")} : ${startTime
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
      const updatedStopTime = `${stopTime
        ?.getHours()
        .toString()
        .padStart(2, "0")} : ${stopTime
        ?.getMinutes()
        .toString()
        .padStart(2, "0")} : ${stopTime
        ?.getSeconds()
        .toString()
        .padStart(2, "0")}`;

      return (
        <div className="full-flex gap-4">
          <p className="text-nowrap">{updatedStartTime}</p>-
          <p className="text-nowrap">{updatedStopTime}</p>
        </div>
      );
    },
  },
  {
    id: "totalTime",
    header: "",
    cell: ({ row }) => {
      const startTime = row.original.startTime;
      const stopTime = row.original.stopTime;

      if (!stopTime) {
        return <p className="font-bold text-nowrap text-right">00 : 00</p>;
      }

      const totalHours = stopTime?.getHours() - startTime.getHours();
      const totalMinutes = stopTime?.getMinutes() - startTime.getMinutes();
      const totalSeconds = stopTime?.getSeconds() - startTime.getSeconds();

      return (
        <p className="font-bold text-nowrap text-right">
          {totalHours === 0
            ? `${totalMinutes.toString().padStart(2, "0")} : ${totalSeconds
                .toString()
                .padStart(2, "0")}`
            : `${totalHours.toString().padStart(2, "0")} : ${totalMinutes
                .toString()
                .padStart(2, "0")} : ${totalSeconds
                .toString()
                .padStart(2, "0")}`}
        </p>
      );
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const [open, setOpen] = useState(false);

      const handleDeleteTimedTask = async (row) => {
        await deleteTimedTask(row);
        setOpen(false);
      };

      return (
        <div className="full-flex gap-2 justify-end">
          <EditCell row={row} table={table} />
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem id="delete" className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-destructive text-3xl">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to
                  permanently delete this file from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="full-col-flex">
                <Button
                  type="submit"
                  onClick={() => handleDeleteTimedTask(row.original)}
                  variant="destructive"
                  className="w-full"
                >
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
