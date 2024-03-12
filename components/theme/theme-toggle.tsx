"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  if (theme === "system") {
    setTheme("light");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="outline-none cursor-pointer focus:outline-none"
      onClick={() => {
        if (theme === "dark") setTheme("light");
        if (theme === "light") setTheme("dark");
      }}
    >
      <Moon className="size-5 transition-all hidden dark:block" />
      <Sun className="size-5 transition-all block dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
