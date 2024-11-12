import Image from "next/image";
import Link from "next/link";
import { auth } from "~/server/auth";
import Menu from "./menu";

export default async function Header() {
  const session = await auth();

  // api/auth/signin
  // api/auth/signout

  return (
    <nav className="bg-blue-800 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <Image
            alt="Tampa Devs"
            width={40}
            height={40}
            src="/assets/images/logo.webp"
            className="h-10 w-10"
          />
          <h1 className="text-xl font-medium">Tampa Devs Mentorship</h1>
        </div>

        <div className="flex gap-4">
          {!session && (
            <div className="flex items-center gap-4">
              <Link href="api/auth/signin">Sign In</Link>
              <Link
                href="api/auth/signin"
                className="rounded bg-blue-600 px-3 py-2"
              >
                Sign Up
              </Link>
            </div>
          )}
          <Menu session={session} />
        </div>
      </div>
    </nav>
  );
}
