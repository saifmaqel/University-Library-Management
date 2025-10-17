"use client";
import { cn, getInitals } from "@/lib/utils";
import { BookA } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signOutAction } from "@/lib/actions/auth";

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
          <Link href="/my-profile" className={cn("cursor-pointer")}>
            <Avatar>
              <AvatarFallback className="bg-amber-100 font-semibold">
                {getInitals(session.user?.name ?? "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          <form action={signOutAction} className="flex justify-between">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 cursor-pointer font-extrabold text-[var(--dark-100)]"
            >
              Logout
            </Button>
          </form>
        </li>
        <li>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/80 cursor-pointer font-extrabold text-[var(--dark-100)]"
            onClick={() => {
              redirect("/admin");
            }}
          >
            Admin
          </Button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
