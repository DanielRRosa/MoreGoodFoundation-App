import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { auth } from "@/src/app/api/auth/[...nextauth]/(Settings)/auth";

export default async function NotFound() {
  const session = await auth();
  return (
    <div className="w-[100vw] h-[100vh]">
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      {session?.user ? (
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/dashboard">Return to Login</Link>
        </Button>
      )}
    </div>
  );
}
