"use client";

import { Button } from "@/components/ui/button";

export const ToggleAccordionIcon = ({
  onClick,
  isCollapsed,
}: {
  onClick: () => void;
  isCollapsed: boolean;
}) => {
  return (
    <div className="flex items-center justify-center">
      <Button
        size="icon"
        className="size-8"
        aria-label="Grouped entry accordion"
        onClick={onClick}
        variant="ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </Button>
    </div>
  );
};
