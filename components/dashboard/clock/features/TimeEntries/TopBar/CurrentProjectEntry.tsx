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
import { Project } from "@prisma/client";

const CurrentProjectEntry = ({
  projects,
  onSelect,
}: {
  projects: Array<Project>;
  onSelect?: ((value: string) => void) | undefined;
}) => {
  const { projects: receivedProjects } = projects;

  if (receivedProjects == undefined) {
    return <div>Div</div>;
  } else {
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
                {receivedProjects.map((project: Project) => {
                  return (
                    <CommandItem
                      key={project.id}
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
  }
};

export default CurrentProjectEntry;
