import { ThemeToggle } from "../theme/theme-toggle";
import UserImage from "./user-image";
import Logo from "./logo";
import NotificationIcon from "./notification-icon";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationIcon />
        <UserImage />
      </div>
    </div>
  );
};

export default Navbar;
