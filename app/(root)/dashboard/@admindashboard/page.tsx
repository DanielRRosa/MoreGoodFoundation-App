import { auth } from "@/app/api/auth/[...nextauth]/(Settings)/auth";

import { TopBar } from "@/components/dashboard/clock/features/TimeEntries/TopBar";
import { Greating } from "@/components/dashboard/Welcome";
import MonthTotals from "@/components/dashboard/clock/features/TimeEntries/MonthTotals";
import { AddNewTeamDialog } from "@/components/navigation/modals/AddNewTeamDialog";
import { AddNewProjectDialog } from "@/components/navigation/modals/AddNewProject";
import { getAllUsers } from "@/database/serverStorage/User/user.actions";
import { getAllProjects } from "@/database/serverStorage/Project/project.actions";
import { DataTable } from "@/components/dashboard/clock/features/TimeEntries/TimeEntriesList/TableData";
import { columns } from "@/components/dashboard/clock/features/TimeEntries/TimeEntriesList/TableColumns";
import { findAllUserTimedTasks } from "@/database/serverStorage/TimedTasks/timedtasks.actions";
import { EmptyState } from "@/components/dashboard/clock/features/TimeEntries/TimeEntriesList/EmptyState";

const AdminDashboard = async () => {
  const session = await auth();
  const users = await getAllUsers();
  const projects = await getAllProjects();
  const timedTasks = await findAllUserTimedTasks();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 justify-between items-center">
        <Greating>
          <Greating.Title user={session?.user.firstName as string} />
          <Greating.Message />
        </Greating>
        <div className="flex flex-row justify-end items-center gap-4">
          <MonthTotals />
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <MonthTotals />
        <div className="flex flex-row justify-end items-center gap-4">
          <AddNewProjectDialog />
          <AddNewTeamDialog users={users} />
        </div>
      </div>
      <TopBar projects={projects} session={session} />
      {timedTasks.length !== 0 ? (
        <DataTable columns={columns} data={timedTasks} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AdminDashboard;
