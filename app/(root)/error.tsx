"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <p className="text-base">There was a problem</p>
      <h1 className="text-5xl font-bold antialiased">{error.message}</h1>
      <p className="text-lg">
        Please try again later or contact support if the problem persists.
      </p>
      <div className="flex flex-row gap-4">
        <Button className="w-[160px] capitalize" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline" className="w-[160px]">
          <Link href="/dashboard" className="capitalize">
            Go to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
