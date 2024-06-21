import { ReactNode } from "react";

import { Toaster } from "sonner";
import Navbar from "@/src/components/navigation/navbar";
import { NotificationModal } from "@/src/components/navigation/notifications/notification-modal";
import Sidebar from "@/src/components/navigation/sidebar";
import { auth } from "../api/auth/[...nextauth]/(Settings)/auth";
import { Session } from "next-auth";

const Account = async ({ children }: { children: ReactNode }) => {
  const session: Session | null = await auth();
  return (
    <div className="flex gap-4 flex-col p-4 min-h-screen">
      <div className="flex gap-8">
        <Sidebar />
        <main className="flex flex-col gap-4 w-full">
          <Navbar session={session} />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">{children}</div>
          </div>
        </main>
        <NotificationModal />
      </div>
      <Toaster />
    </div>
  );
};

export default Account;
