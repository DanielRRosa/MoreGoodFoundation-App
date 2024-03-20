import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Components Props
interface GreatingProps {
  Title?: ReactNode;
  Message?: ReactNode;
  children: ReactNode;
}

interface GreatingMessageProps {
  user?: string;
  message?: string;
  className?: string;
  defaultMessage?: string;
}

// Main Component
const Greating = ({ children }: GreatingProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

// Children Components
function Title({
  user,
  className="",
  defaultMessage = "Welcome Back!",
}: GreatingMessageProps) {
  return (
    <h2 className={cn("text-3xl font-bold capitalize antialiased text-blue-600 dark:text-white", className)}>
      {!user ? `${defaultMessage}` : `Welcome, ${user}!`}
    </h2>
  );
}

function Message({
  message,
  className,
  defaultMessage = "Default message",
}: GreatingMessageProps) {
  return (
    <p className={cn("text-s antialiased", className)}>
      {!message ? (defaultMessage as string) : (message as string)}
    </p>
  );
}

Greating.Title = Title;
Greating.Message = Message;

export { Greating };
