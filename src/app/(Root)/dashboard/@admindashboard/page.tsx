import { auth } from "@/src/app/api/auth/[...nextauth]/(Settings)/auth";

import { TopBar } from "@/src/components/dashboard/clock/features/TimeEntries/TopBar";
import { Greating } from "@/src/components/dashboard/Welcome";
import MonthTotals from "@/src/components/dashboard/clock/features/TimeEntries/MonthTotals";
import { AddNewTeamDialog } from "@/src/components/navigation/modals/AddNewTeamDialog";
import { AddNewProjectDialog } from "@/src/components/navigation/modals/AddNewProject";
import { getAllUsers } from "@/src/database/serverStorage/User/user.actions";
import { getAllProjects } from "@/src/database/serverStorage/Project/project.actions";
import { DataTable } from "@/src/components/dashboard/clock/features/TimeEntries/TimeEntriesList/TableData";
import { columns } from "@/src/components/dashboard/clock/features/TimeEntries/TimeEntriesList/TableColumns";
import { findAllUserTimedTasks } from "@/src/database/serverStorage/TimedTasks/timedtasks.actions";
import { EmptyState } from "@/src/components/dashboard/clock/features/TimeEntries/TimeEntriesList/EmptyState";
import { timedTask } from "@prisma/client";

const AdminDashboard = async () => {
  const session = await auth();
  const users = await getAllUsers();
  const projects = await getAllProjects();
  const timedTasks: timedTask[] = await findAllUserTimedTasks();

  // Agrupar as entradas por data
  const groupedEntries = timedTasks.reduce((acc, entry) => {
    const createdTime = (entry as timedTask).createdTime; // Supondo que "createdTime" é uma propriedade das entradas
    const displayDate = new Date(createdTime).toLocaleDateString(); // Formatar a data para exibição, ajuste conforme necessário

    if (!acc[displayDate]) {
      acc[displayDate] = [];
    }
    acc[displayDate].push(entry);
    return acc;
  }, {});

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
        <div>
          {Object.keys(groupedEntries).map((date) => {
            console.log(groupedEntries[date]);

            return (
              <div className="full-col-flex mt-8 first:mt-0" key={date}>
                <div className="full-flex">
                  <h2 className="font-bold">{date}</h2>
                  <span className="opacity-60">Teste</span>
                </div>
                {groupedEntries[date].map((entry) => {
                  return (
                    <DataTable
                      key={entry.id}
                      columns={columns}
                      data={groupedEntries[date]}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AdminDashboard;
