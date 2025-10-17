"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitals } from "@/lib/utils";
import { BookA } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 left-0 flex h-dvh flex-col justify-between bg-white px-5 pt-10 pb-5">
      <div>
        <div className="border-secondary flex flex-row items-center gap-2 border-b pb-10 text-[var(--primary-admin)] max-md:justify-center">
          <BookA height={37} width={37} />
          <h1 className="text-2xl font-semibold text-[var(--primary-admin)] max-md:hidden">
            BookWize
          </h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map(({ icon: Icon, route, text }) => {
            const isSelected =
              (route !== "/admin" &&
                pathname.includes(route) &&
                route.length > 1) ||
              pathname === route;

            const isDisabled = route !== "/admin/books";

            return (
              <Link
                href={isDisabled ? "#" : route}
                key={route}
                aria-disabled={isDisabled}
                onClick={(e) => isDisabled && e.preventDefault()}
                className={cn(
                  "flex w-fit flex-row items-center gap-2 rounded-lg transition-colors sm:w-full",
                  isSelected && "bg-[var(--primary-admin)] shadow-sm",
                  isDisabled && "cursor-not-allowed opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex w-fit flex-row items-center gap-2 rounded-lg px-3 py-3.5 sm:w-full",
                    isSelected && "bg-[var(--primary-admin)] shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    {
                      <Icon
                        size={20}
                        className={cn(isSelected ? "text-white" : "text-dark")}
                      />
                    }
                  </div>
                  <p
                    className={cn(
                      "hidden sm:block",
                      isSelected ? "text-white" : "text-dark"
                    )}
                  >
                    {text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="my-8 flex w-fit cursor-pointer flex-row items-center gap-2 rounded-full border border-[var(--light-400)] px-2 py-2 font-medium shadow-sm max-md:px-2 sm:w-full">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitals(session.user?.name ?? "IN")}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex sm:flex-col">
          <p className="text-sm font-semibold text-gray-600">
            {session.user?.name}
          </p>
          <p className="text-xs text-gray-400">{session.user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
