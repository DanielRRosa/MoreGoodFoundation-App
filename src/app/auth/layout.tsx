import AuthButtons from "@/src/components/auth/AuthButtons";
import { ThemeToggle } from "@/src/components/theme/theme-toggle";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();

  return (
    <div className="">
      <div className="flex justify-between h-[100vh] w-[100vw]">
        <div className="flex justify-center items-center w-[65%] bg-primary max-md:hidden">
          <a className="text-7xl font-bold text-white dark:text-black mr-5">
            MGF
          </a>
          <a className="text-7xl text-white dark:text-black">Global</a>
        </div>
        <main className="flex flex-col justify-between h-[100vh] w-[35%] p-8 max-md:w-full">
          <div className="flex flex-row justify-between">
            <ThemeToggle />
            <AuthButtons />
          </div>
          <div className="flex flex-row justify-center">{children}</div>
          <div className="flex flex-row justify-center">
            <p className="text-sm capitalize">
              © {year}
              <Link className="underline underline-offset-2" href="/">
                {" "}
                {process.env.SITE_TITLE}
              </Link>{" "}
              - All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
