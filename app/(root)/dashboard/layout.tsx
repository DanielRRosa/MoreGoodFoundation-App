import { ReactNode } from "react";
import { auth } from "@/next-auth/auth";
import { redirect } from "next/navigation";

const Dashboard = async ({
  admindashboard,
  supervisordashboard,
  memberdashboard,
}: {
  admindashboard: ReactNode;
  supervisordashboard: ReactNode;
  memberdashboard: ReactNode;
}) => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  if (session?.user?.role === "admin") {
    return <div>{admindashboard}</div>;
  }
  if (session?.user?.role === "supervisor") {
    return <div>{supervisordashboard}</div>;
  }
  if (session?.user?.role === "member") {
    return <div>{memberdashboard}</div>;
  }
};

export default Dashboard;
