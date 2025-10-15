"use client";
import { cn, getInitals } from "@/lib/utils";
import { BookA } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

function Header({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link
        href="/"
        className={
          pathname === "/"
            ? "text-[var(--light-200)]"
            : "text-[var(--light-100)]"
        }
      >
        <BookA width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "cursor-pointer text-base font-semibold capitalize",
              pathname === "/library"
                ? "text-[var(--light-200)]"
                : "text-[var(--light-100)]"
            )}
          >
            library
          </Link>
        </li>
        <li>
          <Link href="/my-profile" className={cn("cursor-pointer")}>
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitals(session.user?.name ?? "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
