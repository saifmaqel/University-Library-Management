"use client";
import { adminSideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { BookA } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
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

            return (
              <Link href={route} key={route}>
                <div
                  className={cn(
                    "flex w-full flex-row items-center gap-2 rounded-lg px-3 py-3.5",
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

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
