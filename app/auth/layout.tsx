import AuthButtons from "@/components/auth/auth-buttons";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-between h-[100vh] w-[100vw]">
      <div className="flex justify-center items-center w-[65%] bg-primary">
        <a className="text-7xl font-bold text-white dark:text-black mr-5">
          MGF
        </a>
        <a className="text-7xl text-white dark:text-black">Global</a>
      </div>
      <main className="flex flex-col justify-between h-[100vh] w-[35%] p-8 ">
        <div className="flex flex-row justify-between">
          <ThemeToggle />
          <AuthButtons />
        </div>
        <div className="flex flex-row justify-center">{children}</div>
        <div className="flex flex-row justify-between">
          <p className="text-sm capitalize">
            © {year}
            <Link className="underline underline-offset-2" href="/">
              {" "}
              {process.env.SITE_TITLE}
            </Link>{" "}
            - All rights reserved.
          </p>
          <div className="divide-x grid grid-cols-2">
            <Link className="px-4 text-sm capitalize" href="/auth/login">
              Login
            </Link>
            <Link className="px-4 text-sm capitalize" href="/auth/login">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
