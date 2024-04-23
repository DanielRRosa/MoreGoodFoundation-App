import { auth } from "@/app/api/auth/[...nextauth]/(Settings)/auth";

import { TimeEntriesList } from "@/components/dashboard/clock/features/TimeEntries/TimeEntriesList";
import { TopBar } from "@/components/dashboard/clock/features/TimeEntries/TopBar";
import { Greating } from "@/components/dashboard/Welcome";
import MonthTotals from "@/components/dashboard/clock/features/TimeEntries/MonthTotals";
import { AddNewTeamDialog } from "@/components/navigation/modals/AddNewTeamDialog";
import { AddNewProjectDialog } from "@/components/navigation/modals/AddNewProject";

const AdminDashboard = async () => {
  const session = await auth();
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
          <AddNewTeamDialog />
        </div>
      </div>
      <TopBar />
      <TimeEntriesList />
    </div>
  );
};

export default AdminDashboard;
