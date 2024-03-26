import { ThemeToggle } from "../theme/theme-toggle";
import UserImage from "./user-image";
import Logo from "./logo";
import NotificationButton from "./notifications/notification-button-trigger";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationButton />
        <UserImage />
      </div>
    </div>
  );
};

export default Navbar;
