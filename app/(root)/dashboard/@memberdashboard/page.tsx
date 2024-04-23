import { auth } from "@/app/api/auth/[...nextauth]/(Settings)/auth";

import { TimeEntriesList } from "@/components/dashboard/clock/features/TimeEntries/TimeEntriesList";
import { TopBar } from "@/components/dashboard/clock/features/TimeEntries/TopBar";
import { Greating } from "@/components/dashboard/Welcome";
import MonthTotals from "@/components/dashboard/clock/features/TimeEntries/MonthTotals";

const MemberDashboard = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_600px] gap-4 justify-between items-center">
        <Greating>
          <Greating.Title user={session?.user.firstName as string} />
          <Greating.Message />
        </Greating>
        <div className="flex flex-row justify-end items-center gap-4">
          <MonthTotals />
        </div>
      </div>
      <TopBar />
      <TimeEntriesList />
    </div>
  );
};

export default MemberDashboard;
