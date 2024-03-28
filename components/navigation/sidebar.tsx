import Link from "next/link";
import { BarChart2, Bell } from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <BarChart2 className="size-5" />,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: <Bell className="size-5" />,
    },
  ];

  return (
    <div className="sticky top-4 flex flex-col justify-start gap-5 group transition-all duration-300 p-4 h-full rounded-[20px] bg-black/10 w-[50px] hover:w-[180px] dark:bg-white/5">
      <ul className="flex flex-col justify-start gap-5">
        {links.map((link) => (
          <Link
            className={"text-base flex flex-row gap-2 items-center"}
            key={link.label}
            href={link.href}
          >
            <div>{link.icon}</div>
            <span className="opacity-0 transition-all duration-300 group-hover:opacity-100">
              {link.label}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
