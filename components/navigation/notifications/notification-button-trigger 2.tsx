"use client";

import { Button } from "../../ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Command } from "@/components/ui/command";
import NotificationContent from "./notifications-content";

const NotificationIcon = () => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer" asChild>
        <Button variant="ghost" size="icon" title="Notifications">
          <div className="size-3 bg-blue-600 rounded-full absolute translate-x-[8px] translate-y-[-8px]"></div>
          <Bell className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center">
        <Command>
          <NotificationContent />
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationIcon;
