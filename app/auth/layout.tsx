import AuthButtons from "@/components/auth/auth-buttons";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="flex flex-col h-screen">
          <div className="flex justify-center items-center bg-primary p-4">
            <a className="text-4xl font-bold text-white dark:text-black mr-2">
              MGF
            </a>
            <a className="text-4xl text-white dark:text-black">Global</a>
          </div>
          <main className="flex flex-col flex-1 p-4">
            <div className="flex justify-between mb-4">
              <ThemeToggle />
              <AuthButtons />
            </div>
            <div className="flex flex-col items-center mb-4">{children}</div>
            <div className="flex justify-center mb-4">
              <p className="text-xs capitalize">
                © {year}
                <Link className="underline" href="/">
                  {" "}
                  {process.env.SITE_TITLE}
                </Link>{" "}
                - All rights reserved.
              </p>
            </div>
            <div className="flex justify-center">
              <Link className="text-sm capitalize mr-2" href="/auth/login">
                Login
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block">
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
                {/* <Link className="px-4 text-sm capitalize" href="/auth/login">
                  Login
                </Link> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
