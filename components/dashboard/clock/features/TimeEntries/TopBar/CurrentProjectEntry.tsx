"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CurrentProjectEntry = ({
  onSelect,
}: {
  onSelect?: ((value: string) => void) | undefined;
}) => {
  const projects = [
    { name: "Teste" },
    { name: "Teste 2" },
    { name: "Test 4" },
    { name: "Settings" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center justify-center border border-neutral rounded-full"
        >
          <Plus className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Command>
          <CommandInput placeholder="Search your team projects" />
          <CommandList>
            <CommandEmpty>
              No projects was found. Please search again or create a new
              project.
            </CommandEmpty>
            <CommandGroup heading="Your team projects">
              {projects.map((project) => {
                return (
                  <CommandItem
                    key={project.name}
                    className="capitalize"
                    onSelect={onSelect}
                  >
                    {project.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CurrentProjectEntry;
