import { ReactNode } from "react";

import { Toaster } from "sonner";
import Navbar from "@/components/navigation/navbar";
import { NotificationModal } from "@/components/navigation/notifications/notification-modal";
import Sidebar from "@/components/navigation/sidebar";

const Account = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-4 flex-col p-4 min-h-screen">
      <div className="flex gap-8">
        <Sidebar />
        <main className="flex flex-col gap-4 w-full">
          <Navbar />
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
