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
  onSelect: ((selectedProject: Project) => void) | undefined; // Update the type of onSelect to accept a Project object
}) => {
  if (!projects || projects.length === 0) {
    return <div className="hidden"></div>;
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
                No projects were found. Please search again or create a new
                project.
              </CommandEmpty>
              <CommandGroup>
                {projects.map((project: Project) => (
                  <CommandItem
                    key={project.id}
                    className="capitalize"
                    onSelect={() => onSelect && onSelect(project)} // Pass the entire project object to onSelect
                  >
                    {project.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CurrentProjectEntry;
