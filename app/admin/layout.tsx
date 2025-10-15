import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar />
      <div className="xs:p-10 flex w-[calc(100%-264px)] flex-1 flex-col bg-[var(--light-300)] p-5">
        <div>header</div>
        {children}
      </div>
    </main>
  );
}

export default layout;
