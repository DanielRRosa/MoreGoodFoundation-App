"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const AuthButtons = ({}) => {
  const path = usePathname();

  if (path.includes("login")) {
    return (
      <Button variant="outline" asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    );
  }
  if (path.includes("unauthorized")) {
    return (
      <Button variant="outline" asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    );
  }
  if (path.includes("register")) {
    return (
      <Button variant="outline" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    );
  }
};

export default AuthButtons;
