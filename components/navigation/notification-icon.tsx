"use client";

import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const NotificationIcon = () => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer" asChild>
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default NotificationIcon;
