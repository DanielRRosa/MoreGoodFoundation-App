import { ThemeToggle } from "../theme/theme-toggle";
import UserImage from "./UserAccountNavigation";
import Logo from "./MainLogo";
import NotificationButton from "./notifications/notification-button-trigger";
import { Session } from "next-auth";

const Navbar = ({ session }: { session: Session }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationButton />
        <UserImage session={session} />
      </div>
    </div>
  );
};

export default Navbar;
