"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

function UserImage() {
  const { data: session, status } = useSession();
  const userFullName = `${session?.user?.firstName} ${session?.user?.lastName}`;

  const userSettingsLinks = [
    {
      name: "Settings",
      href: "/account/settings",
    },
  ];

  return (
    <div>
      <div>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-nowrap flex-row items-center gap-4 border border-neutral rounded-full pl-1 pr-4 max-h-[50px] min-w-[200px]"
              >
                <Image
                  className="rounded-full"
                  src={session?.user?.image as string}
                  title={userFullName as string}
                  alt={userFullName as string}
                  width={40}
                  height={40}
                />
                <div className="text-left w-full">
                  <p className="capitalize">{userFullName}</p>
                  <p className="capitalize text-xs">
                    {session?.user?.role === "admin"
                      ? "administrator"
                      : (session.user.role as string)}
                  </p>
                </div>
                <ChevronDown className="min-h-[20px] min-w-[20px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userFullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {userSettingsLinks.map((link) => {
                  return (
                    <DropdownMenuItem key={link.name}>
                      <Link href={link.href} title={link.name as string}>
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                title="Log out"
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/auth/login" })
                }
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="animate-pulse flex flex-nowrap flex-row items-center gap-4 border border-neutral rounded-full pl-1 pr-4 min-h-[50px] min-w-[200px]">
            <div className="rounded-full bg-neutral-200 min-h-[40px] min-w-[40px]"></div>
            <div className="w-full flex flex-col gap-2">
              <div className="rounded-full bg-neutral-200 h-2 w-full"></div>
              <div className="rounded-full bg-neutral-200 h-2 w-full"></div>
            </div>
            <div className="rounded-full bg-neutral-200 min-h-[20px] min-w-[20px]"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserImage;
