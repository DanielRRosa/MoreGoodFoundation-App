// Typescript types
import { Session } from "next-auth";
import { Project } from "@prisma/client";

// UI Components
import { NewTimeEntry } from "./NewTimeEntry";

export const TopBar = ({
  projects,
  session,
}: {
  projects: Array<Project>;
  session: Session | null;
}) => {
  return (
    <div className="w-full">
      <NewTimeEntry projects={projects} session={session} />
    </div>
  );
};
